require("dotenv").config();
const mongoose = require("mongoose");
const TeacherAssignment = require("../models/TeacherAssignment");
const User = require("../models/users");
const AttendanceSummary = require("../models/AttendanceSummary");

const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("No MongoDB URI found in environment variables");
    process.exit(1);
}

const runInit = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB for Attendance Summary Initialization...");

        const assignments = await TeacherAssignment.find({ isActive: true });
        
        let createdCount = 0;

        for (const assignment of assignments) {
            // Find all students matching this assignment's criteria
            const students = await User.find({
                role: "student",
                department: assignment.department,
                semester: assignment.semester,
                batch: assignment.batch,
                section: assignment.section
            });

            for (const student of students) {
                const existing = await AttendanceSummary.findOne({
                    assignment: assignment._id,
                    student: student._id
                });

                if (!existing) {
                    await AttendanceSummary.create({
                        assignment: assignment._id,
                        student: student._id,
                        classesDelivered: 0,
                        classesAttended: 0,
                        classesAbsent: 0
                    });
                    createdCount++;
                    console.log(`Initialized AttendanceSummary for student ${student._id} in assignment ${assignment._id}`);
                }
            }
        }

        console.log(`\nInitialization completed. Created ${createdCount} AttendanceSummary records.`);
        process.exit(0);
    } catch (err) {
        console.error("Initialization failed:", err);
        process.exit(1);
    }
};

runInit();
