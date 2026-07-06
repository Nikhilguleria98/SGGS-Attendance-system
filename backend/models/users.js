const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Roles = require("../constants/roles");
const commonFields = require("./commonFields");

const userSchema = new mongoose.Schema(
    {
        // ==========================
        // Personal Information
        // ==========================

        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        lastName: {
            type: String,
            trim: true,
            default: "",
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
            trim: true,
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

        // ==========================
        // Authorization
        // ==========================

        role: {
            type: String,
            enum: Object.values(Roles),
            required: true,
        },

        // ==========================
        // Student Details
        // ==========================

        rollNumber: {
            type: String,
            unique: true,
            sparse: true,
            uppercase: true,
            trim: true,
        },

        semester: {
            type: Number,
            min: 1,
            max: 8,
        },

        section: {
            type: String,
            uppercase: true,
            trim: true,
        },

        batch: {
            type: String,
            trim: true,
        },

        // ==========================
        // Teacher / HOD Details
        // ==========================

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

        // ==========================
        // ==========================
        // Department
        // ==========================
        
        batches: { type: Array, default: [] },
        groups: { type: Array, default: [] },
        subjects: { type: Array, default: [] },
        assignments: { type: Array, default: [] },

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
        },

        // ==========================
        // Authentication
        // ==========================

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

// ==========================
// Password Hashing
// ==========================

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

// ==========================
// Password Compare
// ==========================

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);