import { useState, useMemo, useEffect } from "react";
import Header from "../../components/ADMINComp/ManageTeachers/Header";
import SearchFilterBar from "../../components/ADMINComp/ManageTeachers/SearchFilterBar";
import TeacherTable from "../../components/ADMINComp/ManageTeachers/TeacherTable";
import Pagination from "../../components/ADMINComp/ManageTeachers/Pagination";
import DeleteConfirmationModal from "../../components/ADMINComp/Common/DeleteConfirmationModal";
import TeacherModal from "../../components/ADMINComp/ManageTeachers/TeacherModal";
import toast from "react-hot-toast";

const PAGE_SIZE = 10;

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [groups, setGroups] = useState([]);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [group, setGroup] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  // Reset to page 1 whenever any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, department, batch, group]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const [teachersRes, deptsRes, batchesRes, groupsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/users?role=teacher`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${import.meta.env.VITE_API_URL}/departments`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${import.meta.env.VITE_API_URL}/batches`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${import.meta.env.VITE_API_URL}/groups`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const teachersData = await teachersRes.json();
      const deptsData = await deptsRes.json();
      const batchesData = await batchesRes.json();
      const groupsData = await groupsRes.json();

      if (teachersData.success) setTeachers(teachersData.data);
      if (deptsData.success) setDepartments(deptsData.data);
      if (batchesData.success) setBatches(batchesData.data);
      if (groupsData.success) setGroups(groupsData.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const name = teacher.firstName + " " + (teacher.lastName || "");
      const matchesSearch = name.toLowerCase().includes(search.toLowerCase());

      const tDeptId = typeof teacher.department === "object" ? teacher.department?._id : teacher.department;
      const matchesDepartment = !department ||
        (teacher.departments && teacher.departments.includes(department)) ||
        tDeptId === department;

      const teachesBatch = !batch || (teacher.batches && teacher.batches.includes(batch));
      const teachesGroup = !group || (teacher.groups && teacher.groups.includes(group));

      return matchesSearch && matchesDepartment && teachesBatch && teachesGroup;
    });
  }, [teachers, search, department, batch, group]);

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
    const target = teacherToDelete;
    if (!target) return;
    setTeacherToDelete(null); 
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${target._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Teacher deleted successfully");
        setTeachers(prev => prev.filter(t => t._id !== target._id));
      } else {
        toast.error(data.message || "Failed to delete teacher");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  const handleSaveTeacher = async (teacherData) => {
    if (isSaving) return;
    setIsSaving(true);
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
        
        // Optimistically update the state using the server's processed response
        if (data.data) {
          setTeachers(prev => {
            if (isEdit) {
              return prev.map(t => t._id === data.data._id ? data.data : t);
            } else {
              return [data.data, ...prev];
            }
          });
        } else {
          // Fallback just in case
          fetchData();
        }
        
        setIsModalOpen(false);
      } else {
        toast.error(data.message || "Failed to save teacher");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setIsSaving(false);
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
            batch={batch}
            setBatch={setBatch}
            batches={batches}
            group={group}
            setGroup={setGroup}
            groups={groups}
          />

          {isLoading ? (
            <div className="flex justify-center py-20">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00529b]"></div>
            </div>
          ) : (
            <>
              <TeacherTable
                teachers={paginatedTeachers}
                departments={departments}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredTeachers.length}
                itemsPerPage={PAGE_SIZE}
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
        batches={batches}
        groups={groups}
        isSaving={isSaving}
      />
    </div>
  );
}