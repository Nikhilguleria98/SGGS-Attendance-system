import { Search } from "lucide-react";

export default function SearchFilterBar({ search, setSearch, department, setDepartment }) {
  const departments = ["All Departments","PGDCA", "MCA","BCA","B.TECH","M.TECH"];

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
}