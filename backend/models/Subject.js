const mongoose = require("mongoose");
const commonFields = require("./commonFields");

const subjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
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

        credits: {
            type: Number,
            default: 4,
            min: 1,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },
        hod: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        ...commonFields,
    },
    
    {
        timestamps: true,
        versionKey: false,
    }
);

// Search & Filtering Indexes
subjectSchema.index({
    department: 1,
    semester: 1,
});

// subjectSchema.index({
//     code: 1,
// });

module.exports = mongoose.model("Subject", subjectSchema);