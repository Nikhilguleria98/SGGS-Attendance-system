const semesterRepository = require("../repositories/semester.repository");
const ApiError = require("../utils/ApiError");

class SemesterService {
    async createSemester(data) {
        if (!data.number) {
            throw new ApiError(400, "Semester number is required");
        }

        const num = Number(data.number);
        if (num < 1 || num > 8) {
            throw new ApiError(400, "Semester number must be between 1 and 8");
        }

        const existing = await semesterRepository.findByNumber(num);
        if (existing) {
            throw new ApiError(409, `Semester ${num} already exists`);
        }

        if (!data.name) {
            data.name = `Semester ${num}`;
        }

        return await semesterRepository.create(data);
    }

    async getSemesters() {
        return await semesterRepository.findAll();
    }

    async getSemesterById(id) {
        const semester = await semesterRepository.findById(id);
        if (!semester) {
            throw new ApiError(404, "Semester not found");
        }
        return semester;
    }

    async getSemesterByNumber(number) {
        const semester = await semesterRepository.findByNumber(number);
        if (!semester) {
            throw new ApiError(404, "Semester not found");
        }
        return semester;
    }

    async updateSemester(id, data) {
        const semester = await semesterRepository.findById(id);
        if (!semester) {
            throw new ApiError(404, "Semester not found");
        }

        if (data.number && Number(data.number) !== semester.number) {
            const num = Number(data.number);
            if (num < 1 || num > 8) {
                throw new ApiError(400, "Semester number must be between 1 and 8");
            }
            const existing = await semesterRepository.findByNumber(num);
            if (existing && existing._id.toString() !== id) {
                throw new ApiError(409, `Semester ${num} already exists`);
            }
            if (!data.name) {
                data.name = `Semester ${num}`;
            }
        }

        return await semesterRepository.updateById(id, data);
    }

    async deleteSemester(id) {
        const semester = await semesterRepository.deleteById(id);
        if (!semester) {
            throw new ApiError(404, "Semester not found");
        }
        return semester;
    }
}

module.exports = new SemesterService();
