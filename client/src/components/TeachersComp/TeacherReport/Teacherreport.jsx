import { useState, useEffect } from "react";
import { Users, CheckCircle, AlertCircle } from "lucide-react";
import Header from "./Header";
import FilterBar from "./FilterBar";
import StatCard from "./StatCard";
import ReportTable from "./ReportTable";
import Pagination from "./Pagination";

const TeacherReport = () => {
  const [students, setStudents] = useState([]);
  const [allFetchedStudents, setAllFetchedStudents] = useState([]); // Keeps unfiltered original data
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    semester: "",
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
        if (filters.semester) params.append("semester", filters.semester);
        if (filters.batch) params.append("batch", filters.batch);
        if (filters.section) params.append("section", filters.section);
        if (filters.subject) params.append("subject", filters.subject);
        if (filters.search) params.append("search", filters.search);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/attendance-summary/teacher-report?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data.success) {
          // Store raw fetched batch so FilterBar can extract dropdown options if needed
          let fetched = data.data.data || [];
          setAllFetchedStudents(fetched);

          let results = fetched;
          
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
  }, [currentPage, filters.department, filters.semester, filters.batch, filters.section, filters.subject, filters.search]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Reset to page 1 whenever any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.department, filters.semester, filters.batch, filters.section, filters.subject, filters.search]);

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

        <FilterBar 
          filters={filters} 
          onChange={handleChange} 
          availableData={allFetchedStudents} 
        />

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