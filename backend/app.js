const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error.middleware");
const attendanceRoutes = require("./routes/attendance.routes");
const teacherAssignmentRoutes = require("./routes/teacherAssignment.routes");
const subjectRoutes = require("./routes/subject.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check
app.get("/", (req, res) => {
    res.send("Attendance API Running.");
});

// Routes
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/attendance", attendanceRoutes);
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/teacher-assignments", teacherAssignmentRoutes);
const departmentRoutes = require("./routes/department.routes");
app.use("/api/departments", departmentRoutes);
app.use("/api/subjects", subjectRoutes);
app.use(errorHandler);
module.exports = app;