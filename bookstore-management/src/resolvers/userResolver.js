const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateToken } = require('../config/jwt');

const userResolver = {
    Query: {
        users: async () => {
            return await User.find();
        }
    },
    Mutation: {
        register: async (_, { username, password }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, password: hashedPassword });
            await user.save();
            return user;
        },
        login: async (_, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('User not found');
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new Error('Invalid password');
            }
            const token = generateToken(user._id, user.isAdmin);
            return token;
        },
        logout: async (_, __, { req }) => {
            // Implement logout logic if needed
            return true;
        }
    }
};

module.exports = userResolver;
