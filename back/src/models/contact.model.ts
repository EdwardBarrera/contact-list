import mongoose from "mongoose"

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim: true
    }

}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
})

const ContactModel = mongoose.model("contact", contactSchema)

export default ContactModel