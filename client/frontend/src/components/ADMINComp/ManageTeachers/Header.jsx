import { Plus } from "lucide-react";

export default function Header({ onAddTeacher }) {
  return (
    <div className="flex items-center justify-between mb-6 ml-6 mr-6 mt-6">
      <h1 className="text-xl font-bold text-brand-blue">Manage Teachers</h1>
      <button
        onClick={onAddTeacher}
        className="flex items-center gap-2 bg-brand-red hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
      >
        <Plus size={16} />
        Add Teacher
      </button>
    </div>
  );
}