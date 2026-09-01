import React, { useState, useMemo } from "react";
import { Edit2, Trash2, Search, X, Filter } from "lucide-react";

export default function SemesterTable({ semesters, onDelete, onEdit }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = useMemo(() => {
    if (!semesters) return [];
    const q = search.toLowerCase();
    return semesters.filter((s) => {
      const matchesSearch =
        (s.name && s.name.toLowerCase().includes(q)) ||
        (s.number && String(s.number).includes(q));
      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "active" && s.isActive) ||
        (filterStatus === "inactive" && !s.isActive);
      return matchesSearch && matchesStatus;
    });
  }, [semesters, search, filterStatus]);

  if (!semesters || semesters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-500 font-medium text-lg">No semesters found.</p>
        <p className="text-gray-400 text-sm mt-1">Click 'Create Semester' to add one.</p>
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
            placeholder="Search by name or number..."
            className="w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b]/20 focus:border-[#00529b]"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b]/20 focus:border-[#00529b]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-gray-500 font-medium">No semesters match your filters.</p>
          <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Number</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((semester) => (
                <tr key={semester._id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-8 h-8 rounded-full bg-[#00529b]/10 text-[#00529b] flex items-center justify-center text-sm font-bold">
                      {semester.number}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">{semester.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      semester.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {semester.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      {onEdit && (
                        <button onClick={() => onEdit(semester)} className="text-gray-400 hover:text-[#00529b] transition-colors" title="Edit Semester">
                          <Edit2 size={18} />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(semester)} className="text-gray-400 hover:text-red-600 transition-colors" title="Delete Semester">
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
