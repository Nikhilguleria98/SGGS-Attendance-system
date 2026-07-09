const mongoose = require("mongoose");
const commonFields = require("./commonFields");

const teacherAssignmentSchema = new mongoose.Schema(
    {
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },

        semester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Semester",
            required: true,
        },

        batch: {
            type: String,
            required: true,
        },

        section: {
            type: String,
            required: true,
            uppercase: true,
        },

        academicYear: {
            type: String,
            required: true,
        },

        ...commonFields,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

teacherAssignmentSchema.index({
    teacher: 1,
});

teacherAssignmentSchema.index({
    department: 1,
    semester: 1,
    section: 1,
});

teacherAssignmentSchema.index({
    teacher: 1,
    subject: 1,
    section: 1,
    batch: 1,
    academicYear: 1,
}, {
    unique: true,
});

module.exports = mongoose.model(
    "TeacherAssignment",
    teacherAssignmentSchema
);