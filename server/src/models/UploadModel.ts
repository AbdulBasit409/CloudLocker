import { Schema, model } from "mongoose"

const UploadSchema = new Schema({
    filename: String,
})

// Model for creating and reading Upload documents from the underlying MongoDB database
export const UploadModel = model("Upload", UploadSchema)