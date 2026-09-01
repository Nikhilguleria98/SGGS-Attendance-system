import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const AttendanceFilters = ({ filters, setFilters }) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/teacher-assignments/my`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();

        if (data.success) {
          setAssignments(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch teacher assignments", err);
      }
    };
    fetchAssignments();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };

    if (["department", "semester", "batch", "section", "subject"].includes(name)) {
      const matchingAssignments = assignments.filter(a => 
        (!newFilters.department || a.department?._id === newFilters.department) &&
        (!newFilters.semester || a.semester?._id === newFilters.semester) &&
        (!newFilters.batch || a.batch === newFilters.batch) &&
        (!newFilters.section || a.section === newFilters.section) &&
        (!newFilters.subject || a.subject?._id === newFilters.subject)
      );

      if (matchingAssignments.length === 1 && 
          newFilters.department && newFilters.semester && newFilters.batch && newFilters.section && newFilters.subject) {
        newFilters.assignment = matchingAssignments[0]._id;
      } else {
        newFilters.assignment = "";
      }
    }

    setFilters(newFilters);
  };

  const getUniqueOptions = (key, nameKey) => {
    const map = new Map();
    assignments.forEach(a => {
       if (nameKey) {
          if (a[key] && a[key]._id) {
             const label = a[key][nameKey] || a[key].name || (a[key].number ? `Semester ${a[key].number}` : "");
             map.set(a[key]._id, label);
          }
       } else {
          if (a[key]) map.set(a[key], a[key]);
       }
    });
    return Array.from(map.entries()).map(([value, label]) => ({ value, label }));
  };

  const departments = getUniqueOptions("department", "name");
  const semesters = getUniqueOptions("semester", "name");
  const batches = getUniqueOptions("batch");
  const sections = getUniqueOptions("section");
  const subjects = getUniqueOptions("subject", "name");

  const getLectureOptions = () => {
    if (!filters.date) return [];
    const date = new Date(filters.date);
    const month = date.getMonth() + 1;
    const isSummer = month >= 4 && month <= 9;
    const startHour = 9;
    const endHour = isSummer ? 17 : 16;
    const options = [];
    
    for (let hour = startHour; hour < endHour; hour++) {
      const startStr = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
      const endStr = `${hour + 1 > 12 ? hour + 1 - 12 : hour + 1}:00 ${hour + 1 >= 12 ? 'PM' : 'AM'}`;
      options.push({ label: `${startStr} - ${endStr}`, value: hour });
    }
    return options;
  };

  const lectureOptions = getLectureOptions();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        
        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select 
            name="department" 
            value={filters.department || ""} 
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700"
          >
            <option value="">Select Department</option>
            {departments.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
          </select>
        </div>

        {/* Semester */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
          <select 
            name="semester" 
            value={filters.semester || ""} 
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700"
          >
            <option value="">Select Semester</option>
            {semesters.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {/* Batch */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
          <select 
            name="batch" 
            value={filters.batch || ""} 
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700"
          >
            <option value="">Select Batch</option>
            {batches.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>
        </div>

        {/* Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
          <select 
            name="section" 
            value={filters.section || ""} 
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700"
          >
            <option value="">Select Section</option>
            {sections.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <select 
            name="subject" 
            value={filters.subject || ""} 
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700"
          >
            <option value="">Select Subject</option>
            {subjects.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input 
            type="date" 
            name="date"
            value={filters.date || ""}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700" 
          />
        </div>
        
        {/* Lecture */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lecture</label>
          <select 
            name="lecture" 
            value={filters.lecture || ""} 
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700"
          >
            <option value="">Select Lecture</option>
            {lectureOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

      </div>
      
      {!filters.assignment && (
        <p className="text-sm text-amber-600 font-medium">
          Please select all fields (Department, Semester, Batch, Section, Subject) to identify the class.
        </p>
      )}
    </div>
  );
};

export default AttendanceFilters;
