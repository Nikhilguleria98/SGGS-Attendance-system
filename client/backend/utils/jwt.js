const jwt = require("jsonwebtoken");

exports.generateAccessToken = (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });

exports.generateRefreshToken = (payload) =>
    jwt.sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: process.env.REFRESH_EXPIRE,
    });

exports.verifyToken = (token) =>
    jwt.verify(token, process.env.JWT_SECRET);