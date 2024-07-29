const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
    return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
        error_code: 1401,
        data: {},
    });
    }

    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store the decoded token in the request object
    next(); // Proceed to the next middleware/route handler
    } catch (err) {
    res.status(400).json({
        success: false,
        message: 'Invalid token.',
        error_code: 1400,
        data: {},
    });
    }
};

module.exports = authenticateJWT;
