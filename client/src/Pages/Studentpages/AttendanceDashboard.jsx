import AttendanceTable from "../../components/StudentComp/Attendance/AttendanceTable";
import { FiCalendar, FiChevronDown } from "react-icons/fi";

export default function AttendanceDashboard() {
  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          {/* Left */}
          <div>
            <h1 className="text-4xl font-bold text-[#17356D]">
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
                <option>Semester 7</option>
                <option>Semester 6</option>
                <option>Semester 5</option>
              </select>

              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="grid grid-cols-1">
          <AttendanceTable />
        </div>
      </div>
    </div>
  );
}
