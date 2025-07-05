const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (user, role, isActive) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: role, isActive: isActive },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};


const refreshToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '10d' }
    );
};

module.exports = {generateToken, refreshToken}