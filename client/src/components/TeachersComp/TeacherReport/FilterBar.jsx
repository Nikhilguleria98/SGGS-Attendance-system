import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const FilterBar = ({ filters, onChange }) => {
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [batches, setBatches] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const token = localStorage.getItem("token");
      try {
        const [deptsRes, subsRes, batchesRes, groupsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/departments`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${import.meta.env.VITE_API_URL}/subjects`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${import.meta.env.VITE_API_URL}/batches`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${import.meta.env.VITE_API_URL}/groups`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const deptsData = await deptsRes.json();
        const subsData = await subsRes.json();

        if (deptsData.success) setDepartments(deptsData.data);
        if (subsData.success) setSubjects(subsData.data);

        if (batchesRes.ok) {
          const batchesData = await batchesRes.json();
          if (batchesData.success) setBatches(batchesData.data);
        }
        if (groupsRes.ok) {
          const groupsData = await groupsRes.json();
          if (groupsData.success) setGroups(groupsData.data);
        }
      } catch (err) {
        console.error("Failed to fetch filter options", err);
      }
    };

    fetchFilterOptions();
  }, []);

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
            {departments.map((dept) => (
              <option key={dept._id} value={dept.name}>
                {dept.name}
              </option>
            ))}
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
            {batches.map((b) => (
              <option key={b._id} value={b.name}>
                {b.name}
              </option>
            ))}
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
            {groups.map((g) => (
              <option key={g._id} value={g.name}>
                {g.name}
              </option>
            ))}
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
            {subjects.map((sub) => (
              <option key={sub._id} value={sub.name}>
                {sub.name}
              </option>
            ))}
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