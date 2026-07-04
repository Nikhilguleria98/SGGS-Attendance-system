// models/commonFields.js

const mongoose = require("mongoose");

module.exports = {
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    isActive: {
        type: Boolean,
        default: true,
    },
};