import { Storage } from "@google-cloud/storage"

const storage = new Storage()

export function getBucket() {
    const bucketName = process.env.GCS_BUCKET_NAME
    if (!bucketName) {
        throw new Error("GCS_BUCKET_NAME environment variable is not set")
    }
    return storage.bucket(bucketName)
}