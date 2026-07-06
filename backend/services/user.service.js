const userRepository = require("../repositories/user.repository");
const ApiError = require("../utils/ApiError");
const Roles = require("../constants/roles");
class UserService {
    async createUser(userData) {
        const existingUser = await userRepository.findByEmail(userData.email);

        if (existingUser) {
            throw new ApiError(409, "Email already exists");
        }

        return await userRepository.create(userData);
    }

    async getAllUsers(role) {

        if (role) {
            return await userRepository.findByRole(role);
        }
    
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
        if (updateData.password) {
            const bcrypt = require("bcryptjs");
            const salt = await bcrypt.genSalt(12);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }
        return await userRepository.updateById(id, updateData);
    }

    async deleteUser(id) {
        return await userRepository.deleteById(id);
    }

    // get by role
    async getStudents() {
        return await userRepository.findByRole(Roles.STUDENT);
    }
    
    async getTeachers() {
        return await userRepository.findByRole(Roles.TEACHER);
    }
    
    async getHods() {
        return await userRepository.findByRole(Roles.HOD);
    }
}

module.exports = new UserService();