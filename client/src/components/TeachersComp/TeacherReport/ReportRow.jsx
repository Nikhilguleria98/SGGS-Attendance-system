import React from "react";

const ReportRow = ({ student }) => {
  return (
    <tr className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-5">{student.student}</td>
      <td className="px-6 py-5">{student.rollNumber}</td>
      <td className="px-6 py-5">{student.department}</td>
      <td className="px-6 py-5">{student.semester || "-"}</td>
      <td className="px-6 py-5">{student.batch}</td>
      <td className="px-6 py-5">{student.section}</td>
      <td className="px-6 py-5">{student.subject}</td>
      <td className="px-6 py-5">{student.percentage}%</td>
    </tr>
  );
};

export default ReportRow;