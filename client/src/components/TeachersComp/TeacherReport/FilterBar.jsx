import React, { useState, useEffect } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

const FilterBar = ({ filters, onChange, availableData = [] }) => {
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [batches, setBatches] = useState([]);
  const [groups, setGroups] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [allAssignments, setAllAssignments] = useState([]);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/teacher-assignments/my-assignments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        
        if (data.success) {
          setAllAssignments(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch teacher assignments", err);
      }
    };

    fetchFilterOptions();
  }, []);

  useEffect(() => {
    let validAssignments = allAssignments;

    if (filters.department) {
      validAssignments = validAssignments.filter(a => a.department && a.department._id === filters.department);
    }
    if (filters.semester) {
      validAssignments = validAssignments.filter(a => a.semester && a.semester._id === filters.semester);
    }

    const uniqueDepts = [];
    const uniqueSubs = [];
    const uniqueSems = [];
    const uniqueBatches = [];
    const uniqueSections = [];

    const deptSet = new Set();
    const subSet = new Set();
    const semSet = new Set();
    const batchSet = new Set();
    const secSet = new Set();

    // Departments and Semesters should always show all options to allow easy switching
    allAssignments.forEach(a => {
      if (a.department && !deptSet.has(a.department._id)) {
        deptSet.add(a.department._id);
        uniqueDepts.push(a.department);
      }
      if (a.semester && !semSet.has(a.semester._id)) {
        semSet.add(a.semester._id);
        uniqueSems.push(a.semester);
      }
    });

    // Subjects, Batches, and Sections cascade based on selected Department/Semester
    validAssignments.forEach(a => {
      if (a.subject && !subSet.has(a.subject._id)) {
        subSet.add(a.subject._id);
        uniqueSubs.push(a.subject);
      }
      if (a.batch && !batchSet.has(a.batch)) {
        batchSet.add(a.batch);
        uniqueBatches.push({ _id: a.batch, name: a.batch });
      }
      if (a.section && !secSet.has(a.section)) {
        secSet.add(a.section);
        uniqueSections.push({ _id: a.section, name: a.section });
      }
    });

    setDepartments(uniqueDepts);
    setSemesters(uniqueSems);
    setSubjects(uniqueSubs);
    setBatches(uniqueBatches);
    setGroups(uniqueSections);
  }, [allAssignments, filters.department, filters.semester]);

  const activeFilterCount = ["department", "batch", "section", "subject", "semester"].filter(
    (key) => filters[key]
  ).length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Search
          </label>
          <input
            type="text"
            name="search"
            placeholder="Search by name or roll no..."
            value={filters.search}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          />
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors sm:w-auto w-full"
        >
          <SlidersHorizontal size={16} />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#1d4ed8] text-white text-xs font-semibold">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown
            size={16}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-5 pt-5 border-t border-gray-100">
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
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Semester
            </label>
            <select
              name="semester"
              value={filters.semester || ""}
              onChange={onChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            >
              <option value="">All Semesters</option>
              {semesters.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
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
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;