import { useState, useMemo } from "react";
import Header from "../../components/ADMINComp/ManageTeachers/Header";
import SearchFilterBar from "../../components/ADMINComp/ManageTeachers/SearchFilterBar";
import TeacherTable from "../../components/ADMINComp/ManageTeachers/TeacherTable";
import Pagination from "../../components/ADMINComp/ManageTeachers/Pagination";

// 👇 This MUST exist with actual data in it
const dummyTeachers = [
  { id: 1, name: "Amit Verma", email: "amit@college.edu.in", department: "PGDCA", phone: "9876543210" },
  { id: 2, name: "Priya Singh", email: "priya@college.edu.in", department: "MCA", phone: "9876543211" },
  { id: 3, name: "Rahul Mehta", email: "rahul@college.edu.in", department: "BCA", phone: "9876543212" },
  { id: 4, name: "Neha Sharma", email: "neha@college.edu.in", department: "M.TECH", phone: "9876543213" },
  { id: 5, name: "Vikram Joshi", email: "vikram@college.edu.in", department: "B.TECH", phone: "9876543214" },
];

const PAGE_SIZE = 5;

export default function ManageTeachers() {
  const [teachers] = useState(dummyTeachers); // 👈 must be seeded, not []
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
      const matchesDept = department === "All Departments" || t.department === department;
      return matchesSearch && matchesDept;
    });
  }, [teachers, search, department]);

  const totalPages = Math.max(1, Math.ceil(filteredTeachers.length / PAGE_SIZE));
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleEdit = (teacher) => console.log("Edit", teacher);
  const handleDelete = (teacher) => console.log("Delete", teacher);
  const handleAddTeacher = () => console.log("Open add teacher modal");

  return (
    <div className="flex">
      <div className="flex-1 bg-gray-50 min-h-screen p-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Header onAddTeacher={handleAddTeacher} />
          <SearchFilterBar
            search={search}
            setSearch={setSearch}
            department={department}
            setDepartment={setDepartment}
          />
          <TeacherTable
            teachers={paginatedTeachers}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}