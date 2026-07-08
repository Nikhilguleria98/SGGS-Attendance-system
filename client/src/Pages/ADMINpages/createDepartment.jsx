import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import DepartmentTable from "../../components/ADMINComp/createDepartment/DepartmentTable";
import BatchTable from "../../components/ADMINComp/createDepartment/BatchTable";
import GroupTable from "../../components/ADMINComp/createDepartment/GroupTable";
import SubjectTable from "../../components/ADMINComp/createDepartment/SubjectTable";
import CreateDepartmentFormFields from "../../components/ADMINComp/createDepartment/CreateDepartmentFormFields";
import CreateBatchFormFields from "../../components/ADMINComp/createDepartment/CreateBatchFormFields";
import CreateGroupFormFields from "../../components/ADMINComp/createDepartment/CreateGroupFormFields";
import CreateSubjectFormFields from "../../components/ADMINComp/createDepartment/CreateSubjectFormFields";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "../../components/ADMINComp/Common/DeleteConfirmationModal";

const CreateDepartment = () => {
  const [activeTab, setActiveTab] = useState("departments"); // "departments", "batches", "groups"

  const [departments, setDepartments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [groups, setGroups] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);

  const [editData, setEditData] = useState(null);
  
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const [deptRes, batchRes, groupRes, subjectRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/departments`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${import.meta.env.VITE_API_URL}/batches`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${import.meta.env.VITE_API_URL}/groups`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${import.meta.env.VITE_API_URL}/subjects`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      const [deptData, batchData, groupData, subjectData] = await Promise.all([
        deptRes.json(), batchRes.json(), groupRes.json(), subjectRes.json()
      ]);

      if (deptData.success) setDepartments(deptData.data);
      if (batchData.success) setBatches(batchData.data);
      if (groupData.success) setGroups(groupData.data);
      if (subjectData.success) setSubjects(subjectData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeptSuccess = (newDept) => {
    toast.success("Department created successfully!");
    if (editData) { setDepartments(prev => prev.map(d => d._id === newDept._id ? newDept : d)); } 
    else { setDepartments((prev) => [...prev, newDept]); }
    setTimeout(() => setIsDeptModalOpen(false), 1500);
  };

  const handleBatchSuccess = (newBatch) => {
    toast.success(editData ? "Batch updated successfully!" : "Batch created successfully!");
    if (editData) { setBatches(prev => prev.map(b => b._id === newBatch._id ? newBatch : b)); }
    else { setBatches((prev) => [...prev, newBatch]); }
    setTimeout(() => setIsBatchModalOpen(false), 1500);
  };

  const handleGroupSuccess = (newGroup) => {
    toast.success(editData ? "Group updated successfully!" : "Group created successfully!");
    if (editData) { setGroups(prev => prev.map(g => g._id === newGroup._id ? newGroup : g)); }
    else { setGroups((prev) => [...prev, newGroup]); }
    setTimeout(() => setIsGroupModalOpen(false), 1500);
  };

  const handleSubjectSuccess = (newSubject) => {
    toast.success(editData ? "Subject updated successfully!" : "Subject created successfully!");
    if (editData) { setSubjects(prev => prev.map(s => s._id === newSubject._id ? newSubject : s)); }
    else { setSubjects((prev) => [...prev, newSubject]); }
    setTimeout(() => setIsSubjectModalOpen(false), 1500);
  };

  const handleDeleteItem = (type, item) => {
    setItemToDelete({ type, item });
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    const { type, item } = itemToDelete;
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const endpoint = type === "batch" ? "batches" : `${type}s`;
      const url = `${import.meta.env.VITE_API_URL}/${endpoint}/${item._id}`;
      const res = await fetch(url, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        if (type === "department") setDepartments(prev => prev.filter(d => d._id !== item._id));
        if (type === "batch") setBatches(prev => prev.filter(d => d._id !== item._id));
        if (type === "group") setGroups(prev => prev.filter(d => d._id !== item._id));
        if (type === "subject") setSubjects(prev => prev.filter(d => d._id !== item._id));
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted!`);
      } else {
        toast.error(`Failed to delete ${type}`);
      }
    } catch(e) { toast.error("Failed to delete"); }
    finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Entities</h1>
            <p className="text-gray-500 mt-1 text-sm">
              View and create university departments, batches, and groups
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => { setEditData(null); setIsSubjectModalOpen(true); }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#00529b] hover:bg-[#003d73] text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-[#00529b]/20"
            >
              <Plus size={18} />
              <span>Create Subject</span>
            </button>
            <button
              onClick={() => { setEditData(null); setIsGroupModalOpen(true); }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#00529b] hover:bg-[#003d73] text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-[#00529b]/20"
            >
              <Plus size={18} />
              <span>Create Group</span>
            </button>
            <button
              onClick={() => { setEditData(null); setIsBatchModalOpen(true); }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#00529b] hover:bg-[#003d73] text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-[#00529b]/20"
            >
              <Plus size={18} />
              <span>Create Batch</span>
            </button>
            <button
              onClick={() => { setEditData(null); setIsDeptModalOpen(true); }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#00529b] hover:bg-[#003d73] text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-[#00529b]/20"
            >
              <Plus size={18} />
              <span>Create Department</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 pb-2">
          <button onClick={() => setActiveTab("departments")} className={`font-semibold ${activeTab === "departments" ? "text-[#00529b] border-b-2 border-[#00529b]" : "text-gray-500"}`}>Departments</button>
          <button onClick={() => setActiveTab("subjects")} className={`font-semibold ${activeTab === "subjects" ? "text-[#00529b] border-b-2 border-[#00529b]" : "text-gray-500"}`}>Subjects</button>
          <button onClick={() => setActiveTab("batches")} className={`font-semibold ${activeTab === "batches" ? "text-[#00529b] border-b-2 border-[#00529b]" : "text-gray-500"}`}>Batches</button>
          <button onClick={() => setActiveTab("groups")} className={`font-semibold ${activeTab === "groups" ? "text-[#00529b] border-b-2 border-[#00529b]" : "text-gray-500"}`}>Groups</button>
        </div>

        {/* Table Section */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00529b]"></div>
          </div>
        ) : (
          <>
            {activeTab === "departments" && (
              <DepartmentTable 
                departments={departments} 
                onEdit={(dept) => { setEditData(dept); setIsDeptModalOpen(true); }}
                onDelete={(dept) => handleDeleteItem("department", dept)}
              />
            )}
            {activeTab === "batches" && (
              <BatchTable 
                batches={batches} 
                onEdit={(batch) => { setEditData(batch); setIsBatchModalOpen(true); }}
                onDelete={(batch) => handleDeleteItem("batch", batch)}
              />
            )}
            {activeTab === "subjects" && (
              <SubjectTable 
                subjects={subjects} 
                onEdit={(subject) => { setEditData(subject); setIsSubjectModalOpen(true); }}
                onDelete={(subject) => handleDeleteItem("subject", subject)}
              />
            )}
            {activeTab === "groups" && (
              <GroupTable 
                groups={groups} 
                onEdit={(group) => { setEditData(group); setIsGroupModalOpen(true); }}
                onDelete={(group) => handleDeleteItem("group", group)}
              />
            )}
          </>
        )}

      </div>

      {/* Modals */}
      <AnimatePresence>
        {isDeptModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setIsDeptModalOpen(false); setEditData(null); }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{editData ? "Edit Department" : "Create New Department"}</h2>
                  <p className="text-sm text-gray-500 mt-1">Fill in the details to add a department</p>
                </div>
                <button onClick={() => setIsDeptModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
              </div>
              <div className="p-2">
                <CreateDepartmentFormFields onSubmitSuccess={handleDeptSuccess} initialData={editData} />
              </div>
            </motion.div>
          </div>
        )}
        
        {isBatchModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setIsBatchModalOpen(false); setEditData(null); }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{editData ? "Edit Batch" : "Create New Batch"}</h2>
                  <p className="text-sm text-gray-500 mt-1">Fill in the details to {editData ? "update" : "add"} a batch</p>
                </div>
                <button onClick={() => setIsBatchModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
              </div>
              <div className="p-2">
                <CreateBatchFormFields onSubmitSuccess={handleBatchSuccess} initialData={editData} />
              </div>
            </motion.div>
          </div>
        )}

        {isGroupModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setIsGroupModalOpen(false); setEditData(null); }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{editData ? "Edit Group" : "Create New Group"}</h2>
                  <p className="text-sm text-gray-500 mt-1">Fill in the details to {editData ? "update" : "add"} a group</p>
                </div>
                <button onClick={() => setIsGroupModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
              </div>
              <div className="p-2">
                <CreateGroupFormFields onSubmitSuccess={handleGroupSuccess} initialData={editData} />
              </div>
            </motion.div>
          </div>
        )}
        
        {isSubjectModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setIsSubjectModalOpen(false); setEditData(null); }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{editData ? "Edit Subject" : "Create New Subject"}</h2>
                  <p className="text-sm text-gray-500 mt-1">Fill in the details to {editData ? "update" : "add"} a subject</p>
                </div>
                <button onClick={() => setIsSubjectModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
              </div>
              <div className="p-2">
                <CreateSubjectFormFields onSubmitSuccess={handleSubjectSuccess} initialData={editData} departments={departments} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <DeleteConfirmationModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title={`Delete ${itemToDelete?.type ? itemToDelete.type.charAt(0).toUpperCase() + itemToDelete.type.slice(1) : 'Item'}`}
        message={`Are you sure you want to delete ${itemToDelete?.item?.name || 'this item'}? This action cannot be undone.`}
      />
    </div>
  );
};

export default CreateDepartment;
