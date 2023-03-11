import express from "express"
import { deleteContact, getContacts, updateContact } from "../controllers/contact.controllers"

const router=express.Router()

router.route("/")
.get(getContacts)
.put(updateContact)
.delete(deleteContact)

export default router