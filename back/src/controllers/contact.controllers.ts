import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import ContactModel from "../models/contact.model"
import { validateData } from "../utils"

export const getContacts = asyncHandler(async (req: Request, res: Response) => {
    const contacts = await ContactModel.find({}).select("name address phone email").lean()
    res.send(contacts)
})

export const updateContact = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body
    if (!validateData(data)) {
        res.status(400)
        throw new Error("Invalid or incomplete parameters")
    }
    await ContactModel.findByIdAndUpdate(data._id, {
        name: data.name,
        address: data.address,
        phone: data.phone,
        email: data.email
    })
    res.send({})
})

export const deleteContact = asyncHandler(async (req: Request, res: Response) => {
    if (!validateData(req.query)) {
        res.status(400)
        throw new Error("Invalid or incomplete parameters")
    }
    const deleted=await ContactModel.findByIdAndDelete(req.query.id)
    if (deleted === null) res.status(404)
    res.send({})
})