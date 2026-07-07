import React from "react";
import { Edit2, Trash2 } from "lucide-react";

export default function SubjectTable({ subjects, onDelete, onEdit }) {
  if (!subjects || subjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-500 font-medium text-lg">No subjects found.</p>
        <p className="text-gray-400 text-sm mt-1">Click 'Create Subject' to add one.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Subject Name
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Subject Code
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subjects.map((subject) => (
              <tr 
                key={subject._id}
                className="hover:bg-blue-50/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-gray-900">
                    {subject.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 max-w-md truncate">
                    {subject.code || "N/A"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {typeof subject.department === 'object' ? subject.department?.name : "N/A"}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(subject)}
                        className="text-gray-400 hover:text-[#00529b] transition-colors"
                        title="Edit Subject"
                      >
                        <Edit2 size={18} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                         onClick={() => onDelete(subject)}
                         className="text-gray-400 hover:text-red-600 transition-colors"
                         title="Delete Subject"
                      >
                         <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
