import React from "react";
import StudentRow from "./StudentRow";

const StudentTable = ({
  columns = [],
  students = [],
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500">
            {columns.map((col) => (
              <th key={col} className="py-3 px-4 font-semibold">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-6 text-center text-sm text-gray-400"
              >
                No students found
              </td>
            </tr>
          ) : (
            students.map((student, index) => (
              <StudentRow
                key={student.id}
                student={student}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;