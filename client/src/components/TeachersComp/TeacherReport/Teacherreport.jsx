import { useState, useEffect } from "react";
import { Users, CheckCircle, AlertCircle } from "lucide-react";
import Header from "./Header";
import FilterBar from "./FilterBar";
import StatCard from "./StatCard";
import ReportTable from "./ReportTable";

const TeacherReport = () => {
  const [students, setStudents] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    department: "",
    batch: "",
    section: "",
    subject: "",
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/attendance/report`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data.success) {
          setStudents(data.data || []);
        } else {
          console.error("Failed to fetch attendance report:", data.message);
        }
      } catch (err) {
        console.error("Failed to fetch attendance report:", err);
      }
    };

    fetchReport();
  }, []);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredStudents = students.filter((student) => {
    const searchMatch =
      student.studentName.toLowerCase().includes(filters.search.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(filters.search.toLowerCase());

    return (
      searchMatch &&
      (filters.department === "" || student.department === filters.department) &&
      (filters.batch === "" || student.batch === filters.batch) &&
      (filters.section === "" || student.section === filters.section) &&
      (filters.subject === "" || student.subject === filters.subject)
    );
  });

  const totalStudents = filteredStudents.length;

  const avgAttendance =
    totalStudents > 0
      ? Math.round(
          filteredStudents.reduce(
            (sum, student) => sum + (student.present / student.totalClasses) * 100,
            0
          ) / totalStudents
        )
      : 0;

  const lowAttendance = filteredStudents.filter(
    (student) => (student.present / student.totalClasses) * 100 < 75
  ).length;

  return (
    <div className="p-4 md:p-8 min-h-screen bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">
        <Header />

        <FilterBar filters={filters} onChange={handleChange} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard
            icon={<Users size={24} />}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            label="Total Students"
            value={totalStudents}
          />

          <StatCard
            icon={<CheckCircle size={24} />}
            iconBg="bg-green-100"
            iconColor="text-green-600"
            label="Avg Attendance"
            value={`${avgAttendance}%`}
          />

          <StatCard
            icon={<AlertCircle size={24} />}
            iconBg="bg-red-100"
            iconColor="text-red-600"
            label="Low Attendance"
            value={lowAttendance}
          />
        </div>

        <ReportTable students={filteredStudents} />
      </div>
    </div>
  );
};

export default TeacherReport;