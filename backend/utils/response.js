const ApiResponse = require("./ApiResponse");

const success = (
    res,
    statusCode,
    message,
    data = null,
    meta = null
) => {
    return res.status(statusCode).json(
        new ApiResponse(
            statusCode,
            message,
            data,
            meta
        )
    );
};

module.exports = {
    success,
};