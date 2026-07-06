import React, { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  AlertTriangle,
  FileText,
  Search,
  Download,
  Eye,
  FileSpreadsheet,
  Activity,
} from "lucide-react";

const StudentReportPage = () => {
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const [studentsRes, attendanceRes] = await Promise.all([
          fetch("http://localhost:3000/api/users?role=student", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch("http://localhost:3000/api/attendance", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        
        const studentsData = await studentsRes.json();
        const attendanceData = await attendanceRes.json();

        if (studentsData.success && attendanceData.success) {
          const allStudents = studentsData.data;
          const allAttendance = attendanceData.data;

          setAttendanceRecords(allAttendance);

          // Calculate student stats
          const studentStats = allStudents.map(student => {
            const studentRecords = allAttendance.filter(a => a.student && a.student._id === student._id);
            const total = studentRecords.length;
            const present = studentRecords.filter(a => a.status === 'present').length;
            
            let attendancePercentage = 0;
            if (total > 0) {
              attendancePercentage = Math.round((present / total) * 100);
            }
            
            let status = "Average";
            if (attendancePercentage >= 90) status = "Excellent";
            else if (attendancePercentage >= 75) status = "Good";
            else if (attendancePercentage < 60 && total > 0) status = "Warning";

            return {
              id: student._id,
              name: `${student.firstName} ${student.lastName || ''}`,
              rollNo: student.rollNo || '-',
              attendance: attendancePercentage,
              status: total === 0 ? "No Data" : status,
              totalRecords: total
            };
          });

          setStudents(studentStats);

          // Generate activities
          const recent = [...allAttendance]
            .sort((a, b) => new Date(b.createdAt || b.attendanceDate) - new Date(a.createdAt || a.attendanceDate))
            .slice(0, 5)
            .map(a => {
              const studentName = a.student ? `${a.student.firstName} ${a.student.lastName || ''}` : 'Unknown';
              const subjectName = a.subject ? a.subject.name : 'Unknown Subject';
              return {
                text: `Marked ${a.status} in ${subjectName}`,
                student: studentName,
                time: new Date(a.createdAt || a.attendanceDate).toLocaleDateString()
              };
            });
          setActivities(recent);
        }
      } catch (err) {
        console.error("Failed to fetch reports", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Compute overall stats
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.totalRecords > 0).length;
  const defaulters = students.filter(s => s.status === "Warning").length;

  const getStatusColor = (status) => {
    switch (status) {
      case "Excellent":
        return "bg-green-100 text-green-700";
      case "Good":
        return "bg-blue-100 text-blue-700";
      case "Average":
        return "bg-orange-100 text-orange-700";
      case "Warning":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-sm border p-8 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Student Reports
            </h1>
            <p className="text-slate-500 mt-2">
              Student Activity & Attendance Tracking
            </p>
          </div>

          <div className="mt-5 lg:mt-0 flex items-center gap-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search Student..."
                className="pl-10 pr-4 py-3 border rounded-xl outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <StatCard
          icon={<Users size={30} />}
          title="Total Students"
          value={totalStudents}
          bg="bg-blue-50"
          color="text-blue-600"
        />

        <StatCard
          icon={<UserCheck size={30} />}
          title="Active Students"
          value={activeStudents}
          bg="bg-green-50"
          color="text-green-600"
        />

        <StatCard
          icon={<AlertTriangle size={30} />}
          title="Defaulters (<60%)"
          value={defaulters}
          bg="bg-orange-50"
          color="text-orange-600"
        />

        <StatCard
          icon={<FileText size={30} />}
          title="Records"
          value={attendanceRecords.length}
          bg="bg-purple-50"
          color="text-purple-600"
        />
      </div>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* STUDENT REPORTS */}
        <div className="xl:col-span-2 bg-white rounded-3xl border shadow-sm p-6">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">Student Reports</h2>
            <button className="text-blue-600 font-semibold">
              View All
            </button>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {isLoading ? (
              <p className="text-gray-500">Loading data...</p>
            ) : students.map((student) => (
              <div
                key={student.id}
                className="flex justify-between items-center p-4 border rounded-2xl hover:bg-slate-50 transition"
              >
                <div>
                  <h3 className="font-semibold text-lg">{student.name}</h3>
                  <p className="text-slate-500">{student.rollNo}</p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-semibold">
                    {student.attendance}%
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      student.status
                    )}`}
                  >
                    {student.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="bg-white rounded-3xl border shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">
            Recent Activities
          </h2>

          <div className="space-y-5">
            {activities.length === 0 && !isLoading && (
              <p className="text-gray-500">No recent activity.</p>
            )}
            {activities.map((activity, index) => (
              <div
                key={index}
                className="border-l-4 border-blue-500 pl-4"
              >
                <h4 className="font-semibold">
                  {activity.student}
                </h4>

                <p className="text-slate-600 text-sm">
                  {activity.text}
                </p>

                <span className="text-xs text-slate-400">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, bg, color }) => (
  <div className="bg-white border rounded-3xl shadow-sm p-6 flex items-center gap-4">
    <div className={`p-4 rounded-2xl ${bg} ${color}`}>
      {icon}
    </div>

    <div>
      <p className="text-slate-500">{title}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  </div>
);

export default StudentReportPage;