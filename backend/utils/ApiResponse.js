class ApiResponse {
    constructor(statusCode, message, data = null, meta = null) {
        this.success = true;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.meta = meta;
        this.timestamp = new Date().toISOString();
    }
}

module.exports = ApiResponse;