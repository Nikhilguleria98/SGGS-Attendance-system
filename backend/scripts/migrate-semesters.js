const mongoose = require("mongoose");
const Semester = require("../models/Semester");
const Subject = require("../models/Subject");
const User = require("../models/users");
const TeacherAssignment = require("../models/TeacherAssignment");
const env = require("../config/env");

async function migrate() {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(env.mongoUri);
        console.log("Connected to DB.");

        // 1. Create Semesters 1 to 8
        const semesterMap = {};
        for (let i = 1; i <= 8; i++) {
            let semester = await Semester.findOne({ number: i });
            if (!semester) {
                semester = await Semester.create({
                    name: `Semester ${i}`,
                    number: i,
                    isActive: true,
                });
                console.log(`Created Semester ${i}`);
            }
            semesterMap[i] = semester._id;
        }

        // 2. Migrate Subjects
        const subjects = await Subject.find();
        let subjectCount = 0;
        for (const subject of subjects) {
            if (typeof subject.semester === "number") {
                const num = subject.semester;
                if (semesterMap[num]) {
                    subject.semester = semesterMap[num];
                    await subject.save();
                    subjectCount++;
                }
            } else if (typeof subject.semester === "string" && !subject.semester.includes(mongoose.Types.ObjectId)) {
                 const num = parseInt(subject.semester, 10);
                 if (!isNaN(num) && semesterMap[num]) {
                    subject.semester = semesterMap[num];
                    await subject.save();
                    subjectCount++;
                 }
            }
        }
        console.log(`Migrated ${subjectCount} subjects.`);

        // 3. Migrate Users (Students)
        const students = await User.find({ role: "student" });
        let studentCount = 0;
        for (const student of students) {
            if (typeof student.semester === "number") {
                const num = student.semester;
                if (semesterMap[num]) {
                    student.semester = semesterMap[num];
                    await student.save();
                    studentCount++;
                }
            }
        }
        console.log(`Migrated ${studentCount} students.`);

        // 4. Migrate Teacher Assignments
        const assignments = await TeacherAssignment.find();
        let assignmentCount = 0;
        for (const assignment of assignments) {
            if (typeof assignment.semester === "number") {
                const num = assignment.semester;
                if (semesterMap[num]) {
                    assignment.semester = semesterMap[num];
                    await assignment.save();
                    assignmentCount++;
                }
            }
        }
        console.log(`Migrated ${assignmentCount} teacher assignments.`);

        console.log("Migration complete!");
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
}

migrate();
