import { s3 } from "../libs/s3.js"
import { UploadModel } from "../models/uploadModel.js"
import { Request, Response } from "express"

export async function deleteFileController(req: Request, res: Response) {
    const _id = req.params._id
    const doc = await UploadModel.findById(_id)

    if (doc === null) {
        return res.status(404).json({ error: "Upload not found" })
    }

    await s3.deleteObject({
        Bucket: process.env.BUCKET_NAME as string,
        Key: doc.filename as string,
    })
    .promise()

    const deletedCount = await UploadModel.deleteOne({ _id })

    res.json(deletedCount)
}