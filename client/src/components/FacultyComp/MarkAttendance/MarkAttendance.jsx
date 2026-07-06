import React, { useState, useEffect } from 'react';
import AttendanceFilters from './AttendanceFilters';
import AttendanceStats from './AttendanceStats';
import AttendanceTable from './AttendanceTable';
import { Users, UsersIcon, Save, Ban } from 'lucide-react';

// Mock data
const mockStudents = [
  { id: 1, name: 'Raushan Kumar', rollNo: '2310991001' },
  { id: 2, name: 'Aman Sharma', rollNo: '2310991002' },
  { id: 3, name: 'Priya Singh', rollNo: '2310991003' },
  { id: 4, name: 'Vikas Gupta', rollNo: '2310991004' },
  { id: 5, name: 'Anjali Verma', rollNo: '2310991005' },
  { id: 6, name: 'Rohit Kumar', rollNo: '2310991006' },
  { id: 7, name: 'Neha Kumari', rollNo: '2310991007' },
  { id: 8, name: 'Sahil Jain', rollNo: '2310991008' },
];

const MarkAttendance = () => {
  const [attendanceData, setAttendanceData] = useState({});
  const [stats, setStats] = useState({ total: 25, present: 18, absent: 7 });

  // Initialize with some default values to match screenshot roughly
  useEffect(() => {
    const initialData = {};
    mockStudents.forEach((student, index) => {
      // Just making a few absent by default to match screenshot look
      if (index === 2 || index === 5) {
        initialData[student.id] = 'absent';
      } else {
        initialData[student.id] = 'present';
      }
    });
    setAttendanceData(initialData);
  }, []);

  useEffect(() => {
    // Calculate stats dynamically based on actual data
    let p = 0;
    let a = 0;
    Object.values(attendanceData).forEach(status => {
      if (status === 'present') p++;
      if (status === 'absent') a++;
    });
    setStats({ total: mockStudents.length, present: p, absent: a });
  }, [attendanceData]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const markAll = (status) => {
    const newData = {};
    mockStudents.forEach(s => {
      newData[s.id] = status;
    });
    setAttendanceData(newData);
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#162b4a] mb-2">Mark Attendance</h1>
          <p className="text-gray-500">Select course details and mark attendance</p>
        </div>

        <AttendanceFilters />
        
        <AttendanceStats 
          total={stats.total} 
          present={stats.present} 
          absent={stats.absent} 
        />
        
        <AttendanceTable 
          students={mockStudents}
          attendanceData={attendanceData}
          handleStatusChange={handleStatusChange}
        />

        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
          <button 
            onClick={() => markAll('present')}
            className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium border border-green-300 text-green-700 hover:bg-green-50 transition-colors"
          >
            <Users size={18} />
            Mark All Present
          </button>
          <button 
            onClick={() => markAll('none')}
            className="flex items-center gap-2 px-12 py-2 rounded-lg font-medium border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors"
          >
            <Ban size={18} />
            No Class
          </button>
          <button 
            onClick={() => markAll('absent')}
            className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium border border-[#c00021] text-[#c00021] hover:bg-red-50 transition-colors"
          >
            <UsersIcon size={18} />
            Mark All Absent
          </button>
        </div>

        <div className="flex justify-center mb-10">
          <button className="flex items-center gap-2 bg-[#1d4ed8] hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm">
            <Save size={20} />
            Submit Attendance
          </button>
        </div>
        
        <p className="text-center text-gray-400 text-sm pb-10">
          Attendance will be saved for the selected course, group, section and date.
        </p>
      </div>
    </div>
  );
};

export default MarkAttendance;
