import React from "react";

const ReportRow = ({ student }) => {
  const attendance = Math.round(
    (student.present / student.totalClasses) * 100
  );

  const status =
    attendance >= 90 ? "Excellent" : attendance >= 75 ? "Good" : "Low";

  const badgeClass =
    attendance >= 90
      ? "bg-green-50 text-green-700 border border-green-200"
      : attendance >= 75
      ? "bg-blue-50 text-blue-700 border border-blue-200"
      : "bg-red-50 text-red-700 border border-red-200";

  return (
    <tr className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-5">{student.studentName}</td>
      <td className="px-6 py-5">{student.rollNo}</td>
      <td className="px-6 py-5">{student.department}</td>
      <td className="px-6 py-5">{student.batch}</td>
      <td className="px-6 py-5">{student.section}</td>
      <td className="px-6 py-5">{student.subject}</td>
      <td className="px-6 py-5">{attendance}%</td>
    </tr>
  );
};

export default ReportRow;