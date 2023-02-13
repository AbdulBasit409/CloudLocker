import { s3 } from "../libs/s3.js"
import { UploadModel } from "../models/uploadModel.js"
import { Request, Response } from "express"

export async function deleteFileController(req: Request, res: Response) {
    const filename = req.params.filename
    await UploadModel.deleteOne({ filename })

    await s3.deleteObject({
        Bucket: process.env.BUCKET_NAME as string,
        Key: filename as string,
    })
    .promise()

    res.json({ message: "successful delete" })
}