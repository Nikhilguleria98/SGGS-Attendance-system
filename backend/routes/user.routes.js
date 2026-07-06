const express = require("express");

const router = express.Router();

const validate = require("../middleware/validate.middleware");

const {
    createUserSchema,
    updateUserSchema,
} = require("../validators/user.validator");

const userController = require("../controllers/user.controller");

// ==========================
// Create
// ==========================
router.post("/", validate(createUserSchema), userController.createUser);

router.get("/", userController.getUsers);

// router.get("/search", userController.searchUsers);

router.get("/:id", userController.getUser);

router.patch(
    "/:id",
    validate(updateUserSchema),
    userController.updateUser
);

router.delete("/:id", userController.deleteUser
);

module.exports = router;