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
// Only HOD can create users
router.post("/", authorize("hod"), validate(createUserSchema), userController.createUser);

// HOD and Teacher can get users (Teachers might need to see students)
router.get("/", authorize("hod", "teacher"), userController.getUsers);

router.get("/:id", authorize("hod", "teacher"), userController.getUser);

// Only HOD can update or delete users
router.patch(
    "/:id",
    authorize("hod"),
    validate(updateUserSchema),
    userController.updateUser
);

router.delete("/:id", authorize("hod"), userController.deleteUser);

module.exports = router;