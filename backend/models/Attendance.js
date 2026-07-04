const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },

        teacher: {
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
                "holiday"
            ],
            required: true,
        },

        remarks: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

attendanceSchema.index({
    student: 1,
    subject: 1,
    attendanceDate: 1,
});

attendanceSchema.index({
    teacher: 1,
});

module.exports = mongoose.model(
    "Attendance",
    attendanceSchema
);