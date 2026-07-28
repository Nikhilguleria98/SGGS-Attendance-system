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

// Custom authorization middleware to allow self-access or role-based access
const authorizeSelfOrRoles = (...roles) => {
    return (req, res, next) => {
        if (req.user && (req.user._id.toString() === req.params.id || roles.includes(req.user.role))) {
            return next();
        }
        return res.status(403).json({
            success: false,
            message: `User is not authorized to access this resource`,
        });
    };
};

// ==========================
// Create
// ==========================
// HOD and Teacher can create users (students)
router.post("/", authorize("hod", "teacher"), validate(createUserSchema), userController.createUser);

// HOD and Teacher can get users (Teachers might need to see students)
router.get("/", authorize("hod", "teacher"), userController.getUsers);

router.get("/:id", authorizeSelfOrRoles("hod", "teacher"), userController.getUser);

// Only HOD and Teacher can update/delete users, but users can update themselves
router.patch(
    "/:id",
    authorizeSelfOrRoles("hod", "teacher"),
    validate(updateUserSchema),
    userController.updateUser
);

router.delete("/:id", authorize("hod", "teacher"), userController.deleteUser);

module.exports = router;