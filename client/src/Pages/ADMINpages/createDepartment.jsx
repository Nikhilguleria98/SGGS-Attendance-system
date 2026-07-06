import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import DepartmentTable from "../../components/ADMINComp/createDepartment/DepartmentTable";
import CreateDepartmentFormFields from "../../components/ADMINComp/createDepartment/CreateDepartmentFormFields";
import toast from "react-hot-toast";

const CreateDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/departments", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setDepartments(data.data);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error("Failed to load departments.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitSuccess = (newDepartment) => {
    toast.success("Department created successfully!");
    setDepartments((prev) => [...prev, newDepartment]);
    setTimeout(() => setIsModalOpen(false), 1500); // Close modal shortly after success animation
  };

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Departments</h1>
            <p className="text-gray-500 mt-1 text-sm">
              View and create university departments
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#00529b] hover:bg-[#003d73] text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-[#00529b]/20"
          >
            <Plus size={18} />
            <span>Create Department</span>
          </button>
        </div>

        {/* Table Section */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00529b]"></div>
          </div>
        ) : (
          <DepartmentTable departments={departments} />
        )}

      </div>

      {/* Create Department Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden z-50"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Create New Department</h2>
                  <p className="text-sm text-gray-500 mt-1">Fill in the details to add a department</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Component */}
              <div className="p-2">
                <CreateDepartmentFormFields onSubmitSuccess={handleSubmitSuccess} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateDepartment;
