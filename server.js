const express = require("express")
const dotenv = require("dotenv")
const { connectDB } = require("./src/db")
const { graphqlHTTP } = require("express-graphql")
const path = require("path")

// Import our GraphQL Schema
const schema = require("./src/graphql/schema")

// Load in environment variables in process.env
dotenv.config()

// Connect to MongoDB instance
connectDB()

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './src/templates/views'))

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))

/* Import our routes */
require("./src/routes")(app)

app.listen(process.env.PORT, (req, res) => {
    console.log(`Quizly app running on port ${process.env.PORT}`)
})