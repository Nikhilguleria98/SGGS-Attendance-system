import React, { useState, useEffect } from "react";
import {
  Search,
  Users,
  CheckCircle,
  AlertCircle,
  Award,
} from "lucide-react";

const StudentReports = () => {
  const [students, setStudents] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    department: "",
    batch: "",
    section: "",
    subject: "",
  });

  // Dummy data (replace with API)
  useEffect(() => {
    setStudents([
      {
        _id: 1,
        studentName: "Mehakpreet Kaur",
        rollNo: "23BCS101",
        department: "CSE",
        batch: "2023-2027",
        section: "A",
        subject: "DBMS",
        present: 42,
        absent: 3,
        totalClasses: 45,
      },
      {
        _id: 2,
        studentName: "Aman Sharma",
        rollNo: "23BCS102",
        department: "CSE",
        batch: "2023-2027",
        section: "A",
        subject: "AI",
        present: 35,
        absent: 10,
        totalClasses: 45,
      },
      {
        _id: 3,
        studentName: "Simran Kaur",
        rollNo: "23BCS103",
        department: "CSE",
        batch: "2022-2026",
        section: "B",
        subject: "OS",
        present: 40,
        absent: 5,
        totalClasses: 45,
      },
    ]);
  }, []);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredStudents = students.filter((student) => {
    const searchMatch =
      student.studentName
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      student.rollNo
        .toLowerCase()
        .includes(filters.search.toLowerCase());

    return (
      searchMatch &&
      (filters.department === "" ||
        student.department === filters.department) &&
      (filters.batch === "" ||
        student.batch === filters.batch) &&
      (filters.section === "" ||
        student.section === filters.section) &&
      (filters.subject === "" ||
        student.subject === filters.subject)
    );
  });

  const totalStudents = filteredStudents.length;

  const avgAttendance =
    totalStudents > 0
      ? Math.round(
          filteredStudents.reduce(
            (sum, student) =>
              sum +
              (student.present / student.totalClasses) * 100,
            0
          ) / totalStudents
        )
      : 0;

  const lowAttendance = filteredStudents.filter(
    (student) =>
      (student.present / student.totalClasses) * 100 < 75
  ).length;

  const excellentStudents = filteredStudents.filter(
    (student) =>
      (student.present / student.totalClasses) * 100 >= 90
  ).length;

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#162b4a]">
            Student Reports
          </h1>

          <p className="text-gray-500 mt-2">
            View attendance records and student performance
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">

            <input
              type="text"
              name="search"
              placeholder="Search Name / Roll No"
              value={filters.search}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2"
            />

            <select
              name="department"
              value={filters.department}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="">Department</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="ME">ME</option>
            </select>

            <select
              name="batch"
              value={filters.batch}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="">Batch</option>
              <option value="2022-2026">2022-2026</option>
              <option value="2023-2027">2023-2027</option>
              <option value="2024-2028">2024-2028</option>
            </select>

            <select
              name="section"
              value={filters.section}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="">Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>

            <select
              name="subject"
              value={filters.subject}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="">Subject</option>
              <option value="DBMS">DBMS</option>
              <option value="OS">OS</option>
              <option value="AI">AI</option>
            </select>

            <button className="bg-[#1d4ed8] text-white rounded-lg flex items-center justify-center gap-2 px-4 py-2">
              <Search size={18} />
              Search
            </button>

          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">

          <div className="bg-white rounded-xl border p-4 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Total Students
              </p>
              <p className="text-2xl font-bold">
                {totalStudents}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border p-4 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Avg Attendance
              </p>
              <p className="text-2xl font-bold">
                {avgAttendance}%
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border p-4 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Low Attendance
              </p>
              <p className="text-2xl font-bold">
                {lowAttendance}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border p-4 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Award size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Excellent
              </p>
              <p className="text-2xl font-bold">
                {excellentStudents}
              </p>
            </div>
          </div>

        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-[#162b4a]">
              Student Attendance Records
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left">Student</th>
                  <th className="px-6 py-4 text-left">Roll No</th>
                  <th className="px-6 py-4 text-left">Department</th>
                  <th className="px-6 py-4 text-left">Batch</th>
                  <th className="px-6 py-4 text-left">Section</th>
                  <th className="px-6 py-4 text-left">Subject</th>
                  <th className="px-6 py-4 text-left">Attendance</th>
                  <th className="px-6 py-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => {
                  const attendance = Math.round(
                    (student.present /
                      student.totalClasses) *
                      100
                  );

                  return (
                    <tr
                      key={student._id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        {student.studentName}
                      </td>

                      <td className="px-6 py-4">
                        {student.rollNo}
                      </td>

                      <td className="px-6 py-4">
                        {student.department}
                      </td>

                      <td className="px-6 py-4">
                        {student.batch}
                      </td>

                      <td className="px-6 py-4">
                        {student.section}
                      </td>

                      <td className="px-6 py-4">
                        {student.subject}
                      </td>

                      <td className="px-6 py-4">
                        {attendance}%
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-medium ${
                            attendance >= 90
                              ? "bg-green-100 text-green-700"
                              : attendance >= 75
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {attendance >= 90
                            ? "Excellent"
                            : attendance >= 75
                            ? "Good"
                            : "Low"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>

          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentReports;