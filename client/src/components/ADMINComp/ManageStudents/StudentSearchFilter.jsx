import React from "react";
import { Search } from "lucide-react";

const StudentSearchFilter = ({
  search,
  setSearch,
  department,
  setDepartment,
  departments,
  batch,
  setBatch,
  batches = [],
  group,
  setGroup,
  groups = [],
}) => {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 mx-6">
      {/* Search */}
      <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-white focus-within:border-[#162b4a] transition w-full sm:w-auto min-w-[250px]">
        <Search size={16} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm text-gray-700 bg-transparent"
        />
      </div>

      {/* Department Filter */}
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white outline-none focus:border-[#162b4a] w-full sm:w-auto min-w-[150px]"
      >
        <option value="">All Departments</option>
        {departments && departments.map((dept) => (
          <option key={dept._id} value={dept._id}>{dept.name}</option>
        ))}
      </select>

      {/* Batch Filter */}
      <select
        value={batch}
        onChange={(e) => setBatch(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white outline-none focus:border-[#162b4a] w-full sm:w-auto min-w-[150px]"
      >
        <option value="">All Batches</option>
        {batches.map((b) => (
          <option key={b._id} value={b.name}>{b.name}</option>
        ))}
      </select>

      {/* Group Filter */}
      <select
        value={group}
        onChange={(e) => setGroup(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white outline-none focus:border-[#162b4a] w-full sm:w-auto min-w-[150px]"
      >
        <option value="">All Groups</option>
        {groups.map((g) => (
          <option key={g._id} value={g.name}>{g.name}</option>
        ))}
      </select>
    </div>
  );
};

export default StudentSearchFilter;