import {
  FiDownload,
  FiFileText,
  FiCalendar,
  FiBarChart2,
} from "react-icons/fi";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-3xl border border-[#E7EDF5] shadow-[0_4px_20px_rgba(15,23,42,0.06)] p-6">

      <h2 className="text-xl font-bold text-[#17356D]">
        Quick Actions
      </h2>

      <p className="text-gray-500 mt-1 mb-6">
        Frequently used options
      </p>

      <div className="space-y-4">

        <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-[#17356D] text-white hover:bg-[#102B5C] transition">

          <FiDownload size={20} />

          Export Attendance Report

        </button>

        <button className="w-full flex items-center gap-4 p-4 rounded-2xl border hover:bg-gray-50 transition">

          <FiFileText size={20} />

          Request Leave

        </button>

        <button className="w-full flex items-center gap-4 p-4 rounded-2xl border hover:bg-gray-50 transition">

          <FiCalendar size={20} />

          View Full Calendar

        </button>

        <button className="w-full flex items-center gap-4 p-4 rounded-2xl border hover:bg-gray-50 transition">

          <FiBarChart2 size={20} />

          Attendance Analytics

        </button>

      </div>

    </div>
  );
}