import express from "express"
import { createContact, deleteContact, getContacts, updateContact } from "../controllers/contact.controllers"

const router=express.Router()

router.route("/")
.get(getContacts)
.post(createContact)
.put(updateContact)
.delete(deleteContact)

export default router