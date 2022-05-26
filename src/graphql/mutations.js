const { GraphQLString, GraphQLList } = require('graphql')
const { QuestionInputType } = require('./types')
const createJwtToken = require("../util/auth")
const { User, Question, Quiz, Submission } = require('../models')

const register = {
    type: GraphQLString,
    args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const { username, password, email } = args

        const user = new User({ username, email, password })

        await user.save()

        return 'User signed up'
    }
}

const login = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const user = await User.findOne({ email: args.email })

        if (!user || args.password !== user.password) {
            throw new Error("Invalid credentials")
        }

        const token = createJwtToken(user)
        return token
    }
}

const createQuiz = {
    type: GraphQLString,
    args: {
        questions: {
            type: new GraphQLList(QuestionInputType)
        },
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        userId: {
            type: GraphQLString
        }
    },
    async resolve(parent, args) {
        // Slugify our title
        let slugify = args.title.toLowerCase().replace(/[^\w ]/g, '').replace(/[ +]/g, '-')

        let fullSlug = ''

        while (true) {
            let slugid = Math.floor(Math.random()*10000)

            fullSlug = `${slugify}-${slugid}`

            const existingQuiz = await Quiz.findOne({ slug: fullSlug })

            if (!existingQuiz) {
                break
            }
        }

        const quiz = new Quiz({
            title: args.title,
            description: args.description,
            userId: args.userId,
            slug: fullSlug
        })

        await quiz.save()

        for (const question of args.questions) {
            const questionObject = new Question({
                title: question.title,
                correctAnswer: question.correctAnswer,
                order: Number(question.order),
                quizId: quiz.id
            })

            questionObject.save()
        }

        return fullSlug
    }
}

module.exports = { register, login, createQuiz }