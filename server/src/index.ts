import * as dotenv from "dotenv"
dotenv.config()

import express from "express"
import mongoose from "mongoose"
import multer from "multer"
import cors from "cors"
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import cookieParser from "cookie-parser"
import cookieSession from "cookie-session"

import { getFilesController } from "./controllers/getFilesController.js"
import { uploadFileController } from "./controllers/uploadFileController.js"
import { getFileController } from "./controllers/getFileController.js"
import { isAuthenticated } from "./middleware/isAuthenticated.js"

const app = express()
// middleware for handling multipart/form-data for uploading files
const upload = multer()

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

// passport to authenticate request through Google strategy (OAuth 2.0)
// configure passport
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: "http://localhost:5000/auth/google/callback",
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile)
    }
))

// passport will maintain persistent login sessions through serialize and deserialize (cookies)
passport.serializeUser(function(user, cb) {
    cb(null, user)
})
passport.deserializeUser(function(user, cb) {
    cb(null, user as any)
})

// enable CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // Access-Control-Allow-Credentials: true; expose the res (cookies) when credentials: "include"
}))

// global middleware that parses requests with Content-Type: application/json
app.use(express.json())
// parse requests with Content-Type: application/x-www-form-urlencoded; cannot parse nested objects
app.use(express.urlencoded({ extended: false }))

// configure persistent passport login sessions (cookies)
app.use(cookieParser())
app.use(cookieSession({
    name: "session",
    secret: "secret",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
}))

app.use(passport.initialize())
app.use(passport.session())

// authenticate requests, specifying the Google strategy
app.get(
    "/auth/google", 
    passport.authenticate("google", { scope: ["profile"] }),
)
app.get(
    "/auth/google/callback", 
    passport.authenticate("google", { failureRedirect: "http://localhost:5173/error" }),
    function(req, res) {
        // Successful authentication, redirect
        res.redirect("http://localhost:5173")
    },
)

// take in more than one callback function
app.post(
    "/files",
    isAuthenticated,
    upload.single("file"), // process the file, stored in req.file
    uploadFileController,
)
app.get(
    "/files",
    isAuthenticated,
    getFilesController,
)
app.get(
    "/files/:filename",
    isAuthenticated,
    getFileController,
)

mongoose.connect(MONGO_URL as string)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`)
        })
    })