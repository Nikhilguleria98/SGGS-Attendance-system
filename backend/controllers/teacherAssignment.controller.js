const teacherAssignmentService = require("../services/teacherAssignment.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

// ==========================
// Create Assignment
// ==========================

exports.createAssignment = asyncHandler(async (req, res) => {
    const assignment = await teacherAssignmentService.createAssignment(
        req.validatedData.body
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            "Teacher assignment created successfully",
            assignment
        )
    );
});

// ==========================
// Get All Assignments
// ==========================

exports.getAssignments = asyncHandler(async (req, res) => {
    const assignments =
        await teacherAssignmentService.getAssignments();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Assignments fetched successfully",
            assignments
        )
    );
});

// ==========================
// Get Assignment By Id
// ==========================

exports.getAssignment = asyncHandler(async (req, res) => {
    const assignment =
        await teacherAssignmentService.getAssignmentById(
            req.params.id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Assignment fetched successfully",
            assignment
        )
    );
});

// ==========================
// Get My Assignments
// ==========================

exports.getMyAssignments = asyncHandler(async (req, res) => {
    const assignments =
        await teacherAssignmentService.getAssignmentsByTeacher(
            req.user._id
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            "My assignments fetched successfully",
            assignments
        )
    );
});

// ==========================
// Get Assignment Students
// ==========================

exports.getAssignmentStudents = asyncHandler(async (req, res) => {
    const students = await teacherAssignmentService.getAssignmentStudents(
        req.params.assignmentId,
        req.user._id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Students fetched successfully",
            students
        )
    );
});

// ==========================
// Get Assignments By Teacher
// ==========================

exports.getAssignmentsByTeacher = asyncHandler(async (req, res) => {
    const assignments =
        await teacherAssignmentService.getAssignmentsByTeacher(
            req.params.teacherId
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Teacher assignments fetched successfully",
            assignments
        )
    );
});

// ==========================
// Get Assignments By Department
// ==========================

exports.getAssignmentsByDepartment = asyncHandler(async (req, res) => {
    const assignments =
        await teacherAssignmentService.getAssignmentsByDepartment(
            req.params.departmentId
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Department assignments fetched successfully",
            assignments
        )
    );
});

// ==========================
// Update Assignment
// ==========================

exports.updateAssignment = asyncHandler(async (req, res) => {
    const assignment =
        await teacherAssignmentService.updateAssignment(
            req.params.id,
            req.validatedData.body
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Assignment updated successfully",
            assignment
        )
    );
});

// ==========================
// Delete Assignment
// ==========================

exports.deleteAssignment = asyncHandler(async (req, res) => {
    await teacherAssignmentService.deleteAssignment(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Assignment deleted successfully"
        )
    );
});