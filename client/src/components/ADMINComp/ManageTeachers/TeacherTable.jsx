import TeacherRow from "./TeacherRow";

export default function TeacherTable({ teachers, departments, onEdit, onDelete }) {
  const columns = ["#", "Teacher Name", "Email", "Department", "Semesters", "Batches", "Groups", "Subjects", "Actions"];

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
          {teachers.length === 0 ? (
            <tr className="bg-brand-blue/5 border-b border-gray-100 text-xs uppercase text-brand-blue">
              <td colSpan={columns.length} className="text-center py-6 text-gray-400 text-sm">
                No teachers found
              </td>
            </tr>
          ) : (
            teachers.map((teacher, index) => (
              <TeacherRow
                key={teacher.id}
                teacher={teacher}
                departments={departments}
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
}