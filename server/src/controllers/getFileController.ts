import { s3 } from "../libs/s3.js"
import { Request, Response } from "express"

export async function getFileController(req: Request, res: Response) {
    // retrieves the object for the S3 bucket
    const data = await s3.getObject({
        Bucket: process.env.BUCKET_NAME as string,
        Key: req.params.filename,
    })
    .promise()

    // Content-Disposition: attachment; filename=filename
    res.attachment(req.params.filename)
    res.type(data.ContentType as string)
    res.send(data.Body)
}