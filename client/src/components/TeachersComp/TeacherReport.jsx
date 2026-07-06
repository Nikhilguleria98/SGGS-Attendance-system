import React from "react";
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
  const students = [
    {
      id: 1,
      name: "Aman Sharma",
      rollNo: "CSE22045",
      attendance: 92,
      status: "Excellent",
    },
    {
      id: 2,
      name: "Priya Singh",
      rollNo: "CSE22051",
      attendance: 88,
      status: "Good",
    },
    {
      id: 3,
      name: "Rohit Kumar",
      rollNo: "CSE22033",
      attendance: 65,
      status: "Warning",
    },
    {
      id: 4,
      name: "Neha Gupta",
      rollNo: "CSE22060",
      attendance: 95,
      status: "Excellent",
    },
    {
      id: 5,
      name: "Arjun Verma",
      rollNo: "CSE22025",
      attendance: 72,
      status: "Average",
    },
  ];

  const activities = [
    {
      text: "Marked Present in DBMS",
      student: "Aman Sharma",
      time: "10 min ago",
    },
    {
      text: "Submitted Assignment",
      student: "Priya Singh",
      time: "1 hour ago",
    },
    {
      text: "Absent in Operating Systems",
      student: "Rohit Kumar",
      time: "2 hours ago",
    },
    {
      text: "Attended Lab Session",
      student: "Neha Gupta",
      time: "Today",
    },
    {
      text: "Downloaded Attendance Report",
      student: "Arjun Verma",
      time: "Today",
    },
  ];

  const attendanceData = [
    {
      subject: "DBMS",
      classes: 45,
      present: 42,
      absent: 3,
      percentage: "93%",
    },
    {
      subject: "Operating Systems",
      classes: 40,
      present: 36,
      absent: 4,
      percentage: "90%",
    },
    {
      subject: "Computer Networks",
      classes: 38,
      present: 35,
      absent: 3,
      percentage: "92%",
    },
    {
      subject: "Artificial Intelligence",
      classes: 42,
      present: 40,
      absent: 2,
      percentage: "95%",
    },
  ];

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

            <img
              src="https://i.pravatar.cc/150?img=32"
              alt=""
              className="w-14 h-14 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <StatCard
          icon={<Users size={30} />}
          title="Total Students"
          value="1,248"
          bg="bg-blue-50"
          color="text-blue-600"
        />

        <StatCard
          icon={<UserCheck size={30} />}
          title="Active Students"
          value="1,110"
          bg="bg-green-50"
          color="text-green-600"
        />

        <StatCard
          icon={<AlertTriangle size={30} />}
          title="Defaulters"
          value="138"
          bg="bg-orange-50"
          color="text-orange-600"
        />

        <StatCard
          icon={<FileText size={30} />}
          title="Reports Generated"
          value="524"
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

          <div className="space-y-4">
            {students.map((student) => (
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

      {/* PROFILE + ACTIONS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        {/* PROFILE */}
        <div className="xl:col-span-2 bg-white rounded-3xl border shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">
            Student Profile
          </h2>

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <Info title="Name" value="Aman Sharma" />
            <Info title="Roll Number" value="CSE22045" />
            <Info title="Semester" value="5th" />
            <Info title="Section" value="A" />
            <Info title="Attendance" value="92%" />
            <Info title="CGPA" value="8.7" />
          </div>

          <h3 className="font-bold text-xl mb-4">
            Attendance Summary
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-3 text-left">Subject</th>
                  <th className="p-3">Classes</th>
                  <th className="p-3">Present</th>
                  <th className="p-3">Absent</th>
                  <th className="p-3">%</th>
                </tr>
              </thead>

              <tbody>
                {attendanceData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-3">{item.subject}</td>
                    <td className="p-3 text-center">
                      {item.classes}
                    </td>
                    <td className="p-3 text-center">
                      {item.present}
                    </td>
                    <td className="p-3 text-center">
                      {item.absent}
                    </td>
                    <td className="p-3 text-center font-semibold text-green-600">
                      {item.percentage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-3xl border shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="space-y-4">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-2xl flex items-center gap-3 font-semibold">
              <FileText size={20} />
              Generate Report
            </button>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl flex items-center gap-3 font-semibold">
              <Download size={20} />
              Export PDF
            </button>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-2xl flex items-center gap-3 font-semibold">
              <Activity size={20} />
              View Full Activity
            </button>

            <button className="w-full bg-slate-900 hover:bg-black text-white p-4 rounded-2xl flex items-center gap-3 font-semibold">
              <Eye size={20} />
              View Detailed Report
            </button>
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

const Info = ({ title, value }) => (
  <div className="bg-slate-50 rounded-xl p-4">
    <p className="text-slate-500 text-sm">{title}</p>
    <h4 className="font-semibold text-lg">{value}</h4>
  </div>
);

export default StudentReportPage;