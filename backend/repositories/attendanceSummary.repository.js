const AttendanceSummary = require("../models/AttendanceSummary");

class AttendanceSummaryRepository {
    async create(data) {
        return await AttendanceSummary.create(data);
    }

    async findByAssignmentAndStudent(assignmentId, studentId) {
        return await AttendanceSummary.findOne({ assignment: assignmentId, student: studentId });
    }

    async findByStudentId(studentId) {
        return await AttendanceSummary.find({ student: studentId })
            .populate({
                path: "assignment",
                populate: [
                    { path: "teacher", select: "firstName lastName employeeId" },
                    { path: "subject", select: "name code" }
                ]
            });
    }

    async updateById(id, data) {
        return await AttendanceSummary.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async findAll() {
        return await AttendanceSummary.find()
            .populate("student", "firstName lastName rollNumber")
            .populate({
                path: "assignment",
                populate: [
                    { path: "teacher", select: "firstName lastName employeeId" },
                    { path: "subject", select: "name code" }
                ]
            });
    }

    async deleteById(id) {
        return await AttendanceSummary.findByIdAndDelete(id);
    }

    async getTeacherReport(filters = {}, options = {}) {
        const { page = 1, limit = 10, sort = { createdAt: -1 } } = options;
        
        const pipeline = [];

        // Lookup Assignment
        pipeline.push({
            $lookup: {
                from: "teacherassignments",
                localField: "assignment",
                foreignField: "_id",
                as: "assignmentDetails"
            }
        });
        pipeline.push({ $unwind: "$assignmentDetails" });

        // Lookup Subject inside Assignment
        pipeline.push({
            $lookup: {
                from: "subjects",
                localField: "assignmentDetails.subject",
                foreignField: "_id",
                as: "subjectDetails"
            }
        });
        pipeline.push({ $unwind: { path: "$subjectDetails", preserveNullAndEmptyArrays: true } });

        // Lookup Student
        pipeline.push({
            $lookup: {
                from: "users",
                localField: "student",
                foreignField: "_id",
                as: "studentDetails"
            }
        });
        pipeline.push({ $unwind: "$studentDetails" });

        // Lookup Department inside Student
        pipeline.push({
            $lookup: {
                from: "departments",
                localField: "studentDetails.department",
                foreignField: "_id",
                as: "departmentDetails"
            }
        });
        pipeline.push({ $unwind: { path: "$departmentDetails", preserveNullAndEmptyArrays: true } });

        // Apply Filters
        const matchStage = {};
        if (filters.subject) {
            matchStage["assignmentDetails.subject"] = new require("mongoose").Types.ObjectId(filters.subject);
        }
        if (filters.department) {
            matchStage["studentDetails.department"] = new require("mongoose").Types.ObjectId(filters.department);
        }
        if (filters.batch) {
            matchStage["studentDetails.batch"] = filters.batch;
        }
        if (filters.section) {
            matchStage["studentDetails.section"] = filters.section;
        }

        if (Object.keys(matchStage).length > 0) {
            pipeline.push({ $match: matchStage });
        }

        // Sorting
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
            totalPages: Math.ceil(total / limit)
        };
    }

    async getHodDashboardStats(departmentId) {
        if (departmentId) {
            matchStage["studentDetails.department"] = new require("mongoose").Types.ObjectId(departmentId);
        }

        const pipeline = [
            // Lookup Student
            {
                $lookup: {
                    from: "users",
                    localField: "student",
                    foreignField: "_id",
                    as: "studentDetails"
                }
            },
            { $unwind: "$studentDetails" },

            // Lookup Assignment
            {
                $lookup: {
                    from: "teacherassignments",
                    localField: "assignment",
                    foreignField: "_id",
                    as: "assignmentDetails"
                }
            },
            { $unwind: "$assignmentDetails" },

            // Lookup Subject
            {
                $lookup: {
                    from: "subjects",
                    localField: "assignmentDetails.subject",
                    foreignField: "_id",
                    as: "subjectDetails"
                }
            },
            { $unwind: { path: "$subjectDetails", preserveNullAndEmptyArrays: true } },

            // Lookup Department
            {
                $lookup: {
                    from: "departments",
                    localField: "studentDetails.department",
                    foreignField: "_id",
                    as: "departmentDetails"
                }
            },
            { $unwind: { path: "$departmentDetails", preserveNullAndEmptyArrays: true } }
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
                            totalAttended: { $sum: "$classesAttended" }
                        }
                    }
                ],
                departmentAverage: [
                    {
                        $group: {
                            _id: "$departmentDetails._id",
                            departmentName: { $first: "$departmentDetails.name" },
                            totalDelivered: { $sum: "$classesDelivered" },
                            totalAttended: { $sum: "$classesAttended" }
                        }
                    }
                ],
                subjectAverage: [
                    {
                        $group: {
                            _id: "$subjectDetails._id",
                            subjectName: { $first: "$subjectDetails.name" },
                            totalDelivered: { $sum: "$classesDelivered" },
                            totalAttended: { $sum: "$classesAttended" }
                        }
                    }
                ],
                studentsStats: [
                    {
                        $group: {
                            _id: "$studentDetails._id",
                            firstName: { $first: "$studentDetails.firstName" },
                            lastName: { $first: "$studentDetails.lastName" },
                            rollNumber: { $first: "$studentDetails.rollNumber" },
                            totalDelivered: { $sum: "$classesDelivered" },
                            totalAttended: { $sum: "$classesAttended" }
                        }
                    },
                    {
                        $addFields: {
                            percentage: {
                                $cond: [
                                    { $eq: ["$totalDelivered", 0] },
                                    0,
                                    { $multiply: [{ $divide: ["$totalAttended", "$totalDelivered"] }, 100] }
                                ]
                            }
                        }
                    }
                ]
            }
        });

        const result = await AttendanceSummary.aggregate(pipeline);
        return result[0];
    }
}

module.exports = new AttendanceSummaryRepository();
