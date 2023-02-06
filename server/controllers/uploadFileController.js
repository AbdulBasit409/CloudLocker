const s3 = require("../libs/s3")

async function uploadFileController(req, res) {
    await s3.upload({
        Bucket: "",
        Key: "",
        Body: "",
    })
    .promise()
}

module.exports = uploadFileController