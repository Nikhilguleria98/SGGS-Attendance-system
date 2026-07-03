import { useState, useMemo } from "react";
import StudentSearchFilter from "../../components/ADMINComp/ManageStudents.jsx/StudentSearchFilter";
import StudentTable from "../../components/ADMINComp/ManageStudents.jsx/StudentTable";
import ManageStudentsPagination from "../../components/ADMINComp/ManageStudents.jsx/ManageStudentsPagination";
import ManageStudentsHeader from "../../components/ADMINComp/ManageStudents.jsx/ManageStudentsHeader";

// Dummy Student Data
const dummyStudents = [
  {
    id: 1,
    name: "Amit Verma",
    rollNo: "83732233",
    department: "PGDCA",
    phone: "9876543210",
  },
  {
    id: 2,
    name: "Priya Singh",
    rollNo: "1836343",
    department: "MCA",
    phone: "9876543211",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    rollNo: "28374328",
    department: "BCA",
    phone: "9876543212",
  },
  {
    id: 4,
    name: "Neha Sharma",
    rollNo: "123131",
    department: "M.TECH",
    phone: "9876543213",
  },
  {
    id: 5,
    name: "Vikram Joshi",
    rollNo: "12313123",
    department: "B.TECH",
    phone: "9876543214",
  },
];

const PAGE_SIZE = 5;

const columns = [
  "#",
  "Name",
  "rollNo",
  "Department",
  "Phone",
  "Actions",
];

const departments = [
  "All Departments",
  "BCA",
  "MCA",
  "PGDCA",
  "B.TECH",
  "M.TECH",
];

export default function ManageStudentsPage() {
  const [students] = useState(dummyStudents);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = student.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesDepartment =
        department === "All Departments" ||
        student.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [students, search, department]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / PAGE_SIZE)
  );

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleEdit = (student) => {
    console.log("Edit Student:", student);
  };

  const handleDelete = (student) => {
    console.log("Delete Student:", student);
  };

  const handleAddStudent = () => {
    console.log("Open Add Student Modal");
  };

  return (
    <div className="flex">
      <div className="flex-1 bg-gray-50 min-h-screen p-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <ManageStudentsHeader onAddStudent={handleAddStudent} />

          <StudentSearchFilter
            search={search}
            setSearch={setSearch}
            department={department}
            setDepartment={setDepartment}
            departments={departments}
          />

          <StudentTable
            columns={columns}
            students={paginatedStudents}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <ManageStudentsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}