const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Batch name is required"],
            unique: true,
            trim: true,
            uppercase: true,
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

module.exports = mongoose.model("Batch", batchSchema);
