const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error.middleware");
const attendanceRoutes = require("./routes/attendance.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
    res.send("Attendance API Running.");
});

// Routes
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/attendance", attendanceRoutes);
app.use(errorHandler);
module.exports = app;