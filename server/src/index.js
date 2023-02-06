require("dotenv").config()
const PORT = process.env.PORT
const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT

const express = require("express")
const app = express()

const redis = require("redis")
const client = redis.createClient({
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT,
    }
})
client.on("error", err => {
    console.log(`Redis Client Error ${err}`)
})

app.get('/', (req, res) => {
    res.send("Hello world!")
})

client.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        })
    })