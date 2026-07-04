const dotenv = require("dotenv");
const path = require("path");

const env = process.env.NODE_ENV || "development";

dotenv.config({
    path: path.resolve(process.cwd(), `.env.${env}`),
});

module.exports = {
    env,
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,

    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE,

    refreshSecret: process.env.REFRESH_SECRET,
    refreshExpire: process.env.REFRESH_EXPIRE,

    clientUrl: process.env.CLIENT_URL,

    email: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },

    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
    },
};