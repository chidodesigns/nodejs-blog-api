const express = require('express')

const dotenv = require('dotenv')
dotenv.config()
const App = require ("./services/ExpressApp")
const connectDB = require("./services/Database")

const multer = require("multer")

const StartServer = async () => {

const app = express()

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "images")
    }, 
    filename: (req, file, cb) => {
        cb(null, "hello.jpeg")
    }
})

const upload = multer({
    storage:storage
})

app.post("/api/upload", upload.single("file"),(req, res) => {
    res.status(200).json("File has been uploaded")
})

await connectDB()
await App(app)

app.listen("4000", () => {
    console.log("Backend Server Is Running")
})

}

StartServer()

