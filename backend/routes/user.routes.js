const express = require("express");

const router = express.Router();

const validate = require("../middleware/validate.middleware");
const { protect, authorize } = require("../middleware/auth.middleware");

const {
    createUserSchema,
    updateUserSchema,
} = require("../validators/user.validator");

const userController = require("../controllers/user.controller");

// ==========================
// Apply protect to all routes
// ==========================
router.use(protect);

// ==========================
// Create
// ==========================
// HOD and Teacher can create users (students)
router.post("/", authorize("hod", "teacher"), validate(createUserSchema), userController.createUser);

// HOD and Teacher can get users (Teachers might need to see students)
router.get("/", authorize("hod", "teacher"), userController.getUsers);

router.get("/:id", authorize("hod", "teacher"), userController.getUser);

// Only HOD and Teacher can update or delete users
router.patch(
    "/:id",
    authorize("hod", "teacher"),
    validate(updateUserSchema),
    userController.updateUser
);

router.delete("/:id", authorize("hod", "teacher"), userController.deleteUser);

module.exports = router;