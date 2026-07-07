import React from "react";

const ReportRow = ({ student }) => {
  const attendance = Math.round(
    (student.present / student.totalClasses) * 100
  );

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