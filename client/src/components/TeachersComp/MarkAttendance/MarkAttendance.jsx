import React, { useState, useEffect } from 'react';
import AttendanceFilters from './AttendanceFilters';
import AttendanceStats from './AttendanceStats';
import AttendanceTable from './AttendanceTable';
import { Users, UsersIcon, Save, Ban } from 'lucide-react';
import toast from 'react-hot-toast';

const MarkAttendance = () => {
  const [filters, setFilters] = useState({
    assignment: '',
    lecture: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [stats, setStats] = useState({ total: 0, present: 0, absent: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch students when assignment changes
    const fetchStudents = async () => {
      if (!filters.assignment) {
        setStudents([]);
        setAttendanceData({});
        return;
      }

      try {
        const token = localStorage.getItem("token");
        let url = `${import.meta.env.VITE_API_URL}/teacher-assignments/${filters.assignment}/students`;
        
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (data.success) {
          const fetchedStudents = data.data;
          setStudents(fetchedStudents);
          
          // Initialize attendance
          const initialData = {};
          fetchedStudents.forEach((student) => {
            initialData[student._id] = 'present';
          });
          setAttendanceData(initialData);
        }
      } catch (err) {
        console.error("Failed to fetch students", err);
      }
    };
    
    fetchStudents();
  }, [filters.assignment]);

  useEffect(() => {
    let p = 0;
    let a = 0;
    Object.values(attendanceData).forEach(status => {
      if (status === 'present') p++;
      if (status === 'absent') a++;
    });
    setStats({ total: students.length, present: p, absent: a });
  }, [attendanceData, students]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const markAll = (status) => {
    const newData = {};
    students.forEach(s => {
      newData[s._id] = status;
    });
    setAttendanceData(newData);
  };

  const submitAttendance = async () => {
    if (!filters.assignment) {
      toast.error("Please select an assignment");
      return;
    }
    if (!filters.lecture) {
      toast.error("Please select a lecture");
      return;
    }
    if (!filters.date) {
      toast.error("Please select a date");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      // Create an array of promises for each student
      const promises = students.map(student => {
        const attendanceDateTime = new Date(filters.date);
        attendanceDateTime.setUTCHours(parseInt(filters.lecture), 0, 0, 0);

        const payload = {
          assignment: filters.assignment,
          student: student._id,
          attendanceDate: attendanceDateTime.toISOString(),
          status: attendanceData[student._id] || 'absent'
        };

        return fetch(`${import.meta.env.VITE_API_URL}/attendance`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
          },
          body: JSON.stringify(payload)
        });
      });

      const results = await Promise.allSettled(promises);
      
      let successCount = 0;
      let failCount = 0;

      results.forEach(result => {
        if (result.status === 'fulfilled' && result.value.ok) {
          successCount++;
        } else {
          failCount++;
        }
      });

      if (failCount > 0) {
        toast.error(`${successCount} attendance records saved. ${failCount} failed.`);
      } else {
        toast.success(`${successCount} attendance records saved successfully!`);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while saving attendance");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#162b4a] mb-2">Mark Attendance</h1>
          <p className="text-gray-500">Select an assignment and mark attendance</p>
        </div>

        <AttendanceFilters filters={filters} setFilters={setFilters} />
        
        <AttendanceStats 
          total={stats.total} 
          present={stats.present} 
          absent={stats.absent} 
        />
        
        <AttendanceTable 
          students={students}
          attendanceData={attendanceData}
          handleStatusChange={handleStatusChange}
        />

        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
          <button 
            onClick={() => markAll('present')}
            className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium border border-green-600 bg-green-600 text-white hover:bg-green-700 transition-colors"
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
          <button 
            onClick={submitAttendance}
            disabled={isSubmitting || students.length === 0}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-medium shadow-sm transition-colors ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed text-white" : "bg-[#1d4ed8] hover:bg-blue-800 text-white"
            }`}
          >
            <Save size={20} />
            {isSubmitting ? "Saving..." : "Submit Attendance"}
          </button>
        </div>
        
        <p className="text-center text-gray-400 text-sm pb-10">
          Attendance will be recorded for the selected assignment, lecture and date.
        </p>
      </div>
    </div>
  );
};

export default MarkAttendance;
