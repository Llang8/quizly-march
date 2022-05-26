const { GraphQLString, GraphQLList } = require('graphql')
const { QuestionInputType, AnswerInputType } = require('./types')
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

        const token = createJwtToken(user)
        return token
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

const submitQuiz = {
    type: GraphQLString,
    args: {
        quizId: { type: GraphQLString },
        userId: { type: GraphQLString },
        answers: { type: new GraphQLList(AnswerInputType) }
    },
    async resolve(parent, args) {
        try {
            let correct = 0

            for (const answer of args.answers) {
                const question = await Question.findById(answer.questionId)
                if (answer.answer.toLowerCase() == question.correctAnswer.toLowerCase()) {
                    correct += 1
                }
            }

            const finalScore = Math.round((correct / args.answers.length) * 100)

            const submission = new Submission({
                userId: args.userId,
                quizId: args.quizId,
                score: finalScore
            })

            await submission.save()

            return submission.id

        } catch(e) {
            console.log(e)
            return ''
        }
    }
}

module.exports = { register, login, createQuiz, submitQuiz }