const semesterService = require("../services/semester.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

// ==========================
// Create Semester
// ==========================

exports.createSemester = asyncHandler(async (req, res) => {
    const semester = await semesterService.createSemester(req.body);
    return res.status(201).json(
        new ApiResponse(
            201,
            "Semester created successfully",
            semester
        )
    );
});

// ==========================
// Get All Semesters
// ==========================

exports.getSemesters = asyncHandler(async (req, res) => {
    const semesters = await semesterService.getSemesters();
    return res.status(200).json(
        new ApiResponse(
            200,
            "Semesters fetched successfully",
            semesters
        )
    );
});

// ==========================
// Get Semester by ID
// ==========================

exports.getSemesterById = asyncHandler(async (req, res) => {
    const semester = await semesterService.getSemesterById(req.params.id);
    return res.status(200).json(
        new ApiResponse(
            200,
            "Semester fetched successfully",
            semester
        )
    );
});

// ==========================
// Update Semester
// ==========================

exports.updateSemester = asyncHandler(async (req, res) => {
    const semester = await semesterService.updateSemester(req.params.id, req.body);
    return res.status(200).json(
        new ApiResponse(
            200,
            "Semester updated successfully",
            semester
        )
    );
});

// ==========================
// Delete Semester
// ==========================

exports.deleteSemester = asyncHandler(async (req, res) => {
    const semester = await semesterService.deleteSemester(req.params.id);
    return res.status(200).json(
        new ApiResponse(
            200,
            "Semester deleted successfully",
            semester
        )
    );
});
