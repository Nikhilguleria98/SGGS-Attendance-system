import {Pencil , Trash2 } from "lucide-react";
export default function TeacherRow({ teacher, index, onEdit, onDelete }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 text-sm">
      <td className="py-3 px-4 text-brand-blue">{index + 1}</td>
      <td className="py-3 px-4 text-brand-blue font-medium">{teacher.name}</td>
      <td className="py-3 px-4 text-brand-blue">{teacher.email}</td>
      <td className="py-3 px-4 text-brand-blue">{teacher.department}</td>
      <td className="py-3 px-4 text-brand-blue">{teacher.phone}</td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <button onClick={() => onEdit(teacher)} className="text-brand-blue hover:opacity-70">
            <Pencil size={16} />
          </button>
          <button onClick={() => onDelete(teacher)} className="text-brand-red hover:opacity-70">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}