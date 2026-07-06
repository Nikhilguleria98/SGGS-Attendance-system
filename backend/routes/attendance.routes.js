const express = require("express");

const router = express.Router();

const attendanceController = require("../controllers/attendance.controller");

const validate = require("../middleware/validate.middleware");
const { protect, authorize } = require("../middleware/auth.middleware");

const {
    markAttendanceSchema,
    updateAttendanceSchema,
    attendanceIdSchema,
} = require("../validators/attendance.validator");

router.use(protect);

router.post(
    "/",
    authorize("hod", "teacher"),
    validate(markAttendanceSchema),
    attendanceController.markAttendance
);

router.get(
    "/",
    authorize("hod", "teacher", "student"),
    attendanceController.getAttendance
);

router.get(
    "/:id",
    authorize("hod", "teacher", "student"),
    validate(attendanceIdSchema),
    attendanceController.getAttendanceById
);

router.patch(
    "/:id",
    authorize("hod", "teacher"),
    validate(updateAttendanceSchema),
    attendanceController.updateAttendance
);

router.delete(
    "/:id",
    authorize("hod", "teacher"),
    validate(attendanceIdSchema),
    attendanceController.deleteAttendance
);

module.exports = router;