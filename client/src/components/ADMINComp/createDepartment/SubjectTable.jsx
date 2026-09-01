import React, { useState, useMemo } from "react";
import { Edit2, Trash2, Search, X, Filter } from "lucide-react";

export default function SubjectTable({ subjects, onDelete, onEdit, departments, semesters }) {
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterSem, setFilterSem] = useState("");

  const filtered = useMemo(() => {
    if (!subjects) return [];
    const q = search.toLowerCase();
    return subjects.filter((s) => {
      const matchesSearch =
        (s.name && s.name.toLowerCase().includes(q)) ||
        (s.code && s.code.toLowerCase().includes(q));
      const matchesDept = !filterDept || (typeof s.department === "object" ? s.department?._id === filterDept : String(s.department) === filterDept);
      const matchesSem = !filterSem || (typeof s.semester === "object" ? s.semester?._id === filterSem : String(s.semester) === filterSem);
      return matchesSearch && matchesDept && matchesSem;
    });
  }, [subjects, search, filterDept, filterSem]);

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
      {/* Filters */}
      <div className="p-4 border-b border-gray-100 space-y-3">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or code..."
            className="w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b]/20 focus:border-[#00529b]"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b]/20 focus:border-[#00529b]"
            >
              <option value="">All Departments</option>
              {departments && departments.map((d) => (
                <option key={d._id} value={d._id}>{d.name}</option>
              ))}
            </select>
          </div>
          <select
            value={filterSem}
            onChange={(e) => setFilterSem(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b]/20 focus:border-[#00529b]"
          >
            <option value="">All Semesters</option>
            {semesters && semesters.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-gray-500 font-medium">No subjects match your filters.</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject Code</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Semester</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((subject) => (
                <tr key={subject._id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">{subject.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-md truncate">{subject.code || "N/A"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {typeof subject.semester === "object" ? subject.semester?.name : subject.semester ? `Semester ${subject.semester}` : "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {typeof subject.department === "object" ? subject.department?.name : "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      {onEdit && (
                        <button onClick={() => onEdit(subject)} className="text-gray-400 hover:text-[#00529b] transition-colors" title="Edit Subject">
                          <Edit2 size={18} />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(subject)} className="text-gray-400 hover:text-red-600 transition-colors" title="Delete Subject">
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
      )}
    </div>
  );
}
