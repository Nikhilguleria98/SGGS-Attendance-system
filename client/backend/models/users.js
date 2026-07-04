const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Roles = require("../constants/roles");
const commonFields = require("./commonFields");

const userSchema = new mongoose.Schema(
    {
        // Personal Information
        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            required: false,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false,
        },

        phone: {
            type: String,
            default: "",
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
        },

        dob: {
            type: Date,
        },

        avatar: {
            type: String,
            default: "",
        },

        // Authorization
        role: {
            type: String,
            enum: Object.values(Roles),
            required: true,
        },

        // Student Only
        rollNumber: {
            type: String,
            unique: true,
            sparse: true,
            uppercase: true,
            trim: true,
        },

        semester: {
            type: Number,
        },

        section: {
            type: String,
            trim: true,
        },

        batch: {
            type: String,
            trim: true,
        },

        // Teacher / HOD
        employeeId: {
            type: String,
            unique: true,
            sparse: true,
            uppercase: true,
            trim: true,
        },

        designation: {
            type: String,
            default: "",
        },

        // Relationships
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
        },

        // Authentication
        isVerified: {
            type: Boolean,
            default: false,
        },

        refreshToken: {
            type: String,
            select: false,
        },

        lastLogin: {
            type: Date,
        },

        passwordChangedAt: {
            type: Date,
        },

        ...commonFields,
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Hash password
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt =  await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Indexes


module.exports = mongoose.model("User", userSchema);