
const { UserType, QuizType, QuestionType, SubmissionType } = require('./types')
const { User, Quiz, Question, Submission } = require('../models')
const { GraphQLList, GraphQLID, GraphQLString } = require('graphql')

const users = {
    type: new GraphQLList(UserType),
    description: 'Query all users in the database',
    resolve(parent, args) {
        return User.find()
    }
}

const user = {
    type: UserType,
    description: 'Query a user by their ID',
    args: {
        id: { type: GraphQLID }
    }, 
    resolve(parent, args) {
        return User.findById(args.id)
    }
}

const quizBySlug = {
    type: QuizType,
    description: "Query our quizzes based on their slug",
    args: {
        slug: { type: GraphQLString }
    },
    resolve(parent, args) {
        return Quiz.findOne({ slug: args.slug })
    }
}

module.exports = { users, user, quizBySlug }