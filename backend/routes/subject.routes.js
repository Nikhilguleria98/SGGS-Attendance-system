const express = require("express");

const router = express.Router();

const validate = require("../middleware/validate.middleware");

const subjectController = require("../controllers/subject.controller");

const {
    createSubjectSchema,
    updateSubjectSchema,
} = require("../validators/subject.validator");

// ==========================
// Create
// ==========================
router.post(
    "/",
    validate(createSubjectSchema),
    subjectController.createSubject
);

// ==========================
// Read
// ==========================

// Get all subjects
router.get(
    "/",
    subjectController.getSubjects
);

// Get subjects by department
router.get(
    "/department/:departmentId",
    subjectController.getSubjectsByDepartment
);

// Get subject by id
router.get(
    "/:id",
    subjectController.getSubject
);

// ==========================
// Update
// ==========================
router.patch(
    "/:id",
    validate(updateSubjectSchema),
    subjectController.updateSubject
);

// ==========================
// Delete
// ==========================
router.delete(
    "/:id",
    subjectController.deleteSubject
);

module.exports = router;