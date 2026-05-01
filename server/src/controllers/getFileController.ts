import { getBucket } from "../libs/gcs.js"
import { Request, Response } from "express"

export async function getFileController(req: Request, res: Response) {
    const filename = req.params.filename
    const gcsFile = getBucket().file(filename)

    const [metadata] = await gcsFile.getMetadata()
    const contentType = metadata.contentType as string

    res.attachment(filename)
    res.type(contentType)

    gcsFile.createReadStream()
        .on("error", (err) => {
            res.status(500).json({ error: "Failed to download file" })
        })
        .pipe(res)
}