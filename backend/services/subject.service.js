const subjectRepository = require("../repositories/subject.repository");
const departmentRepository = require("../repositories/department.repository");

const ApiError = require("../utils/ApiError");

class SubjectService {
    async createSubject(data) {

        // Check duplicate subject name
        const existingSubject =
            await subjectRepository.findByName(data.name);

        if (existingSubject) {
            throw new ApiError(
                409,
                "Subject name already exists"
            );
        }

        // Check duplicate subject code
        const existingCode =
            await subjectRepository.findByCode(data.code);

        if (existingCode) {
            throw new ApiError(
                409,
                "Subject code already exists"
            );
        }

        // Check department
        const department =
            await departmentRepository.findById(
                data.department
            );

        if (!department) {
            throw new ApiError(
                404,
                "Department not found"
            );
        }

        return await subjectRepository.create(data);
    }

    async getSubjects() {
        return await subjectRepository.findAll();
    }

    async getSubjectById(id) {

        const subject =
            await subjectRepository.findById(id);

        if (!subject) {
            throw new ApiError(
                404,
                "Subject not found"
            );
        }

        return subject;
    }

    async getSubjectsByDepartment(departmentId) {

        return await subjectRepository.findByDepartment(
            departmentId
        );
    }

    async updateSubject(id, data) {

        if (data.name) {

            const existing =
                await subjectRepository.findByName(
                    data.name
                );

            if (
                existing &&
                existing._id.toString() !== id
            ) {
                throw new ApiError(
                    409,
                    "Subject name already exists"
                );
            }
        }

        if (data.code) {

            const existing =
                await subjectRepository.findByCode(
                    data.code
                );

            if (
                existing &&
                existing._id.toString() !== id
            ) {
                throw new ApiError(
                    409,
                    "Subject code already exists"
                );
            }
        }

        if (data.department) {

            const department =
                await departmentRepository.findById(
                    data.department
                );

            if (!department) {
                throw new ApiError(
                    404,
                    "Department not found"
                );
            }
        }

        const subject =
            await subjectRepository.updateById(
                id,
                data
            );

        if (!subject) {
            throw new ApiError(
                404,
                "Subject not found"
            );
        }

        return subject;
    }

    async deleteSubject(id) {

        const subject =
            await subjectRepository.deleteById(id);

        if (!subject) {
            throw new ApiError(
                404,
                "Subject not found"
            );
        }

        return subject;
    }
}

module.exports = new SubjectService();