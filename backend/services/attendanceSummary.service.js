const attendanceSummaryRepository = require("../repositories/attendanceSummary.repository");
const ApiError = require("../utils/ApiError");

class AttendanceSummaryService {
    async createSummary(data) {
        return await attendanceSummaryRepository.create(data);
    }

    async getAllSummaries() {
        return await attendanceSummaryRepository.findAll();
    }

    async getSummaryByAssignmentAndStudent(assignmentId, studentId) {
        const summary = await attendanceSummaryRepository.findByAssignmentAndStudent(assignmentId, studentId);
        if (!summary) {
            throw new ApiError(404, "Attendance summary not found");
        }
        return summary;
    }

    async getStudentDashboardData(studentId) {
        const summaries = await attendanceSummaryRepository.findByStudentId(studentId);
        
        return summaries.map(summary => {
            const percentage = summary.classesDelivered > 0 
                ? ((summary.classesAttended / summary.classesDelivered) * 100).toFixed(2) 
                : 0;
            
            return {
                subject: summary.assignment.subject.name,
                subjectCode: summary.assignment.subject.code,
                teacher: `${summary.assignment.teacher.firstName} ${summary.assignment.teacher.lastName}`.trim(),
                delivered: summary.classesDelivered,
                attended: summary.classesAttended,
                absent: summary.classesAbsent,
                percentage: parseFloat(percentage)
            };
        });
    }

    async getTeacherReportData(filters, options) {
        const result = await attendanceSummaryRepository.getTeacherReport(filters, options);
        
        const mappedData = result.data.map(summary => {
            const percentage = summary.classesDelivered > 0 
                ? ((summary.classesAttended / summary.classesDelivered) * 100).toFixed(2) 
                : 0;
            
            return {
                student: `${summary.studentDetails.firstName} ${summary.studentDetails.lastName || ''}`.trim(),
                rollNumber: summary.studentDetails.rollNumber,
                department: summary.departmentDetails ? summary.departmentDetails.name : "",
                batch: summary.studentDetails.batch || "",
                section: summary.studentDetails.section || "",
                subject: summary.subjectDetails ? summary.subjectDetails.name : "",
                delivered: summary.classesDelivered,
                attended: summary.classesAttended,
                absent: summary.classesAbsent,
                percentage: parseFloat(percentage)
            };
        });

        return {
            ...result,
            data: mappedData
        };
    }

    async getHodDashboardData(departmentId) {
        const stats = await attendanceSummaryRepository.getHodDashboardStats(departmentId);
        
        if (!stats) {
            return { overall: null, departmentAverage: [], subjectAverage: [], below75: [], topPerformers: [], monthlyTrend: [] };
        }

        const calcPercentage = (attended, delivered) => {
            if (!delivered) return 0;
            return parseFloat(((attended / delivered) * 100).toFixed(2));
        };

        const overall = stats.overall[0] ? {
            delivered: stats.overall[0].totalDelivered,
            attended: stats.overall[0].totalAttended,
            percentage: calcPercentage(stats.overall[0].totalAttended, stats.overall[0].totalDelivered)
        } : null;

        const departmentAverage = stats.departmentAverage.map(d => ({
            departmentId: d._id,
            departmentName: d.departmentName,
            percentage: calcPercentage(d.totalAttended, d.totalDelivered)
        }));

        const subjectAverage = stats.subjectAverage.map(s => ({
            subjectId: s._id,
            subjectName: s.subjectName,
            percentage: calcPercentage(s.totalAttended, s.totalDelivered)
        }));

        const studentsStats = stats.studentsStats || [];
        
        const below75 = studentsStats.filter(s => s.percentage < 75).map(s => ({
            studentId: s._id,
            name: `${s.firstName} ${s.lastName || ''}`.trim(),
            rollNumber: s.rollNumber,
            percentage: s.percentage
        }));

        const topPerformers = studentsStats
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 10)
            .map(s => ({
                studentId: s._id,
                name: `${s.firstName} ${s.lastName || ''}`.trim(),
                rollNumber: s.rollNumber,
                percentage: s.percentage
            }));

        return {
            overall,
            departmentAverage,
            subjectAverage,
            below75,
            topPerformers,
            monthlyTrend: [] // Not supported natively in AttendanceSummary
        };
    }

    async updateSummary(id, data) {
        const summary = await attendanceSummaryRepository.updateById(id, data);
        if (!summary) {
            throw new ApiError(404, "Attendance summary not found");
        }
        return summary;
    }

    async deleteSummary(id) {
        const summary = await attendanceSummaryRepository.deleteById(id);
        if (!summary) {
            throw new ApiError(404, "Attendance summary not found");
        }
        return summary;
    }
}

module.exports = new AttendanceSummaryService();
