import { useState, useMemo, useEffect } from "react";
import Header from "../../components/ADMINComp/ManageTeachers/Header";
import SearchFilterBar from "../../components/ADMINComp/ManageTeachers/SearchFilterBar";
import TeacherTable from "../../components/ADMINComp/ManageTeachers/TeacherTable";
import Pagination from "../../components/ADMINComp/ManageTeachers/Pagination";
import DeleteConfirmationModal from "../../components/ADMINComp/Common/DeleteConfirmationModal";
import TeacherModal from "../../components/ADMINComp/ManageTeachers/TeacherModal";
import toast from "react-hot-toast";

const PAGE_SIZE = 5;

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [departments, setDepartments] = useState([]);
  
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      const [teachersRes, deptsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/users?role=teacher`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${import.meta.env.VITE_API_URL}/departments`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const teachersData = await teachersRes.json();
      const deptsData = await deptsRes.json();

      if (teachersData.success) {
        setTeachers(teachersData.data);
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

  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const name = t.firstName + " " + t.lastName;
      const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
      
      // t.department could be an ID or populated object, depending on backend
      const tDeptId = typeof t.department === "object" ? t.department?._id : t.department;
      const matchesDept = !department || tDeptId === department;
      
      return matchesSearch && matchesDept;
    });
  }, [teachers, search, department]);

  const totalPages = Math.max(1, Math.ceil(filteredTeachers.length / PAGE_SIZE));
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleEdit = (teacher) => {
    setTeacherToEdit(teacher);
    setIsModalOpen(true);
  };

  const handleAddTeacher = () => {
    setTeacherToEdit(null);
    setIsModalOpen(true);
  };

  const handleDelete = (teacher) => setTeacherToDelete(teacher);

  const confirmDelete = async () => {
    if (teacherToDelete) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${teacherToDelete._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const data = await response.json();
        if (data.success) {
          toast.success("Teacher deleted successfully");
          setTeachers(teachers.filter(t => t._id !== teacherToDelete._id));
        } else {
          toast.error(data.message || "Failed to delete teacher");
        }
      } catch (err) {
        console.error(err);
        toast.error("Server error");
      }
      setTeacherToDelete(null);
    }
  };

  const handleSaveTeacher = async (teacherData) => {
    // Add role explicitly
    teacherData.role = "teacher";
    
    try {
      const token = localStorage.getItem("token");
      const isEdit = !!teacherToEdit;
      const url = isEdit 
        ? `${import.meta.env.VITE_API_URL}/users/${teacherToEdit._id}`
        : `${import.meta.env.VITE_API_URL}/users`;
        
      const response = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(teacherData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Teacher ${isEdit ? "updated" : "added"} successfully`);
        // Refresh data to get the populated department
        fetchData(); 
        setIsModalOpen(false);
      } else {
        toast.error(data.message || "Failed to save teacher");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

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
            departments={departments}
          />
          
          {isLoading ? (
            <div className="flex justify-center py-20">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00529b]"></div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      <DeleteConfirmationModal 
        isOpen={!!teacherToDelete} 
        onClose={() => setTeacherToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Teacher"
        message={`Are you sure you want to delete ${teacherToDelete?.firstName || 'this teacher'}? This action cannot be undone.`}
      />

      <TeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={teacherToEdit}
        onSave={handleSaveTeacher}
        departments={departments}
      />
    </div>
  );
}