import React from "react";
import { Plus } from "lucide-react";

const ManageStudentsHeader = ({ onAddStudent }) => {
  return (
    <div className="flex items-center justify-between mb-6 ml-6 mr-6 mt-6">
      <h1 className="text-xl font-bold text-brand-blue">
        Manage Students
      </h1>

      <button
        onClick={onAddStudent}
        className="flex items-center gap-2 bg-brand-red hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
      >
        <Plus size={16} />
        Add Student
      </button>
    </div>
  );
};

export default ManageStudentsHeader;