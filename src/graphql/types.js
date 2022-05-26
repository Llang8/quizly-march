const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLFloat, GraphQLInputObjectType } = require('graphql')

// Import mongoose models
const { Question, Quiz, User, Submission } = require('../models')

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User type',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        quizzes: {
            type: GraphQLList(QuizType),
            resolve(parent, args) {
                return Quiz.find({ userId: parent.id })
            }
        },
        submissions: {
            type: GraphQLList(SubmissionType),
            resolve(parent, args) {
                return Submission.find({ userId: parent.id })
            }
        } 
    })
})

const QuestionType = new GraphQLObjectType({
    name: 'Question',
    description: 'Question type',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        correctAnswer: { type: GraphQLString },
        order: { type: GraphQLInt },
        quizId: { type: GraphQLString }
        /* quiz: { } */
    })
})

const QuestionInputType = new GraphQLInputObjectType({
    name: 'QuestionInput',
    description: 'Question input type',
    fields: () => ({
        title: { type: GraphQLString },
        correctAnswer: { type: GraphQLString },
        order: { type: GraphQLInt }
    })
})

const QuizType = new GraphQLObjectType({
    name: 'Quiz',
    description: 'Quiz type',
    fields: () => ({
        id: { type: GraphQLString },
        slug: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLString },
        submissions: { 
            type: GraphQLList(SubmissionType),
            resolve(parent, args) {
                return Submission.find({ quizId: parent.id })
            }
        },
        avgScore: {
            type: GraphQLFloat,
            async resolve(parent, args) {
                const submissions = await Submission.find({ quizId: parent.id })

                let score = 0
                for (const submission of submissions) {
                    score += submission.score
                }

                return score / submissions.length
            }
        },
        questions: {
            type: GraphQLList(QuestionType),
            async resolve(parent, args) {
                return Question.find({ quizId: parent.id })
            }
        }
        /* questions: {  },
        user: { } */
    })
})

const SubmissionType = new GraphQLObjectType({
    name: 'Submission',
    description: 'Submission type',
    fields: () => ({
        id: { type: GraphQLString },
        quizId: { type: GraphQLString },
        userId: { type: GraphQLString },
        score: { type: GraphQLInt },
        quiz: { 
            type: QuizType,
            resolve(parent, args) {
                return Quiz.findOne({ id: parent.quizId })
            }
        }
        /* 
        user: {},
        quiz: {} 
        */
    })
})

module.exports = {
    UserType,
    QuizType,
    SubmissionType,
    QuestionType,
    QuestionInputType
}