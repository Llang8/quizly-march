const express = require("express")
const dotenv = require("dotenv")
const { connectDB } = require("./src/db")
const { graphqlHTTP } = require("express-graphql")

// Import our GraphQL Schema
const schema = require("./src/graphql/schema")

// Load in environment variables in process.env
dotenv.config()

// Connect to MongoDB instance
connectDB()

const app = express()

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(process.env.PORT, (req, res) => {
    console.log(`Quizly app running on port ${process.env.PORT}`)
})