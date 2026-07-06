import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const StudentRow = ({ student, index, onEdit, onDelete }) => {
  const studentName = student.firstName ? `${student.firstName} ${student.lastName || ""}` : student.name;
  const deptName = typeof student.department === "object" ? student.department?.name : student.department;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 text-sm">
      <td className="py-4 px-4 font-semibold text-[#162b4a]">{index + 1}</td>
      <td className="py-4 px-4 font-bold text-[#162b4a]">{studentName}</td>
      <td className="py-4 px-4 text-gray-600">{student.rollNo || student.rollNumber || "-"}</td>
      <td className="py-4 px-4 text-gray-600">{deptName}</td>
      <td className="py-4 px-4 text-gray-600">{student.batch || student.batches?.[0] || "-"}</td>
      <td className="py-4 px-4 text-gray-600">{student.group || student.section || student.groups?.[0] || "-"}</td>

      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(student)}
            className="flex items-center gap-1 border border-blue-200 text-blue-600 rounded-full px-3 py-1 hover:bg-blue-50 transition-colors"
            title="Edit"
          >
            <Pencil size={14} />
            <span className="text-xs font-medium">Edit</span>
          </button>

          <button
            onClick={() => onDelete(student)}
            className="flex items-center gap-1 border border-red-200 text-red-500 rounded-full px-3 py-1 hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <Trash2 size={14} />
            <span className="text-xs font-medium">Delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StudentRow;