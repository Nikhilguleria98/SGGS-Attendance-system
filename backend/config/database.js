const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
    try {
        // Set DNS servers to Google's public DNS to resolve MongoDB Atlas SRV connection issues
        try {
            dns.setServers(["8.8.8.8", "8.8.4.4"]);
            if (dns.setDefaultResultOrder) {
                dns.setDefaultResultOrder("ipv4first");
            }
        } catch (dnsErr) {
            console.warn("Warning: Could not configure DNS servers:", dnsErr.message);
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;