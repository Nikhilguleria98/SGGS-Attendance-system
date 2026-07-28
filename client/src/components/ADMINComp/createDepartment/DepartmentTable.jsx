import React,{useState} from "react";
import { Edit2, Trash2 } from "lucide-react";
import DeleteConfirmationModal from "../Common/DeleteConfirmationModal";
export default function DepartmentTable({ departments, onEdit, onDelete }) {
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    department: null,
  });
  if (!departments || departments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-500 font-medium text-lg">No departments found.</p>
        <p className="text-gray-400 text-sm mt-1">Click 'Create Department' to add one.</p>
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
                Code
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Department Name
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {departments.map((dept) => (
              <tr
                key={dept._id}
                className="hover:bg-blue-50/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {dept.code}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-gray-900">
                    {dept.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 max-w-md truncate">
                    {dept.description || "N/A"}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(dept)}
                        className="text-gray-400 hover:text-[#00529b] transition-colors"
                        title="Edit Department"
                      >
                        <Edit2 size={18} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() =>
                          setDeleteModal({
                            open: true,
                            department: dept,
                          })
                        }
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete Department"
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
      <DeleteConfirmationModal
  isOpen={deleteModal.open}
  title="Delete Department"
  message={`Are you sure you want to delete "${deleteModal.department?.name}"? This action cannot be undone.`}
  onClose={() =>
    setDeleteModal({
      open: false,
      department: null,
    })
  }
  onConfirm={() => {
    onDelete(deleteModal.department);

    setDeleteModal({
      open: false,
      department: null,
    });
  }}
/>
    </div>
    
  );
}
