import request from "supertest";

import app from "../src/index";
const contact = {
    "name": "Antonia P. Jackson",
    "address": "3763 Chicago Avenue, Terra Bella, CA 93270",
    "phone": "559-535-5886",
    "email": "AntoniaPJackson@jourrapide.com"
}
const contactUpdate = {
    "name": "Maria P. Jackson",
    "address": "3763 Chicago Avenue, Terra Bella, CA 93270",
    "phone": "559-535-5886",
    "email": "AntoniaPJackson@jourrapide.com"
}

describe("User routes", () => {
    let contactObject:any;
    test("Insert new contact", async () => {
        const res = await request(app).post("/api/contacts").send(contact);
        contactObject = res.body
        expect(typeof res.body._id).toBe("string")
        expect(res.statusCode).toBe(200)
    })
    test("Get all users along with the newly created user", async () => {
        const res = await request(app).get("/api/contacts");
        expect(typeof res.body.length).toBe("number")
        expect(res.body).toContainEqual(contactObject)
    });
    test("Update new contact created", async () => {
        const res = await request(app).put("/api/contacts").send({...contactUpdate,id:contactObject._id});
        expect(res.statusCode).toBe(200)
    });
    test("Delete new contact created", async () => {
        const res = await request(app).delete("/api/contacts?id="+contactObject._id);
        expect(res.statusCode).toBe(200)
    });
    test("Should not update contact with incomplete data", async () => {
        const res = await request(app).put("/api/contacts").send({...contactUpdate,id:contactObject._id,name:""});
        expect(res.statusCode).toBe(400)
    });
});