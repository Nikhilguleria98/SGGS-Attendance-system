const express = require("express");

const router = express.Router();

const attendanceController = require("../controllers/attendance.controller");

const validate = require("../middleware/validate.middleware");

const {
    markAttendanceSchema,
    updateAttendanceSchema,
    attendanceIdSchema,
} = require("../validators/attendance.validator");

router.post(
    "/",
    validate(markAttendanceSchema),
    attendanceController.markAttendance
);

router.get(
    "/",
    attendanceController.getAttendance
);

router.get(
    "/:id",
    validate(attendanceIdSchema),
    attendanceController.getAttendanceById
);

router.patch(
    "/:id",
    validate(updateAttendanceSchema),
    attendanceController.updateAttendance
);

router.delete(
    "/:id",
    validate(attendanceIdSchema),
    attendanceController.deleteAttendance
);

module.exports = router;