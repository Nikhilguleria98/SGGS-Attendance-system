import React from "react";
import { Search } from "lucide-react";

const StudentSearchFilter = ({
  search,
  setSearch,
  department,
  setDepartment,
  departments,
}) => {
  return (
    <div className="flex items-center gap-4 mb-4 ml-6">
      {/* Search */}
      <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-white focus-within:border-brand-blue transition">
        <Search size={16} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm text-gray-700"
        />
      </div>

      {/* Department Filter */}
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white outline-none"
      >
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StudentSearchFilter;