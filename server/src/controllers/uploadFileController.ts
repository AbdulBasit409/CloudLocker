import { getBucket } from "../libs/gcs.js"
import { UploadModel } from "../models/uploadModel.js"
import { Request, Response } from "express"

export async function uploadFileController(req: Request, res: Response) {
    const file = req.file

    if (file === undefined) {
        return res.status(400).json({ error: "Bad Request" })
    }

    // Save metadata to MongoDB
    const UploadModelInstance = new UploadModel()
    UploadModelInstance.filename = file.originalname
    const createdFile = await UploadModelInstance.save()

    // Upload to GCS
    const gcsFile = getBucket().file(file.originalname)
    await gcsFile.save(file.buffer, {
        contentType: file.mimetype,
    })

    res.json(createdFile)
}