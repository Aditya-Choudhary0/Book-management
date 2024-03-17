const { verifyToken } = require('../config/jwt');
const User = require('../models/user');

const authResolver = async ({ req }) => {
    const token = req.headers.authorization || '';
    if (!token) {
        return { req };
    }
    try {
        const { userId } = verifyToken(token);
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        req.userId = userId;
        req.isAdmin = user.isAdmin;
    } catch (err) {
        console.error('Authentication error:', err);
    }
    return { req };
};

module.exports = authResolver;
