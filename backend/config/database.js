const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log("MONGO_URI =", process.env.MONGO_URI);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;