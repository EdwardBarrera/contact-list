import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import ContactModel from "../models/contact.model"

export const getContacts=asyncHandler(async (req:Request,res:Response)=>{
    const contacts=await ContactModel.find({}).lean()
    res.send(contacts)
})

export const createContact=asyncHandler(async (req:Request,res:Response)=>{
    const data=req.body
    const contact=await ContactModel.create({
        name:data.name,
        address:data.address,
        phone:data.phone,
        email:data.email
    })
    res.send(contact)
})
export const updateContact=asyncHandler(async (req:Request,res:Response)=>{
    const data=req.body
    await ContactModel.findByIdAndUpdate(data.id,{
        name:data.name,
        address:data.address,
        phone:data.phone,
        email:data.email
    })
    res.send({})
})

export const deleteContact=asyncHandler(async (req:Request,res:Response)=>{
    await ContactModel.findByIdAndDelete(req.query.id)
    res.send({})
})