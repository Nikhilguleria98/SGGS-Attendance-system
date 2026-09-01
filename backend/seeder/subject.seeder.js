const Subject = require("../models/Subject");

const subjectSeeder = async (departmentId, hodId, semesterMap) => {
    return [
        {
            name: "Data Structures",
            code: "CS201",
            department: departmentId,
            semester: semesterMap[3],
            credits: 4,
            hod: hodId
        },
        {
            name: "Database Management Systems",
            code: "CS301",
            department: departmentId,
            semester: semesterMap[5],
            credits: 4,
            hod: hodId
        },
        {
            name: "Operating Systems",
            code: "CS401",
            department: departmentId,
            semester: semesterMap[4],
            credits: 4,
            hod: hodId
        }
    ];
};

module.exports = subjectSeeder;
