const departmentRepository = require("../repositories/department.repository");
const userRepository = require("../repositories/user.repository");

const Roles = require("../constants/roles");
const ApiError = require("../utils/ApiError");

class DepartmentService {
    async createDepartment(data) {

        // Check duplicate department name
        const existingDepartment =
            await departmentRepository.findByName(data.name);

        if (existingDepartment) {
            throw new ApiError(
                409,
                "Department name already exists"
            );
        }

        // Check duplicate department code
        const existingCode =
            await departmentRepository.findByCode(data.code);

        if (existingCode) {
            throw new ApiError(
                409,
                "Department code already exists"
            );
        }

        // Validate HOD (optional)
        if (data.hod) {

            const hod = await userRepository.findById(data.hod);

            if (!hod) {
                throw new ApiError(
                    404,
                    "HOD not found"
                );
            }

            if (hod.role !== Roles.HOD) {
                throw new ApiError(
                    400,
                    "Selected user is not a HOD"
                );
            }
        }

        return await departmentRepository.create(data);
    }

    async getDepartments() {
        return await departmentRepository.findAll();
    }

    async getDepartmentById(id) {

        const department =
            await departmentRepository.findById(id);

        if (!department) {
            throw new ApiError(
                404,
                "Department not found"
            );
        }

        return department;
    }

    async updateDepartment(id, data) {

        // Duplicate Name
        if (data.name) {

            const existing =
                await departmentRepository.findByName(data.name);

            if (
                existing &&
                existing._id.toString() !== id
            ) {
                throw new ApiError(
                    409,
                    "Department name already exists"
                );
            }
        }

        // Duplicate Code
        if (data.code) {

            const existing =
                await departmentRepository.findByCode(data.code);

            if (
                existing &&
                existing._id.toString() !== id
            ) {
                throw new ApiError(
                    409,
                    "Department code already exists"
                );
            }
        }

        const department =
            await departmentRepository.updateById(
                id,
                data
            );

        if (!department) {
            throw new ApiError(
                404,
                "Department not found"
            );
        }

        return department;
    }

    async deleteDepartment(id) {

        const department =
            await departmentRepository.deleteById(id);

        if (!department) {
            throw new ApiError(
                404,
                "Department not found"
            );
        }

        return department;
    }
}

module.exports = new DepartmentService();