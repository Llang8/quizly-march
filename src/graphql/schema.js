
const { GraphQLObjectType, GraphQLSchema } = require('graphql')
const queries = require('./queries')

/* Define the QueryType object */
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Queries",
    fields: queries
})

module.exports = new GraphQLSchema({
    query: QueryType
})