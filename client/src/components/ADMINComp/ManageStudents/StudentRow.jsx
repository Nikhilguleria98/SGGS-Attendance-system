import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const StudentRow = ({
  student,
  index,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 text-sm">
      <td className="py-4 px-4 font-semibold text-[#162b4a]">{index + 1}</td>

      <td className="py-4 px-4 font-bold text-[#162b4a]">
        {student.name}
      </td>

      <td className="py-4 px-4 text-gray-600">
        {student.rollNo}
      </td>

      <td className="py-4 px-4 text-gray-600">
        {student.department}
      </td>

      <td className="py-4 px-4">
        <select className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-700 bg-white outline-none focus:border-[#162b4a]">
          <option>{student.batch || '2024'}</option>
          <option>2023</option>
          <option>2025</option>
        </select>
      </td>

      <td className="py-4 px-4">
        <select className="border border-gray-200 rounded-lg px-2 py-1 text-sm text-gray-700 bg-white outline-none focus:border-[#162b4a]">
          <option>{student.group || 'A'}</option>
          <option>B</option>
          <option>C</option>
          <option>D</option>
        </select>
      </td>

      <td className="py-4 px-4 text-gray-600">
        {student.phone}
      </td>

      <td className="py-4 px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onEdit(student)}
            className="text-[#162b4a] hover:opacity-70"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(student)}
            className="text-[#c00021] hover:opacity-70"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default StudentRow;