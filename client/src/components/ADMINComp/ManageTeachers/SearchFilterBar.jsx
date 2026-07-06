import { Search } from "lucide-react";

export default function SearchFilterBar({ search, setSearch, department, setDepartment, departments = [] }) {

  return (
    <div className="flex items-center gap-4 mb-4 ml-6">
      <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-white focus-within:border-brand-blue transition">
        <Search size={16} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search teacher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm text-gray-700"
        />
      </div>

       {/* Batch Filter */}
      <select
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white outline-none focus:border-[#162b4a] w-full sm:w-auto min-w-[150px]"
      >
        <option value="">All Batches</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>

      {/* Group Filter */}
      <select
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white outline-none focus:border-[#162b4a] w-full sm:w-auto min-w-[150px]"
      >
        <option value="">All Groups</option>
        <option value="A">Group A</option>
        <option value="B">Group B</option>
      </select>

      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white outline-none"
      >
        <option value="">All Departments</option>
        {departments.map((dept) => (
          <option key={dept._id} value={dept._id}>
            {dept.name}
          </option>
        ))}
      </select>
    </div>
  );
}