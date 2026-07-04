const userService = require("../services/user.service");

const asyncHandler = require("../utils/asyncHandler");

const { success } = require("../utils/response");

// Create Users
exports.createUser = asyncHandler(async (req, res) => {
    const user = await userService.createUser(
        req.validatedData.body
    );

    return success(
        res,
        201,
        "User created successfully",
        user
    );
});

// Fetch Users
exports.getUsers = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();

    return success(
        res,
        200,
        "Users fetched successfully",
        users
    );
});

exports.getUser = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(
        req.params.id
    );

    return success(
        res,
        200,
        "User fetched successfully",
        user
    );
});

exports.updateUser = asyncHandler(async (req, res) => {
    const user = await userService.updateUser(
        req.params.id,
        req.validatedData.body
    );

    return success(
        res,
        200,
        "User updated successfully",
        user
    );
});

exports.deleteUser = asyncHandler(async (req, res) => {
    await userService.deleteUser(req.params.id);

    return success(
        res,
        200,
        "User deleted successfully"
    );
});