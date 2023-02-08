import { Schema, model } from "mongoose"

const UploadSchema = new Schema({
    filename: String,
})

export const UploadModel = model("Upload", UploadSchema)