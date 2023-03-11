import mongoose from "mongoose"
import ContactModel from "./models/contact.model"
import dotenv from "dotenv"
import { contacts } from "./utils"
dotenv.config()




const importData = async () => {
  try {
    await ContactModel.deleteMany()

    const createdUsers = await ContactModel.insertMany(contacts)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

mongoose.connect(process.env["MongoDB"]!).then(() => {
  importData()
})