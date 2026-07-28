require("dotenv").config();
const mongoose = require("mongoose");
const TeacherAssignment = require("../models/TeacherAssignment");
const Semester = require("../models/Semester");

const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("No MongoDB URI found in environment variables");
    process.exit(1);
}

const runMigration = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB for semester migration...");

        // Fetch all assignments using lean and bypass strict typing initially
        const assignments = await mongoose.connection.db
            .collection("teacherassignments")
            .find({})
            .toArray();

        let updatedCount = 0;
        let missingSemesters = new Set();

        for (const assignment of assignments) {
            // Check if semester is a number or string number instead of ObjectId
            if (assignment.semester && !(assignment.semester instanceof mongoose.Types.ObjectId)) {
                let semNumber = Number(assignment.semester);
                
                if (!isNaN(semNumber)) {
                    // Try to find the matching Semester ObjectId
                    const semesterDoc = await Semester.findOne({ number: semNumber });

                    if (semesterDoc) {
                        await mongoose.connection.db
                            .collection("teacherassignments")
                            .updateOne(
                                { _id: assignment._id },
                                { $set: { semester: semesterDoc._id } }
                            );
                        updatedCount++;
                        console.log(`Updated assignment ${assignment._id} to Semester ObjectId (${semesterDoc._id})`);
                    } else {
                        missingSemesters.add(semNumber);
                        console.warn(`Could not find Semester document for number ${semNumber}`);
                    }
                } else if (typeof assignment.semester === "string" && assignment.semester.includes("Semester")) {
                    const extractedNum = parseInt(assignment.semester.replace(/\D/g, ""), 10);
                    if (!isNaN(extractedNum)) {
                        const semesterDoc = await Semester.findOne({ number: extractedNum });
                        if (semesterDoc) {
                            await mongoose.connection.db
                                .collection("teacherassignments")
                                .updateOne(
                                    { _id: assignment._id },
                                    { $set: { semester: semesterDoc._id } }
                                );
                            updatedCount++;
                            console.log(`Updated string assignment ${assignment._id} to Semester ObjectId (${semesterDoc._id})`);
                        }
                    }
                }
            }
        }

        console.log(`\nMigration completed. Updated ${updatedCount} assignments.`);
        if (missingSemesters.size > 0) {
            console.log(`Warning: The following semester numbers were not found in the DB:`, Array.from(missingSemesters));
        }

        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
};

runMigration();
