const userRepository = require("../repositories/user.repository");
const ApiError = require("../utils/ApiError");

class UserService {
    async createUser(userData) {
        const existingUser = await userRepository.findByEmail(userData.email);

        if (existingUser) {
            throw new ApiError(409, "Email already exists");
        }

        return await userRepository.create(userData);
    }

    async getAllUsers() {
        return await userRepository.findAll();
    }

    async getUserById(id) {
        const user = await userRepository.findById(id);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        return user;
    }

    async updateUser(id, updateData) {
        return await userRepository.updateById(id, updateData);
    }

    async deleteUser(id) {
        return await userRepository.deleteById(id);
    }
}

module.exports = new UserService();