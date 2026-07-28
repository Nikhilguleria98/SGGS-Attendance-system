const mongoose = require("mongoose");

const attendanceSummarySchema = new mongoose.Schema(
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

        classesDelivered: {
            type: Number,
            default: 0,
            min: 0,
        },

        classesAttended: {
            type: Number,
            default: 0,
            min: 0,
        },

        classesAbsent: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// One summary per student per assignment
attendanceSummarySchema.index(
    {
        assignment: 1,
        student: 1,
    },
    {
        unique: true,
    }
);

attendanceSummarySchema.virtual("attendancePercentage").get(function () {
    if (this.classesDelivered === 0) return 0;

    return Number(
        (
            (this.classesAttended / this.classesDelivered) *
            100
        ).toFixed(2)
    );
});

attendanceSummarySchema.set("toJSON", {
    virtuals: true,
});

attendanceSummarySchema.set("toObject", {
    virtuals: true,
});

module.exports = mongoose.model(
    "AttendanceSummary",
    attendanceSummarySchema
);