const mongoose = require("mongoose");
const commonFields = require("./commonFields");

const departmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },

        hod: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        ...commonFields,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);


module.exports = mongoose.model(
    "Department",
    departmentSchema
);