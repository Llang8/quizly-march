const express = require("express")
const dotenv = require("dotenv")
const { connectDB } = require("./src/db")
const { graphqlHTTP } = require("express-graphql")
const path = require("path")
const cookieParser = require('cookie-parser')

// Import our GraphQL Schema
const schema = require("./src/graphql/schema")
const authenticate = require("./src/middleware/authenticate")
const userData = require("./src/middleware/userData")

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

app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(authenticate)
app.use(userData)

/* Import our routes */
require("./src/routes")(app)

app.listen(process.env.PORT, (req, res) => {
    console.log(`Quizly app running on port ${process.env.PORT}`)
})