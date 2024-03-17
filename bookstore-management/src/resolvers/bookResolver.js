const Book = require('../models/book');

const bookResolver = {
    Query: {
        books: async () => {
            return await Book.find().populate('owner');
        }
    },
    Mutation: {
        addBook: async (_, { title, author }, { req }) => {
            if (!req.userId) {
                throw new Error('Authentication required');
            }
            const book = new Book({ title, author, owner: req.userId });
            await book.save();
            return book;
        }
    }
};

module.exports = bookResolver;
