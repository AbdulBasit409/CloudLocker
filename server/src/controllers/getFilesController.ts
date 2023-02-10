import { UploadModel } from "../models/uploadModel.js"
import { Request, Response } from "express"

export async function getFilesController(req: Request, res: Response) {
    const files = await UploadModel.find({})
    // convert files to a JSON string and send the response with Content-Type: application/json
    res.json(files)
}