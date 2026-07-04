const express = require("express");

const router = express.Router();

const validate = require("../middleware/validate.middleware");

const {
    createUserSchema,
} = require("../validators/user.validator");

const userController = require("../controllers/user.controller");

router.post(
    "/",
    validate(createUserSchema),
    userController.createUser
);

router.get("/", userController.getUsers);

router.get("/:id", userController.getUser);

router.patch("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;