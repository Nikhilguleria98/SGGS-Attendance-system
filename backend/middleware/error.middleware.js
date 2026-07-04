const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {

    let statusCode = err.statusCode || 500;

    let message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: err.errors || [],
        timestamp: new Date().toISOString(),
    });

};

module.exports = errorHandler;