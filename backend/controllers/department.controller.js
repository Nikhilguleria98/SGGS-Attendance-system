const departmentService = require("../services/department.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

// ==========================
// Create Department
// ==========================
exports.createDepartment = asyncHandler(async (req, res) => {
    const department = await departmentService.createDepartment(
        req.validatedData.body
    );

    return res.status(201).json(
        new ApiResponse(
            201,
            "Department created successfully",
            department
        )
    );
});

// ==========================
// Get All Departments
// ==========================
exports.getDepartments = asyncHandler(async (req, res) => {
    const departments = await departmentService.getDepartments();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Departments fetched successfully",
            departments
        )
    );
});

// ==========================
// Get Department By Id
// ==========================
exports.getDepartment = asyncHandler(async (req, res) => {
    const department = await departmentService.getDepartmentById(
        req.params.id
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Department fetched successfully",
            department
        )
    );
});

// ==========================
// Update Department
// ==========================
exports.updateDepartment = asyncHandler(async (req, res) => {
    const department = await departmentService.updateDepartment(
        req.params.id,
        req.validatedData.body
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "Department updated successfully",
            department
        )
    );
});

// ==========================
// Delete Department
// ==========================
exports.deleteDepartment = asyncHandler(async (req, res) => {
    await departmentService.deleteDepartment(req.params.id);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Department deleted successfully"
        )
    );
});