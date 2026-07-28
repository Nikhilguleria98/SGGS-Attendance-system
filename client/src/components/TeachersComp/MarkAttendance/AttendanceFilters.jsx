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

  const handleAssignmentChange = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) {
      setFilters({ ...filters, assignment: "" });
      return;
    }

    const assignment = assignments.find(a => a._id === selectedId);
    if (assignment) {
      setFilters({
        ...filters,
        assignment: assignment._id
      });
    }
  };

  const handleDateLectureChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const getLectureOptions = () => {
    if (!filters.date) return [];
    const date = new Date(filters.date);
    const month = date.getMonth() + 1;
    // Summer: April (4) to September (9)
    const isSummer = month >= 4 && month <= 9;
    const startHour = 9;
    const endHour = isSummer ? 17 : 16; // 5 PM vs 4 PM
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assignment</label>
          <select 
            name="assignment" 
            value={filters.assignment || ""} 
            onChange={handleAssignmentChange}
            className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700"
          >
            <option value="">Select Assignment</option>
            {assignments.map(a => {
              const semLabel = a.semester?.name 
                ? a.semester.name 
                : a.semester?.number 
                  ? `Semester ${a.semester.number}`
                  : `Semester ${a.semester}`;

              return (
                <option key={a._id} value={a._id}>
                  {a.department?.name} • {a.subject?.name || "Subject"} • {semLabel} • Sec {a.section}
                </option>
              );
            })}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <div className="relative">
            <input 
              type="date" 
              name="date"
              value={filters.date || ""}
              onChange={handleDateLectureChange}
              className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700" 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lecture</label>
          <select 
            name="lecture" 
            value={filters.lecture || ""} 
            onChange={handleDateLectureChange}
            className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700"
          >
            <option value="">Select Lecture</option>
            {lectureOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AttendanceFilters;
