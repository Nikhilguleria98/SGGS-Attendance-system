import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiPlus,
  FiUpload,
  FiEdit2,
  FiTrash2,
  FiChevronDown,
} from "react-icons/fi";
import toast from "react-hot-toast";

// Reusing Admin components for Teacher dashboard
import AddStudentForm from "../../ADMINComp/ManageStudents/AddStudentForm";
import DeleteConfirmationModal from "../../ADMINComp/Common/DeleteConfirmationModal";

const StudentList = () => {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Edit / Add state
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  
  // Delete state
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const [studentsRes, deptsRes, batchesRes, groupsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/users?role=student`, {
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
      
      if (batchesRes.ok) {
        const batchesData = await batchesRes.json();
        if (batchesData.success) setBatches(batchesData.data);
      }
      if (groupsRes.ok) {
        const groupsData = await groupsRes.json();
        if (groupsData.success) setGroups(groupsData.data);
      }

    } catch (err) {
      console.error("Failed to fetch data", err);
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    const name = student.firstName + " " + (student.lastName || "");
    return name.toLowerCase().includes(search.toLowerCase()) || 
           (student.rollNo && student.rollNo.toLowerCase().includes(search.toLowerCase()));
  });

  const handleEdit = (student) => {
    setStudentToEdit(student);
    setIsAddingStudent(true);
  };

  const handleDelete = (student) => {
    setStudentToDelete(student);
  };

  const confirmDelete = async () => {
    const target = studentToDelete;
    if (!target) return;
    setStudentToDelete(null); // close modal immediately
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${target._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        toast.success("Student deleted successfully");
        setStudents(prev => prev.filter(s => s._id !== target._id));
      } else {
        toast.error(data.message || "Failed to delete student");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  const handleSaveStudent = async (studentData) => {
    studentData.role = "student";
    
    try {
      const token = localStorage.getItem("token");
      const isEdit = !!studentToEdit;
      const url = isEdit 
        ? `${import.meta.env.VITE_API_URL}/users/${studentToEdit._id}`
        : `${import.meta.env.VITE_API_URL}/users`;
        
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

  if (isAddingStudent) {
    return (
      <AddStudentForm 
        onCancel={() => setIsAddingStudent(false)}
        onSave={handleSaveStudent}
        initialData={studentToEdit}
        departments={departments}
        batches={batches}
        groups={groups}
      />
    );
  }

  return (
    <div className="w-full rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_2px_12px_rgba(15,23,42,0.06)] p-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[34px] font-bold text-[#0F172A] leading-none">
          Students
        </h1>
        <div className="flex gap-4">
          <button 
            onClick={() => { setStudentToEdit(null); setIsAddingStudent(true); }}
            className="flex items-center gap-2 h-12 px-7 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-semibold shadow-sm transition-all duration-200"
          >
            <FiPlus size={18} />
            Add Student
          </button>
          <button className="flex items-center gap-2 h-12 px-7 rounded-xl border border-[#CBD5E1] bg-white text-[#2563EB] font-semibold hover:bg-[#F8FAFC] transition-all">
            <FiUpload size={18} />
            Import Students
          </button>
        </div>
      </div>

      {/* Search & Dropdown */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative w-[400px]">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 rounded-xl border border-[#CBD5E1] bg-white pl-12 pr-4 text-[15px] text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
        <div className="relative w-[270px]">
          <select className="appearance-none w-full h-12 rounded-xl border border-[#CBD5E1] bg-white px-5 text-[15px] text-slate-700 outline-none cursor-pointer focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
            <option>All Sections</option>
          </select>
          <FiChevronDown
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full">
          <thead className="bg-[#F8FAFC]">
            <tr>
              <th className="px-6 py-5 text-left text-[15px] font-semibold tracking-wide text-[#334155]">#</th>
              <th className="px-6 py-5 text-left text-[15px] font-semibold tracking-wide text-[#334155]">Roll No.</th>
              <th className="px-6 py-5 text-left text-[15px] font-semibold tracking-wide text-[#334155]">Name</th>
              <th className="px-6 py-5 text-left text-[15px] font-semibold tracking-wide text-[#334155]">Email</th>
              <th className="px-6 py-5 text-left text-[15px] font-semibold tracking-wide text-[#334155]">Phone</th>
              <th className="px-6 py-5 text-center text-[15px] font-semibold tracking-wide text-[#334155]">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="px-6 py-6 text-center text-slate-500">
                  Loading students...
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-6 text-center text-slate-500">
                  No students found
                </td>
              </tr>
            ) : (
              filteredStudents.map((student, index) => (
                <tr
                  key={student._id}
                  className="border-t border-[#E2E8F0] hover:bg-[#F8FAFC] transition duration-200"
                >
                  <td className="px-6 py-6 text-[15px] text-slate-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-6">
                    <span className="font-semibold text-[#0F172A]">
                      {student.rollNo || student.rollNumber || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <span className="font-medium text-[#334155]">
                      {student.firstName} {student.lastName || ''}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-slate-600">
                      {student.email}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-[#475569]">
                      {student.phone || '-'}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex justify-center items-center gap-5">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-indigo-600 hover:text-indigo-800 hover:scale-110 transition-all"
                      >
                        <FiEdit2 className="text-[#4F46E5]" size={19} />
                      </button>
                      <button
                        onClick={() => handleDelete(student)}
                        className="text-red-500 hover:text-red-700 hover:scale-110 active:scale-95 transition-all duration-200"
                      >
                        <FiTrash2 className="text-[#EF4444]" size={19} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
};

export default StudentList;