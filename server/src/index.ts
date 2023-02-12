import * as dotenv from "dotenv"
dotenv.config()

import express from "express"
import mongoose from "mongoose"
import multer from "multer"
import cors from "cors"

import { getFilesController } from "./controllers/getFilesController.js"
import { uploadFileController } from "./controllers/uploadFileController.js"
import { getFileController } from "./controllers/getFileController.js"

const app = express()
// middleware for handling multipart/form-data for uploading files
const upload = multer()

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

// enable CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // cookie
}))

// global middleware that parses requests with Content-Type: application/json
app.use(express.json())
// parse requests with Content-Type: application/x-www-form-urlencoded; cannot parse nested objects
app.use(express.urlencoded({ extended: false }))

// take in more than one callback function
app.post(
    "/files",
    upload.single("file"), // process the file, stored in req.file
    uploadFileController,
)
app.get("/files", getFilesController)
app.get("/files/:filename", getFileController)

mongoose.connect(MONGO_URL as string)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        })
    })