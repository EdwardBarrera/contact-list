"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../src/index"));
const contact = {
    "name": "Antonia P. Jackson",
    "address": "3763 Chicago Avenue, Terra Bella, CA 93270",
    "phone": "559-535-5886",
    "email": "AntoniaPJackson@jourrapide.com"
};
const contactUpdate = {
    "name": "Maria P. Jackson",
    "address": "3763 Chicago Avenue, Terra Bella, CA 93270",
    "phone": "559-535-5886",
    "email": "AntoniaPJackson@jourrapide.com"
};
describe("User routes", () => {
    let contactObject;
    test("Insert new contact", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).post("/api/contacts").send(contact);
        contactObject = res.body;
        expect(typeof res.body._id).toBe("string");
        expect(res.statusCode).toBe(200);
    }));
    test("Get all users along with the newly created user", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get("/api/contacts");
        expect(typeof res.body.length).toBe("number");
        expect(res.body).toContainEqual(contactObject);
    }));
    test("Update new contact created", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).put("/api/contacts").send(Object.assign(Object.assign({}, contactUpdate), { id: contactObject._id }));
        expect(res.statusCode).toBe(200);
    }));
    test("Delete new contact created", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).delete("/api/contacts?id=" + contactObject._id);
        expect(res.statusCode).toBe(200);
    }));
    test("Should not update contact with incomplete data", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).put("/api/contacts").send(Object.assign(Object.assign({}, contactUpdate), { id: contactObject._id, name: "" }));
        expect(res.statusCode).toBe(400);
    }));
});
