import { useState } from "react";
import AttendanceTable from "../../components/StudentComp/Attendance/AttendanceTable";
import { ChevronDown } from "lucide-react";

export default function AttendanceDashboard() {
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("All");

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          {/* Left */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#17356D]">
              Subject-Wise-Attendance
            </h1>

            <p className="text-gray-500 mt-2">
              View subject-wise attendance details history.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Semester */}
            <div className="relative">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="
                  appearance-none
                  w-full sm:w-44
                  h-12
                  rounded-xl
                  border
                  border-[#E2E8F0]
                  bg-white
                  px-5
                  text-[15px]
                  font-medium
                  text-slate-700
                  shadow-sm
                  outline-none
                  cursor-pointer
                  focus:ring-4
                  focus:ring-blue-100
                "
              >
                <option value="All">All Semesters</option>
                {semesters.map(sem => {
                  const label = String(sem).toLowerCase().includes('semester') ? sem : `Semester ${sem}`;
                  return <option key={sem} value={sem}>{label}</option>
                })}
              </select>

              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="grid grid-cols-1">
          <AttendanceTable 
            selectedSemester={selectedSemester} 
            onSemestersLoaded={setSemesters} 
          />
        </div>
      </div>
    </div>
  );
}
