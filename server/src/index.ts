import * as dotenv from 'dotenv'
dotenv.config()

import express from "express"
import mongoose from 'mongoose'

const app = express()

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

app.get('/', (req, res) => {
    res.send("Hello world!")
})

mongoose.connect(MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        })
    })