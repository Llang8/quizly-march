
const { GraphQLObjectType, GraphQLSchema } = require('graphql')
const queries = require('./queries')
const mutations = require('./mutations')

/* Define the QueryType object */
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Queries",
    fields: queries
})

/* Define the MutationType object */
const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations",
    fields: mutations
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})