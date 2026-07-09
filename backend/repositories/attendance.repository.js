const Attendance = require("../models/Attendance");
require("../models/Subject");
require("../models/Department");

// ─── Shared populate chain ────────────────────────────────────────────────────
// All read methods use the same population so every returned document is
// fully hydrated: student name/roll, assignment → teacher name, subject name/code.
// This removes any need for ObjectId handling in the service layer.
const POPULATE_STUDENT = { path: "student", select: "firstName lastName rollNumber" };
const POPULATE_ASSIGNMENT = {
    path: "assignment",
    populate: [
        { path: "teacher", select: "firstName lastName employeeId" },
        { path: "subject", select: "name code" },
    ],
};

class AttendanceRepository {
    // ─────────────────────────────────────────────────────────────────────────
    // Writes — always return a fully-populated document
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Create a new Attendance record and return it fully populated.
     * Mongoose .create() does not support chaining .populate(), so we
     * re-fetch the saved document by _id immediately after insertion.
     */
    async create(data) {
        const doc = await Attendance.create(data);
        return await Attendance.findById(doc._id)
            .populate(POPULATE_STUDENT)
            .populate(POPULATE_ASSIGNMENT);
    }

    /**
     * Update an Attendance record by ID and return the result fully populated.
     * findByIdAndUpdate with { new: true } does not support .populate(), so
     * we apply the update then re-fetch the document.
     */
    async updateById(id, data) {
        await Attendance.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
        return await Attendance.findById(id)
            .populate(POPULATE_STUDENT)
            .populate(POPULATE_ASSIGNMENT);
    }

    async deleteById(id) {
        return await Attendance.findByIdAndDelete(id);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Reads — all methods return fully-populated documents
    // ─────────────────────────────────────────────────────────────────────────

    async findOne(filter) {
        return await Attendance.findOne(filter)
            .populate(POPULATE_STUDENT)
            .populate(POPULATE_ASSIGNMENT);
    }

    async findAll() {
        return await Attendance.find()
            .populate(POPULATE_STUDENT)
            .populate(POPULATE_ASSIGNMENT);
    }

    async findById(id) {
        return await Attendance.findById(id)
            .populate(POPULATE_STUDENT)
            .populate(POPULATE_ASSIGNMENT);
    }
}

module.exports = new AttendanceRepository();