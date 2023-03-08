import express from "express"
import ContactRoutes from "./routes/contact.routes"
import mongoose from "mongoose"
import mongoSanitize from "express-mongo-sanitize"
import errorHandler from "./errorHandler"
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(express.json())
app.use(mongoSanitize())

app.use("/api/contacts",ContactRoutes)
app.use(errorHandler)


mongoose.connect(process.env["MongoDB"]!).then(()=>{
    app.listen(process.env["Port"],()=>{console.log("server running")})
})

export default app