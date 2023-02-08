import { s3 } from "../libs/s3.js"

export async function uploadFileController(req, res) {
    await s3.upload({
        Bucket: "",
        Key: "",
        Body: "",
    })
    .promise()
}