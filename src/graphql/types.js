const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = require('graphql')

// Import mongoose models
const { Question, Quiz, User, Submission } = require('../models')

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User type',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        /*         
        quizzes: {

        },
        submissions: {

        } 
        */
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

const QuizType = new GraphQLObjectType({
    name: 'Quiz',
    description: 'Quiz type',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLString },
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
    QuestionType
}