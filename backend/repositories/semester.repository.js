const Semester = require("../models/Semester");

class SemesterRepository {
    async create(data) {
        return await Semester.create(data);
    }

    async findAll() {
        return await Semester.find({ isActive: true }).sort({ number: 1 });
    }

    async findById(id) {
        return await Semester.findById(id);
    }

    async findByNumber(number) {
        return await Semester.findOne({ number, isActive: true });
    }

    async updateById(id, data) {
        return await Semester.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id) {
        return await Semester.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );
    }
}

module.exports = new SemesterRepository();
