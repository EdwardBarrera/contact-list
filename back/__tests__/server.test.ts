import request from "supertest";
import mongoose from "mongoose"

import index from "../src/index";
import ContactModel from "../src/models/contact.model";
import { contacts } from "../src/utils";

const { app, server } = index
const api = request(app)

interface Contact{
    _id:string,
    name:string,
    address:string,
    phone:string,
    email:string
}
let test_contact:Contact;

describe("Contact routes", () => {
    test("Get all contacts", async () => {
        const res = await api.get("/api/contacts");
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body.length).toBe(contacts.length)
    });
    test("Update a contact with valid data", async () => {
        const new_phone = "555-555-5555"

        const res = await api.put("/api/contacts").send({
            _id: String(test_contact._id),
            name: test_contact.name,
            address: test_contact.address,
            phone: new_phone,
            email: test_contact.email
        });
        expect(res.statusCode).toBe(200)

        const contacts = await api.get("/api/contacts");
        const phones = contacts.body.map((c: any) => c.phone)
        expect(phones).toContain(new_phone)
    });
    test("Can't update a contact with invalid data", async () => {
        
        const res = await api.put("/api/contacts").send({
            _id: String(test_contact._id),
            name: test_contact.name,
            address: test_contact.address,
            phone: 555,
            email: ""
        });
        expect(res.statusCode).toBe(400)
    });
    test("Delete a contact", async () => {
        const res = await api.delete("/api/contacts?id=" + test_contact._id);
        expect(res.statusCode).toBe(200)
    });

    test("Can't delete a contact that doesn't exist", async () => {
        const res = await api.delete("/api/contacts?id=" + String(new mongoose.Types.ObjectId()));
        expect(res.statusCode).toBe(404)
    });
});

beforeAll(async () => {
    await ContactModel.deleteMany()
    await ContactModel.insertMany(contacts)
    const contact=await ContactModel.findOne({ email: contacts[1].email }).lean()
    test_contact = {
        ...contact,
        _id:String(contact._id),
    }
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})