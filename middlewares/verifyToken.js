const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

const verifyToken = (req, res, next) => {
    const token = req.cookies.AuthToken;
    if (!token) {
        return next(new ErrorResponse('Unauthorized. Token not provided.', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; 
        next();
    } catch (error) {
        return next(new ErrorResponse('Unauthorized. Invalid token.', 401));
    }
};

module.exports = {verifyToken};
