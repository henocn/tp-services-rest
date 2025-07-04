const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
};

module.exports = auth;