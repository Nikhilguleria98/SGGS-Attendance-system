import React, { useState, useEffect } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

const FilterBar = ({ filters, setFilters, onChange, availableData = [] }) => {
  const [departments, setDepartments] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [batches, setBatches] = useState([]);
  const [groups, setGroups] = useState([]);
  const [subjects, setSubjects] = useState([]);
  
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const fetchMasterData = async () => {
      setIsLoading(true);
      setError(null);
      setFieldErrors({});
      const token = localStorage.getItem("token");
      
      const fetchAPI = async (endpoint) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
           throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return data.success && Array.isArray(data.data) ? data.data : [];
      };

      try {
        const results = await Promise.allSettled([
          fetchAPI("/departments"),
          fetchAPI("/semesters"),
          fetchAPI("/batches"),
          fetchAPI("/groups"),
          fetchAPI("/subjects"),
        ]);
        
        const newFieldErrors = {};

        const extractData = (result, fieldName) => {
           if (result.status === "fulfilled") {
              return result.value;
           } else {
              newFieldErrors[fieldName] = true;
              return [];
           }
        };
        
        setDepartments(extractData(results[0], "department"));
        setSemesters(extractData(results[1], "semester"));
        setBatches(extractData(results[2], "batch"));
        setGroups(extractData(results[3], "section"));
        setSubjects(extractData(results[4], "subject"));

        setFieldErrors(newFieldErrors);

        // If all requests failed, consider it a full failure
        if (results.every(r => r.status === "rejected")) {
            setError("Unable to load any report filters. Please check your connection.");
        }
      } catch (err) {
        console.error("Failed to fetch filter master data", err);
        setError("Network error occurred while fetching filters.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMasterData();
  }, []);

  // Cascade Subjects
  const availableSubjects = subjects.filter(sub => {
    let matchDept = true;
    let matchSem = true;
    
    if (filters.department) {
       const subDeptId = typeof sub.department === "object" && sub.department !== null ? sub.department._id : sub.department;
       matchDept = subDeptId === filters.department;
    }
    if (filters.semester) {
       const subSemId = typeof sub.semester === "object" && sub.semester !== null ? sub.semester._id : sub.semester;
       matchSem = subSemId === filters.semester;
    }
    
    return matchDept && matchSem;
  });

  // Reset invalid subject filter
  useEffect(() => {
    if (filters.subject && !availableSubjects.some(sub => sub._id === filters.subject)) {
      setFilters(prev => ({ ...prev, subject: "" }));
    }
  }, [filters.department, filters.semester, availableSubjects, filters.subject, setFilters]);

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
          {error && (
            <div className="col-span-1 sm:col-span-2 lg:col-span-5 text-sm text-red-500 mb-2">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Department
            </label>
            <select
              name="department"
              value={filters.department}
              onChange={onChange}
              disabled={isLoading || !!error || fieldErrors.department}
              className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:bg-gray-50 disabled:text-gray-400 ${fieldErrors.department ? 'border-red-300 text-red-500' : 'border-gray-300 text-gray-600'}`}
            >
              <option value="">
                {isLoading ? "Loading..." : fieldErrors.department ? "Failed to load" : "Select Department"}
              </option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id} className="text-gray-800">
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
              disabled={isLoading || !!error || fieldErrors.semester}
              className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:bg-gray-50 disabled:text-gray-400 ${fieldErrors.semester ? 'border-red-300 text-red-500' : 'border-gray-300 text-gray-600'}`}
            >
              <option value="">
                {isLoading ? "Loading..." : fieldErrors.semester ? "Failed to load" : "All Semesters"}
              </option>
              {semesters.map((s) => (
                <option key={s._id} value={s._id} className="text-gray-800">
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
              disabled={isLoading || !!error || fieldErrors.batch}
              className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:bg-gray-50 disabled:text-gray-400 ${fieldErrors.batch ? 'border-red-300 text-red-500' : 'border-gray-300 text-gray-600'}`}
            >
              <option value="">
                {isLoading ? "Loading..." : fieldErrors.batch ? "Failed to load" : "Select Batch"}
              </option>
              {batches.map((b) => (
                <option key={b._id} value={b.name} className="text-gray-800">
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
              disabled={isLoading || !!error || fieldErrors.section}
              className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:bg-gray-50 disabled:text-gray-400 ${fieldErrors.section ? 'border-red-300 text-red-500' : 'border-gray-300 text-gray-600'}`}
            >
              <option value="">
                {isLoading ? "Loading..." : fieldErrors.section ? "Failed to load" : "Select Section"}
              </option>
              {groups.map((g) => (
                <option key={g._id} value={g.name} className="text-gray-800">
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
              disabled={isLoading || !!error || fieldErrors.subject}
              className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:bg-gray-50 disabled:text-gray-400 ${fieldErrors.subject ? 'border-red-300 text-red-500' : 'border-gray-300 text-gray-600'}`}
            >
              <option value="">
                {isLoading ? "Loading..." : fieldErrors.subject ? "Failed to load" : "Select Subject"}
              </option>
              {availableSubjects.map((sub) => (
                <option key={sub._id} value={sub._id} className="text-gray-800">
                  {sub.name} {sub.code ? `(${sub.code})` : ""}
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