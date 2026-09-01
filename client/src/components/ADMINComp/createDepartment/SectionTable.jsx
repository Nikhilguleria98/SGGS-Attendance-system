import React, { useState, useMemo } from "react";
import { Edit2, Trash2, Search, X } from "lucide-react";

export default function GroupTable({ groups, onDelete, onEdit }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!groups) return [];
    const q = search.toLowerCase();
    return groups.filter(
      (g) =>
        (g.name && g.name.toLowerCase().includes(q)) ||
        (g.description && g.description.toLowerCase().includes(q))
    );
  }, [groups, search]);

  if (!groups || groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-500 font-medium text-lg">No sections found.</p>
        <p className="text-gray-400 text-sm mt-1">Click 'Create Section' to add one.</p>
        <p className="text-gray-500 font-medium text-lg">No sections found.</p>
        <p className="text-gray-400 text-sm mt-1">Click 'Create Section' to add one.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or description..."
            className="w-full pl-10 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00529b]/20 focus:border-[#00529b]"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-gray-500 font-medium">No groups match your search.</p>
          <p className="text-gray-400 text-sm mt-1">Try a different keyword.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Section Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((group) => (
                <tr key={group._id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">{group.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-md truncate">{group.description || "N/A"}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      {onEdit && (
                        <button onClick={() => onEdit(group)} className="text-gray-400 hover:text-[#00529b] transition-colors" title="Edit Group">
                          <Edit2 size={18} />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(group)} className="text-gray-400 hover:text-red-600 transition-colors" title="Delete Group">
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
