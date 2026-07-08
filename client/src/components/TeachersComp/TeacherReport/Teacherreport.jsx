import { useState, useEffect } from "react";
import { Users, CheckCircle, AlertCircle } from "lucide-react";
import Header from "./Header";
import FilterBar from "./FilterBar";
import StatCard from "./StatCard";
import ReportTable from "./ReportTable";
import Pagination from "./Pagination";

const TeacherReport = () => {
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    batch: "",
    section: "",
    subject: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Build query string
        const params = new URLSearchParams({
          page: currentPage,
          limit: itemsPerPage
        });
        
        if (filters.department) params.append("department", filters.department);
        if (filters.batch) params.append("batch", filters.batch);
        if (filters.section) params.append("section", filters.section);
        if (filters.subject) params.append("subject", filters.subject);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/attendance/report?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data.success) {
          // If the user searches by name/roll, we filter it locally for now if backend doesn't support text search
          let results = data.data.data || [];
          if (filters.search) {
             results = results.filter(s => 
               s.student.toLowerCase().includes(filters.search.toLowerCase()) || 
               s.rollNumber.toLowerCase().includes(filters.search.toLowerCase())
             );
          }

          setStudents(results);
          setTotalStudents(data.data.total || 0);
          setTotalPages(data.data.totalPages || 1);
        } else {
          console.error("Failed to fetch attendance report:", data.message);
        }
      } catch (err) {
        console.error("Failed to fetch attendance report:", err);
      }
    };

    fetchReport();
  }, [currentPage, filters.department, filters.batch, filters.section, filters.subject, filters.search]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.department, filters.batch, filters.section, filters.subject, filters.search]);

  const avgAttendance =
    students.length > 0
      ? Math.round(
          students.reduce(
            (sum, student) => sum + student.percentage,
            0
          ) / students.length
        )
      : 0;

  const lowAttendance = students.filter(
    (student) => student.percentage < 75
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
            label="Avg Attendance (Current Page)"
            value={`${avgAttendance}%`}
          />

          <StatCard
            icon={<AlertCircle size={24} />}
            iconBg="bg-red-100"
            iconColor="text-red-600"
            label="Low Attendance (Current Page)"
            value={lowAttendance}
          />
        </div>

        <ReportTable students={students} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalStudents}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default TeacherReport;