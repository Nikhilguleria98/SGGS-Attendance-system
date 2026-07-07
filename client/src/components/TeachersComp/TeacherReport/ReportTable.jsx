import React from "react";
import ReportRow from "./ReportRow";

const ReportTable = ({ students }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-[#162b4a]">
          Student Attendance Records
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Student</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Roll No</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Department</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Batch</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Section</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Subject</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Attendance</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <ReportRow key={student._id} student={student} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;