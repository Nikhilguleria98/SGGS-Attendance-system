const express = require("express");

const router = express.Router();

const validate = require("../middleware/validate.middleware");

const departmentController = require("../controllers/department.controller");

const {
    createDepartmentSchema,
    updateDepartmentSchema,
} = require("../validators/department.validator");

// ==========================
// Create
// ==========================
router.post(
    "/",
    validate(createDepartmentSchema),
    departmentController.createDepartment
);

// ==========================
// Read
// ==========================

// Get all departments
router.get(
    "/",
    departmentController.getDepartments
);

// Get department by id
router.get(
    "/:id",
    departmentController.getDepartment
);

// ==========================
// Update
// ==========================
router.patch(
    "/:id",
    validate(updateDepartmentSchema),
    departmentController.updateDepartment
);

// ==========================
// Delete
// ==========================
router.delete(
    "/:id",
    departmentController.deleteDepartment
);

module.exports = router;