import { getBucket } from "../libs/gcs.js"
import { UploadModel } from "../models/uploadModel.js"
import { Request, Response } from "express"

export async function deleteFileController(req: Request, res: Response) {
    const _id = req.params._id
    const doc = await UploadModel.findById(_id)

    if (doc === null) {
        return res.status(404).json({ error: "Upload not found" })
    }

    // Delete from GCS 
    try {
        await getBucket().file(doc.filename as string).delete()
    } catch (err) {
        console.warn("File not found in GCS, skipping:", doc.filename)
    }

    // Delete from MongoDB
    const deletedCount = await UploadModel.deleteOne({ _id })
    res.json(deletedCount)
}