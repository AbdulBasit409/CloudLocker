import { s3 } from "../libs/s3.js"
import { UploadModel } from "../models/uploadModel.js"
import { Request, Response } from "express"

export async function uploadFileController(req: Request, res: Response) {
    // the single file
    const file = req.file
    
    if (file === undefined) {
        return res.status(400).json({ error: "Bad Request" })
    }

    // the document instance 
    const UploadModelInstance = new UploadModel()
    UploadModelInstance.filename = file?.originalname // the name of the file on the user's computer
    // Mongoose sends an `updateOne({ _id: doc._id }, { $set: { filename: originalName } })` to MongoDB.
    const createdFile = await UploadModelInstance.save()

    // call S3 to retrieve upload file to specified bucket
    await s3.upload({
        Bucket: process.env.BUCKET_NAME as string,
        Key: file?.originalname as string,
        Body: file?.buffer,
    })
    .promise()

    res.json(createdFile)
}