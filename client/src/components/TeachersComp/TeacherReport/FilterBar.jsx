import React from "react";
import { Search } from "lucide-react";

const FilterBar = ({ filters, onChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Department
          </label>
          <select
            name="department"
            value={filters.department}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          >
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Batch
          </label>
          <select
            name="batch"
            value={filters.batch}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          >
            <option value="">Select Batch</option>
            <option value="2022-2026">2022-2026</option>
            <option value="2023-2027">2023-2027</option>
            <option value="2024-2028">2024-2028</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Section
          </label>
          <select
            name="section"
            value={filters.section}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          >
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Subject
          </label>
          <select
            name="subject"
            value={filters.subject}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          >
            <option value="">Select Subject</option>
            <option value="DBMS">DBMS</option>
            <option value="OS">OS</option>
            <option value="AI">AI</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Search
          </label>
          <input
            type="text"
            name="search"
            placeholder="Name / Roll No"
            value={filters.search}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          />
        </div>

        <div className="flex items-end">
          <button className="w-full bg-[#1d4ed8] hover:bg-blue-700 transition-colors text-white rounded-lg flex items-center justify-center gap-2 px-4 py-2.5 font-medium text-sm">
            <Search size={18} />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;