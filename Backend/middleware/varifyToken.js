const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const tokenParts = token.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Invalid token format.' });
    }

    const accessToken = tokenParts[1];

    jwt.verify(accessToken, process.env.JWT_SECRET, async(err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired. Please log in again.' });
            } else {
                return res.status(401).json({ message: 'Invalid token. Please log in again.' });
            }
        }
        
        req.user = await User.findById(decoded.userId);;
        next();
    });
};
