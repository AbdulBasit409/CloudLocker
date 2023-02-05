const express = require("express")
const app = express()
const port = 3000

const redis = require("redis")
const client = redis.createClient({
    socket: {
        host: "localhost",
        port: "6379"
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
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    })