const { gql } = require('apollo-server')

const typeDefs = gql `
    type Message{
        id : ID!
        content : String!
        author : String!
    }
    type Query{
        messages : [Message!]!
    }
    type Mutation{
        sendMessage(content : String!,author : String !) : Message!
    }
`

module.exports = typeDefs;