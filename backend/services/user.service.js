const userRepository = require("../repositories/user.repository");
const ApiError = require("../utils/ApiError");
const Roles = require("../constants/roles");
class UserService {
    async processAssignments(assignmentsArray, teacherId = null) {
        const TeacherAssignment = require("../models/TeacherAssignment");
        const Subject = require("../models/Subject");
        const ApiError = require("../utils/ApiError");

        const academicYear = "2024-2025";
        let newAssignments = [];
        let createdAssignmentIds = [];

        if (!assignmentsArray || !Array.isArray(assignmentsArray)) return [];

        for (const assignment of assignmentsArray) {
            const { subjects = [], batches = [], groups = [] } = assignment;
            for (const subjectName of subjects) {
                const existingSubject = await Subject.findOne({ name: { $regex: new RegExp(`^${subjectName}$`, "i") } });
                if (!existingSubject) {
                    throw new ApiError(404, `Subject '${subjectName}' not found. Please create it first.`);
                }
                
                for (const batch of batches) {
                    for (const group of groups) {
                        const payload = {
                            subject: existingSubject._id,
                            department: existingSubject.department,
                            batch: batch,
                            section: group,
                            semester: existingSubject.semester,
                            academicYear: academicYear
                        };

                        if (teacherId) {
                            payload.teacher = teacherId;
                            // Check for duplicates
                            const exists = await TeacherAssignment.findOne(payload);
                            if (exists) {
                                throw new ApiError(409, `Teacher assignment already exists for ${subjectName}, Batch ${batch}, Group ${group}.`);
                            }
                        }
                        
                        newAssignments.push(payload);
                    }
                }
            }
        }
        return newAssignments;
    }

    async createUser(userData) {
        const existingUser = await userRepository.findByEmail(userData.email);

        if (existingUser) {
            throw new ApiError(409, "Email already exists");
        }

        // Validate assignments before creating the user
        let pendingAssignments = await this.processAssignments(userData.assignments, null);

        // Remove array duplications inside User
        delete userData.subjects;
        delete userData.batches;
        delete userData.groups;
        
        // Temporarily remove assignments to not save raw data
        const rawAssignments = userData.assignments;
        delete userData.assignments;

        const user = await userRepository.create(userData);

        if (pendingAssignments.length > 0) {
            const TeacherAssignment = require("../models/TeacherAssignment");
            const ApiError = require("../utils/ApiError");

            // Attach teacher id and validate duplicates now that we have teacher id
            for (let i = 0; i < pendingAssignments.length; i++) {
                pendingAssignments[i].teacher = user._id;
                const exists = await TeacherAssignment.findOne(pendingAssignments[i]);
                if (exists) {
                    // Cleanup user if assignment fails
                    await userRepository.deleteById(user._id);
                    throw new ApiError(409, `Teacher assignment already exists for this subject, batch and group.`);
                }
            }

            const createdAssignments = await TeacherAssignment.insertMany(pendingAssignments);
            user.assignments = createdAssignments.map(a => a._id);
            await user.save();
        }

        return user;
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
        const User = require("../models/users");
        const user = await User.findById(id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // If assignments are being updated
        if (updateData.assignments) {
            const pendingAssignments = await this.processAssignments(updateData.assignments, user._id);
            
            const TeacherAssignment = require("../models/TeacherAssignment");
            
            // Delete old assignments for this teacher
            await TeacherAssignment.deleteMany({ teacher: user._id });
            
            let newAssignmentIds = [];
            if (pendingAssignments.length > 0) {
                const createdAssignments = await TeacherAssignment.insertMany(pendingAssignments);
                newAssignmentIds = createdAssignments.map(a => a._id);
            }
            updateData.assignments = newAssignmentIds;
        }

        delete updateData.subjects;
        delete updateData.batches;
        delete updateData.groups;

        for (const key in updateData) {
            user[key] = updateData[key];
        }

        user.subjects = [];
        user.batches = [];
        user.groups = [];

        await user.save();
        return await userRepository.findById(id);
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