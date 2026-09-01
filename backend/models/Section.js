const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Section name is required"],
            unique: true,
            trim: true,
            uppercase: true,
            match: [/^[A-Za-z]+$/, "Section name must contain only alphabetic characters"],
        },
        description: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("SectionEntity", sectionSchema);
