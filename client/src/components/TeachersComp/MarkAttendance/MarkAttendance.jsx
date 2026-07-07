import React, { useState, useEffect } from 'react';
import AttendanceFilters from './AttendanceFilters';
import AttendanceStats from './AttendanceStats';
import AttendanceTable from './AttendanceTable';
import { Users, UsersIcon, Save, Ban } from 'lucide-react';
import toast from 'react-hot-toast';

const MarkAttendance = () => {
  const [filters, setFilters] = useState({
    department: '',
    batch: '',
    group: '',
    subject: '',
    lecture: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [stats, setStats] = useState({ total: 0, present: 0, absent: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teacherId, setTeacherId] = useState(null);

  useEffect(() => {
    // Decode teacher ID from JWT
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setTeacherId(payload.id); // Check if your JWT payload uses .id or ._id
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
  }, []);

  useEffect(() => {
    // Fetch students when department changes (or load all and filter)
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        let url = `${import.meta.env.VITE_API_URL}/users?role=student`;
        
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (data.success) {
          // Client side filtering for department/section if needed
          let filtered = data.data;
          if (filters.department) {
            filtered = filtered.filter(s => {
              const deptId = typeof s.department === "object" ? s.department?._id : s.department;
              return deptId === filters.department;
            });
          }
          if (filters.batch) {
            filtered = filtered.filter(s => {
              const batchNameOrId = s.batch || s.batches?.[0]; // or if batch is saved as ID, we can compare directly
              return batchNameOrId === filters.batch;
            });
          }
          if (filters.group) {
            filtered = filtered.filter(s => {
              const groupNameOrId = s.group || s.groups?.[0] || s.section;
              return groupNameOrId === filters.group;
            });
          }
          setStudents(filtered);
          
          // Initialize attendance
          const initialData = {};
          filtered.forEach((student) => {
            initialData[student._id] = 'present';
          });
          setAttendanceData(initialData);
        }
      } catch (err) {
        console.error("Failed to fetch students", err);
      }
    };
    
    fetchStudents();
  }, [filters.department, filters.batch, filters.group]);

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
    if (!filters.subject) {
      toast.error("Please select a subject");
      return;
    }
    if (!filters.lecture) {
      toast.error("Please select a lecture");
      return;
    }
    if (!teacherId) {
      toast.error("Teacher ID not found. Please re-login.");
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
          student: student._id,
          teacher: teacherId,
          subject: filters.subject,
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

      await Promise.all(promises);
      toast.success("Attendance saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save attendance");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#162b4a] mb-2">Mark Attendance</h1>
          <p className="text-gray-500">Select course details and mark attendance</p>
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
          Attendance will be saved for the selected course, group, section and date.
        </p>
      </div>
    </div>
  );
};

export default MarkAttendance;
