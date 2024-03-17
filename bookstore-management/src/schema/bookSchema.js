const { gql } = require('apollo-server-express');

const bookSchema = gql`
    type Book {
        _id: ID!
        title: String!
        author: String!
        owner: User!
    }

    type Query {
        books: [Book!]!
    }

    type Mutation {
        addBook(title: String!, author: String!): Book
    }
`;

module.exports = bookSchema;
