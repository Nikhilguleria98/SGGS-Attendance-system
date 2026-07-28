const subjectService = require("../services/subject.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

// ==========================
// Create Subject
// ==========================
exports.createSubject = asyncHandler(async (req, res) => {
    const subject = await subjectService.createSubject(
        req.validatedData.body
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            "Subject created successfully",
            subject
        )
    );
});

// ==========================
// Get All Subjects
// ==========================
exports.getSubjects = asyncHandler(async (req, res) => {
    const subjects = await subjectService.getSubjects();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Subjects fetched successfully",
            subjects
        )
    );
});

// ==========================
// Get Subject By Id
// ==========================
exports.getSubject = asyncHandler(async (req, res) => {
    const subject = await subjectService.getSubjectById(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Subject fetched successfully",
            subject
        )
    );
});

// ==========================
// Get Subjects By Department
// ==========================
exports.getSubjectsByDepartment = asyncHandler(async (req, res) => {
    const subjects =
        await subjectService.getSubjectsByDepartment(
            req.params.departmentId
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Subjects fetched successfully",
            subjects
        )
    );
});

// ==========================
// Update Subject
// ==========================
exports.updateSubject = asyncHandler(async (req, res) => {
    const subject = await subjectService.updateSubject(
        req.params.id,
        req.validatedData.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Subject updated successfully",
            subject
        )
    );
});

// ==========================
// Delete Subject
// ==========================
exports.deleteSubject = asyncHandler(async (req, res) => {
    await subjectService.deleteSubject(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Subject deleted successfully"
        )
    );
});