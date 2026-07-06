const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
    {
        assignment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TeacherAssignment",
            required: true,
        },

        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        attendanceDate: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "present",
                "absent",
                "medical",
                "duty",
                "holiday",
            ],
            required: true,
            default: "present",
        },

        remarks: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Prevent duplicate attendance for the same student
// in the same class on the same day
attendanceSchema.index(
    {
        assignment: 1,
        student: 1,
        attendanceDate: 1,
    },
    {
        unique: true,
    }
);

// Frequently used queries
attendanceSchema.index({
    assignment: 1,
    attendanceDate: 1,
});

attendanceSchema.index({
    student: 1,
});

module.exports = mongoose.model(
    "Attendance",
    attendanceSchema
);