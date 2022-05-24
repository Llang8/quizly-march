const express = require("express")
const dotenv = require("dotenv")
const { connectDB } = require("./src/db")

// Load in environment variables in process.env
dotenv.config()

// Connect to MongoDB instance
connectDB()

const app = express()

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(process.env.PORT, (req, res) => {
    console.log(`Quizly app running on port ${process.env.PORT}`)
})