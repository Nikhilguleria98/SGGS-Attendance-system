import React from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function TeacherRow({ teacher, index, onEdit, onDelete }) {
  // Mock subjects if none exist to match Figma visually
  const subjects = teacher.subjects || ["Java", "DBMS", "DSA"];
  
  const displaySubjects = subjects.slice(0, 3);
  const overflowCount = subjects.length - 3;

  const teacherName = teacher.firstName ? `${teacher.firstName} ${teacher.lastName || ""}` : teacher.name;
  const deptName = typeof teacher.department === 'object' ? teacher.department?.name : teacher.department;

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 text-sm">
      <td className="py-4 px-4 font-semibold text-[#162b4a]">{index + 1}</td>
      <td className="py-4 px-4 font-bold text-[#162b4a]">{teacherName}</td>
      <td className="py-4 px-4 text-gray-600">{teacher.email}</td>
      <td className="py-4 px-4 text-gray-600">{deptName}</td>
      <td className="py-4 px-4 text-gray-600">
        {teacher.batches?.join(", ") || teacher.batch}
      </td>
      <td className="py-4 px-4 text-gray-600">
        {teacher.groups?.join(", ") || "-"}
      </td>

      <td className="py-4 px-4">
        <div className="flex flex-wrap gap-1">
          {displaySubjects.map((sub, idx) => (
            <span key={idx} className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
              {sub}
            </span>
          ))}
          {overflowCount > 0 && (
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
              +{overflowCount}
            </span>
          )}
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onEdit(teacher)} 
            className="flex items-center gap-1 border border-blue-200 text-blue-600 rounded-full px-3 py-1 hover:bg-blue-50 transition-colors"
          >
            <Pencil size={14} />
            <span className="text-xs font-medium">Edit</span>
          </button>
          <button 
            onClick={() => onDelete(teacher)} 
            className="flex items-center gap-1 border border-red-200 text-red-500 rounded-full px-3 py-1 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={14} />
            <span className="text-xs font-medium">Delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
}