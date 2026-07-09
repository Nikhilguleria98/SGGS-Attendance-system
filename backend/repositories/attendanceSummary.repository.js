const mongoose = require("mongoose");
const { Types } = mongoose;
const AttendanceSummary = require("../models/AttendanceSummary");
const ApiError = require("../utils/ApiError");

class AttendanceSummaryRepository {
    // ─────────────────────────────────────────────────────────────────────────
    // Basic CRUD
    // ─────────────────────────────────────────────────────────────────────────

    async create(data) {
        return await AttendanceSummary.create(data);
    }

    async updateById(id, data) {
        return await AttendanceSummary.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id) {
        return await AttendanceSummary.findByIdAndDelete(id);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Reads — all methods return fully-populated documents
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Find a single summary for a (assignment, student) pair.
     * Populates: assignment → subject, assignment → teacher, student.
     */
    async findByAssignmentAndStudent(assignmentId, studentId) {
        return await AttendanceSummary.findOne({
            assignment: assignmentId,
            student: studentId,
        })
            .populate("student", "firstName lastName rollNumber")
            .populate({
                path: "assignment",
                populate: [
                    { path: "subject", select: "name code" },
                    { path: "teacher", select: "firstName lastName employeeId" },
                ],
            });
    }

    /**
     * Find all summaries for a given assignment (i.e., an entire class).
     * Populates: assignment → subject, assignment → teacher, student.
     */
    async findByAssignment(assignmentId) {
        return await AttendanceSummary.find({ assignment: assignmentId })
            .populate("student", "firstName lastName rollNumber")
            .populate({
                path: "assignment",
                populate: [
                    { path: "subject", select: "name code" },
                    { path: "teacher", select: "firstName lastName employeeId" },
                ],
            });
    }

    /**
     * Find all summaries for a given student across all assignments.
     * Populates:
     *   assignment → teacher (name, employeeId)
     *   assignment → subject → department (name)
     *   assignment itself exposes: semester, batch, section, academicYear
     *
     * This is the primary read path for the Student Dashboard DTO and must
     * carry every field the service needs to build the response without
     * additional queries.
     */
    async findByStudentId(studentId) {
        return await AttendanceSummary.find({ student: studentId })
            .populate({
                path: "assignment",
                select: "semester batch section academicYear teacher subject",
                populate: [
                    { path: "teacher", select: "firstName lastName employeeId" },
                    {
                        path: "subject",
                        select: "name code department semester",
                        populate: { path: "department", select: "name" },
                    },
                    { path: "semester", select: "name number" },
                ],
            });
    }

    async findAll() {
        return await AttendanceSummary.find()
            .populate("student", "firstName lastName rollNumber")
            .populate({
                path: "assignment",
                populate: [
                    { path: "teacher", select: "firstName lastName employeeId" },
                    { path: "subject", select: "name code" },
                ],
            });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Atomic upsert — single round-trip, race-condition-safe
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Atomically increment (or decrement) summary counters for a
     * (assignment, student) pair, creating the document if it does not exist.
     *
     * @param {string|ObjectId} assignmentId
     * @param {string|ObjectId} studentId
     * @param {{ classesDelivered?: number, classesAttended?: number, classesAbsent?: number }} delta
     *   Positive values increment; negative values decrement.
     * @returns {Promise<AttendanceSummary>} The updated (or newly created) document.
     */
    async upsertSummary(assignmentId, studentId, delta) {
        return await AttendanceSummary.findOneAndUpdate(
            { assignment: assignmentId, student: studentId },
            { $inc: delta },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
            }
        );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Aggregation — Teacher Report
    // ─────────────────────────────────────────────────────────────────────────

    async getTeacherReport(teacherId, filters = {}, options = {}) {
        const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;

        const pipeline = [];

        // Lookup Assignment
        pipeline.push({
            $lookup: {
                from: "teacherassignments",
                localField: "assignment",
                foreignField: "_id",
                as: "assignmentDetails",
            },
        });
        pipeline.push({ $unwind: "$assignmentDetails" });

        // Enforce Teacher Isolation — MUST occur immediately after assignment lookup
        pipeline.push({
            $match: {
                "assignmentDetails.teacher": new Types.ObjectId(teacherId),
            },
        });

        // Lookup Teacher
        pipeline.push({
            $lookup: {
                from: "users",
                localField: "assignmentDetails.teacher",
                foreignField: "_id",
                as: "teacherDetails",
            },
        });
        pipeline.push({ $unwind: { path: "$teacherDetails", preserveNullAndEmptyArrays: true } });

        // Lookup Subject inside Assignment
        pipeline.push({
            $lookup: {
                from: "subjects",
                localField: "assignmentDetails.subject",
                foreignField: "_id",
                as: "subjectDetails",
            },
        });
        pipeline.push({
            $unwind: { path: "$subjectDetails", preserveNullAndEmptyArrays: true },
        });

        // Lookup Semester inside Assignment
        pipeline.push({
            $lookup: {
                from: "semesters",
                localField: "assignmentDetails.semester",
                foreignField: "_id",
                as: "semesterDetails",
            },
        });
        pipeline.push({
            $unwind: { path: "$semesterDetails", preserveNullAndEmptyArrays: true },
        });

        // Lookup Student
        pipeline.push({
            $lookup: {
                from: "users",
                localField: "student",
                foreignField: "_id",
                as: "studentDetails",
            },
        });
        pipeline.push({ $unwind: "$studentDetails" });

        // Lookup Department inside Student
        pipeline.push({
            $lookup: {
                from: "departments",
                localField: "studentDetails.department",
                foreignField: "_id",
                as: "departmentDetails",
            },
        });
        pipeline.push({
            $unwind: { path: "$departmentDetails", preserveNullAndEmptyArrays: true },
        });

        // Calculate Percentage dynamically and concat fullName so we can filter by it
        pipeline.push({
            $addFields: {
                computedPercentage: {
                    $cond: [
                        { $gt: ["$classesDelivered", 0] },
                        {
                            $round: [
                                { $multiply: [{ $divide: ["$classesAttended", "$classesDelivered"] }, 100] },
                                2
                            ]
                        },
                        0
                    ]
                },
                studentFullName: {
                    $trim: {
                        input: {
                            $concat: [
                                { $ifNull: ["$studentDetails.firstName", ""] },
                                " ",
                                { $ifNull: ["$studentDetails.lastName", ""] }
                            ]
                        }
                    }
                }
            }
        });

        // Apply Filters
        const matchStage = {};
        
        if (filters.subject) {
            if (!mongoose.isValidObjectId(filters.subject)) {
                throw new ApiError(400, "Invalid subject ID format");
            }
            matchStage["assignmentDetails.subject"] = new Types.ObjectId(filters.subject);
        }
        if (filters.department) {
            if (!mongoose.isValidObjectId(filters.department)) {
                throw new ApiError(400, "Invalid department ID format");
            }
            matchStage["studentDetails.department"] = new Types.ObjectId(filters.department);
        }
        if (filters.batch) {
            matchStage["studentDetails.batch"] = filters.batch;
        }
        if (filters.section) {
            matchStage["studentDetails.section"] = filters.section;
        }
        if (filters.semester) {
            if (!mongoose.isValidObjectId(filters.semester)) {
                throw new ApiError(400, "Invalid semester ID format");
            }
            matchStage["assignmentDetails.semester"] = new Types.ObjectId(filters.semester);
        }
        if (filters.academicYear) {
            matchStage["assignmentDetails.academicYear"] = filters.academicYear;
        }

        // Attendance Percentage Filters
        if (filters.attendanceBelow || filters.attendanceAbove) {
            matchStage.computedPercentage = {};
            if (filters.attendanceBelow) {
                matchStage.computedPercentage.$lt = parseFloat(filters.attendanceBelow);
            }
            if (filters.attendanceAbove) {
                matchStage.computedPercentage.$gte = parseFloat(filters.attendanceAbove);
            }
        }

        // Date range filters based on updatedAt
        if (filters.fromDate || filters.toDate) {
            matchStage.updatedAt = {};
            if (filters.fromDate) {
                matchStage.updatedAt.$gte = new Date(filters.fromDate);
            }
            if (filters.toDate) {
                const toDateObj = new Date(filters.toDate);
                toDateObj.setHours(23, 59, 59, 999);
                matchStage.updatedAt.$lte = toDateObj;
            }
        }

        // Search by student name or roll number
        if (filters.search) {
            const searchRegex = new RegExp(filters.search, "i");
            matchStage.$or = [
                { "studentDetails.firstName": searchRegex },
                { "studentDetails.lastName": searchRegex },
                { "studentFullName": searchRegex },
                { "studentDetails.rollNumber": searchRegex },
            ];
        }

        if (Object.keys(matchStage).length > 0) {
            pipeline.push({ $match: matchStage });
        }

        // Sorting
        // Map common frontend sort keys to actual DB paths if necessary, otherwise use raw sort
        pipeline.push({ $sort: sort });

        // Pagination
        const skip = (page - 1) * limit;

        // Count total documents for pagination
        const countPipeline = [...pipeline, { $count: "total" }];
        const countResult = await AttendanceSummary.aggregate(countPipeline);
        const total = countResult.length > 0 ? countResult[0].total : 0;

        // Apply Skip and Limit
        pipeline.push({ $skip: skip });
        pipeline.push({ $limit: limit });

        const data = await AttendanceSummary.aggregate(pipeline);

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Aggregation — HOD Dashboard
    // ─────────────────────────────────────────────────────────────────────────

    async getHodDashboardStats(departmentId) {
        // Declare matchStage before it is used
        const matchStage = {};

        if (departmentId) {
            matchStage["studentDetails.department"] = new Types.ObjectId(departmentId);
        }

        const pipeline = [
            // Lookup Student
            {
                $lookup: {
                    from: "users",
                    localField: "student",
                    foreignField: "_id",
                    as: "studentDetails",
                },
            },
            { $unwind: "$studentDetails" },

            // Lookup Assignment
            {
                $lookup: {
                    from: "teacherassignments",
                    localField: "assignment",
                    foreignField: "_id",
                    as: "assignmentDetails",
                },
            },
            { $unwind: "$assignmentDetails" },

            // Lookup Subject
            {
                $lookup: {
                    from: "subjects",
                    localField: "assignmentDetails.subject",
                    foreignField: "_id",
                    as: "subjectDetails",
                },
            },
            { $unwind: { path: "$subjectDetails", preserveNullAndEmptyArrays: true } },

            // Lookup Department
            {
                $lookup: {
                    from: "departments",
                    localField: "studentDetails.department",
                    foreignField: "_id",
                    as: "departmentDetails",
                },
            },
            { $unwind: { path: "$departmentDetails", preserveNullAndEmptyArrays: true } },
        ];

        if (Object.keys(matchStage).length > 0) {
            pipeline.push({ $match: matchStage });
        }

        pipeline.push({
            $facet: {
                overall: [
                    {
                        $group: {
                            _id: null,
                            totalDelivered: { $sum: "$classesDelivered" },
                            totalAttended: { $sum: "$classesAttended" },
                        },
                    },
                ],
                departmentAverage: [
                    {
                        $group: {
                            _id: "$departmentDetails._id",
                            departmentName: { $first: "$departmentDetails.name" },
                            totalDelivered: { $sum: "$classesDelivered" },
                            totalAttended: { $sum: "$classesAttended" },
                        },
                    },
                ],
                subjectAverage: [
                    {
                        $group: {
                            _id: "$subjectDetails._id",
                            subjectName: { $first: "$subjectDetails.name" },
                            totalDelivered: { $sum: "$classesDelivered" },
                            totalAttended: { $sum: "$classesAttended" },
                        },
                    },
                ],
                studentsStats: [
                    {
                        $group: {
                            _id: "$studentDetails._id",
                            firstName: { $first: "$studentDetails.firstName" },
                            lastName: { $first: "$studentDetails.lastName" },
                            rollNumber: { $first: "$studentDetails.rollNumber" },
                            totalDelivered: { $sum: "$classesDelivered" },
                            totalAttended: { $sum: "$classesAttended" },
                        },
                    },
                    {
                        $addFields: {
                            percentage: {
                                $cond: [
                                    { $eq: ["$totalDelivered", 0] },
                                    0,
                                    {
                                        $multiply: [
                                            { $divide: ["$totalAttended", "$totalDelivered"] },
                                            100,
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
        });

        const result = await AttendanceSummary.aggregate(pipeline);
        return result[0];
    }
}

module.exports = new AttendanceSummaryRepository();
