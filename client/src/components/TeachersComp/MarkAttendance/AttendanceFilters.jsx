import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const AttendanceFilters = ({ filters, setFilters }) => {
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const [deptsRes, subsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/departments`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${import.meta.env.VITE_API_URL}/subjects`, { headers: { Authorization: `Bearer ${token}` } })
        ]);
        const deptsData = await deptsRes.json();
        const subsData = await subsRes.json();

        if (deptsData.success) setDepartments(deptsData.data);
        if (subsData.success) setSubjects(subsData.data);
      } catch (err) {
        console.error("Failed to fetch filters data", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select 
            name="department" 
            value={filters.department} 
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700"
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept._id} value={dept._id}>{dept.name}</option>
            ))}
          </select>
        </div>
       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
          <select 
            name="section" 
            value={filters.section} 
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700"
          >
            <option value="">Select Section</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <select 
            name="subject" 
            value={filters.subject} 
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700"
          >
            <option value="">Select Subject</option>
            {subjects.map(sub => (
              <option key={sub._id} value={sub._id}>{sub.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <div className="relative">
            <input 
              type="date" 
              name="date"
              value={filters.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceFilters;
