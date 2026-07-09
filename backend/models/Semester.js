const mongoose = require("mongoose");
const commonFields = require("./commonFields");

const semesterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        number: {
            type: Number,
            required: true,
            unique: true,
        },
        ...commonFields,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Semester", semesterSchema);
