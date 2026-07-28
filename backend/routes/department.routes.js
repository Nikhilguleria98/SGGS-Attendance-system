const express = require("express");

const router = express.Router();

const validate = require("../middleware/validate.middleware");
const { protect, authorize } = require("../middleware/auth.middleware");

const departmentController = require("../controllers/department.controller");

const {
    createDepartmentSchema,
    updateDepartmentSchema,
} = require("../validators/department.validator");

router.use(protect);

// ==========================
// Create
// ==========================
router.post(
    "/",
    authorize("hod"),
    validate(createDepartmentSchema),
    departmentController.createDepartment
);

// ==========================
// Read
// ==========================

// Get all departments
router.get(
    "/",
    authorize("hod", "teacher", "student"),
    departmentController.getDepartments
);

// Get department by id
router.get(
    "/:id",
    authorize("hod", "teacher", "student"),
    departmentController.getDepartment
);

// ==========================
// Update
// ==========================
router.patch(
    "/:id",
    authorize("hod"),
    validate(updateDepartmentSchema),
    departmentController.updateDepartment
);

// ==========================
// Delete
// ==========================
router.delete(
    "/:id",
    authorize("hod"),
    departmentController.deleteDepartment
);

module.exports = router;