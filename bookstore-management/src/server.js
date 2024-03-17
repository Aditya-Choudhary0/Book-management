const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('./config/database');
const authResolver = require('./resolvers/authResolver');
const userResolver = require('./resolvers/userResolver');
const bookResolver = require('./resolvers/bookResolver ')
const userSchema = require('./schema/userSchema');
const bookSchema = require('./schema/bookSchema');

const app = express();

const server = new ApolloServer({
    typeDefs: [userSchema, bookSchema],
    resolvers: [userResolver, bookResolver],
    context: authResolver
});

server.applyMiddleware({ app });

app.get("/", (req, res) => res.send("Express on Vercel"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
});
