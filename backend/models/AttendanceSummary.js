const mongoose = require("mongoose");

const attendanceSummarySchema = new mongoose.Schema(
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

        fromDate: {
            type: Date,
            required: true,
        },

        toDate: {
            type: Date,
            required: true,
        },

        classesDelivered: {
            type: Number,
            default: 0,
        },

        classesAttended: {
            type: Number,
            default: 0,
        },

        classesAbsent: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

attendanceSummarySchema.virtual(
    "attendancePercentage"
).get(function () {

    if (this.classesDelivered === 0)
        return 0;

    return Number(
        (
            (this.classesAttended /
                this.classesDelivered) *
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