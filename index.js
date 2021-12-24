const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()
const multer = require("multer")

app.use(express.json(

))

//  Routes
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected!!');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
};

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

connectDB()

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/categories', categoryRoute)


app.listen("4000", () => {
    console.log("Backend Server Is Running")
})