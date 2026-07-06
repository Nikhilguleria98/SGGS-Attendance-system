import { useState, useMemo, useEffect } from "react";
import StudentSearchFilter from "../../components/ADMINComp/ManageStudents/StudentSearchFilter";
import StudentTable from "../../components/ADMINComp/ManageStudents/StudentTable";
import ManageStudentsPagination from "../../components/ADMINComp/ManageStudents/ManageStudentsPagination";
import ManageStudentsHeader from "../../components/ADMINComp/ManageStudents/ManageStudentsHeader";
import DeleteConfirmationModal from "../../components/ADMINComp/Common/DeleteConfirmationModal";
import AddStudentForm from "../../components/ADMINComp/ManageStudents/AddStudentForm";
import toast from "react-hot-toast";

const PAGE_SIZE = 5;

const columns = [
  "#",
  "Name",
  "rollNo",
  "Department",
  "Batch",
  "Group",
  "Actions",
];

export default function ManageStudentsPage() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentToDelete, setStudentToDelete] = useState(null);
  
  // Create / Edit modal state
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      const [studentsRes, deptsRes] = await Promise.all([
        fetch("http://localhost:3000/api/users?role=student", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("http://localhost:3000/api/departments", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (studentsRes.status === 401 || deptsRes.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.clear();
        window.location.href = "/";
        return;
      }

      const studentsData = await studentsRes.json();
      const deptsData = await deptsRes.json();

      if (studentsData.success) {
        setStudents(studentsData.data);
      }
      if (deptsData.success) {
        setDepartments(deptsData.data);
      }

    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const name = student.firstName + " " + (student.lastName || "");
      const matchesSearch = name.toLowerCase().includes(search.toLowerCase());

      const sDeptId = typeof student.department === "object" ? student.department?._id : student.department;
      const matchesDepartment = !department || sDeptId === department;

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
    setStudentToEdit(student);
    setIsAddingStudent(true);
  };

  const handleDelete = (student) => {
    setStudentToDelete(student);
  };

  const confirmDelete = async () => {
    if (studentToDelete) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/users/${studentToDelete._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const data = await response.json();
        if (data.success) {
          toast.success("Student deleted successfully");
          setStudents(students.filter(s => s._id !== studentToDelete._id));
        } else {
          toast.error(data.message || "Failed to delete student");
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error");
      }
      setStudentToDelete(null);
    }
  };

  const handleAddStudent = () => {
    setStudentToEdit(null);
    setIsAddingStudent(true);
  };

  const handleSaveStudent = async (studentData) => {
    studentData.role = "student";
    
    try {
      const token = localStorage.getItem("token");
      const isEdit = !!studentToEdit;
      const url = isEdit 
        ? `http://localhost:3000/api/users/${studentToEdit._id}`
        : `http://localhost:3000/api/users`;
        
      const response = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(studentData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Student ${isEdit ? "updated" : "added"} successfully`);
        fetchData(); 
        setIsAddingStudent(false);
      } else {
        toast.error(data.message || "Failed to save student");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 bg-gray-50 min-h-screen p-6">
        {isAddingStudent ? (
          <AddStudentForm 
            onCancel={() => setIsAddingStudent(false)}
            onSave={handleSaveStudent}
            initialData={studentToEdit}
            departments={departments}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <ManageStudentsHeader onAddStudent={handleAddStudent} />

            <StudentSearchFilter
              search={search}
              setSearch={setSearch}
              department={department}
              setDepartment={setDepartment}
              departments={departments}
            />
            
            {isLoading ? (
              <div className="flex justify-center py-20">
                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00529b]"></div>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      </div>

      <DeleteConfirmationModal 
        isOpen={!!studentToDelete} 
        onClose={() => setStudentToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Student"
        message={`Are you sure you want to delete ${studentToDelete?.firstName || 'this student'}? This action cannot be undone.`}
      />
    </div>
  );
}