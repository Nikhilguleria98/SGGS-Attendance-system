import React from "react";
import { Pencil, Trash2 } from "lucide-react";

// Safe extraction helper to prevent [object Object] renders
const extractNames = (val) => {
  if (!val) return [];
  if (!Array.isArray(val)) val = [val];
  return val.map(v => (typeof v === 'object' && v !== null) ? (v.name || v.title || v.subject || String(v)) : String(v));
};

export default function TeacherRow({ teacher, departments, index, onEdit, onDelete }) {
  const subjects = extractNames(teacher.subjects);
  const displaySubjects = subjects.slice(0, 3);
  const overflowCount = subjects.length - 3;

  const teacherName = teacher.firstName ? `${teacher.firstName} ${teacher.lastName || ""}` : teacher.name;
  
  const deptName = teacher.departments?.length > 0
    ? teacher.departments.map(id => {
        const d = departments?.find(dep => dep._id === id);
        return d ? d.name : (typeof id === 'object' ? id.name : id);
      }).join(", ")
    : (typeof teacher.department === 'object' ? teacher.department?.name : teacher.department);

  const batches = extractNames(teacher.batches || teacher.batch);
  const groups = extractNames(teacher.groups || teacher.group);

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 text-sm">
      <td className="py-4 px-4 font-semibold text-[#162b4a]">{index + 1}</td>
      <td className="py-4 px-4 font-bold text-[#162b4a]">{teacherName}</td>
      <td className="py-4 px-4 text-gray-600">{teacher.email}</td>
      <td className="py-4 px-4 text-gray-600">{deptName || "-"}</td>
      <td className="py-4 px-4 text-gray-600">
        {batches.length > 0 ? batches.join(", ") : "-"}
      </td>
      <td className="py-4 px-4 text-gray-600">
        {groups.length > 0 ? groups.join(", ") : "-"}
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
          {displaySubjects.length === 0 && <span className="text-gray-400">-</span>}
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