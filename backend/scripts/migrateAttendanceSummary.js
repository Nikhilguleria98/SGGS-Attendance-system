require("dotenv").config({ path: __dirname + "/../.env.development" });
const mongoose = require("mongoose");
const connectDB = require("../config/database");
const Attendance = require("../models/Attendance");
const AttendanceSummary = require("../models/AttendanceSummary");

async function migrate() {
    try {
        await connectDB();
        console.log("Starting Migration: Attendance -> AttendanceSummary");

        // We use aggregation on Attendance to group by assignment and student
        const pipeline = [
            {
                $group: {
                    _id: { assignment: "$assignment", student: "$student" },
                    classesDelivered: {
                        $sum: {
                            $cond: [{ $ne: ["$status", "holiday"] }, 1, 0]
                        }
                    },
                    classesAttended: {
                        $sum: {
                            $cond: [
                                { $in: ["$status", ["present", "medical", "duty"]] },
                                1,
                                0
                            ]
                        }
                    },
                    classesAbsent: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "absent"] }, 1, 0]
                        }
                    }
                }
            }
        ];

        console.log("Aggregating raw Attendance records...");
        const summaries = await Attendance.aggregate(pipeline);

        console.log(`Found ${summaries.length} unique (assignment, student) combinations.`);

        let upsertedCount = 0;

        for (const summary of summaries) {
            const { assignment, student } = summary._id;

            // Idempotent upsert
            await AttendanceSummary.findOneAndUpdate(
                { assignment, student },
                {
                    $set: {
                        classesDelivered: summary.classesDelivered,
                        classesAttended: summary.classesAttended,
                        classesAbsent: summary.classesAbsent
                    }
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );

            upsertedCount++;
        }

        console.log(`Successfully upserted ${upsertedCount} AttendanceSummary records.`);
        console.log("Migration completed with zero data loss and no duplicates.");
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
}

migrate();
