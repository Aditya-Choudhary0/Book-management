const { gql } = require('apollo-server-express');

const userSchema = gql`
    type User {
        _id: ID!
        username: String!
        isAdmin: Boolean!
    }

    type Query {
        users: [User!]!
    }

    type Mutation {
        register(username: String!, password: String!): User
        login(username: String!, password: String!): String
        logout: Boolean
    }
`;

module.exports = userSchema;
