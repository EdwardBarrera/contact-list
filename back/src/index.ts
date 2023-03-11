import express from "express"
import ContactRoutes from "./routes/contact.routes"

import mongoSanitize from "express-mongo-sanitize"
import errorHandler from "./errorHandler"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./utils"
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(mongoSanitize())

app.use("/api/contacts", ContactRoutes)
app.use(errorHandler)

connectDB()
let server=app.listen(process.env["Port"], () => { console.log("server running") })
export default { app, server }
