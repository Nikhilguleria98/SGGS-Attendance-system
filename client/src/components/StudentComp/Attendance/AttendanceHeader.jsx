import { FiCalendar, FiChevronDown } from "react-icons/fi";

export default function AttendanceHeader() {
  return (
    <div className="flex items-start justify-between px-8 py-7 bg-[#F5F7FB]">

      {/* Left */}

      <div>

        <h1 className="text-[42px] font-bold text-[#17356D] tracking-tight">
          Attendance Dashboard
        </h1>

        <p className="mt-2 text-[17px] text-[#64748B]">
          Track your attendance overview and subject-wise details
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Semester */}

        <div className="relative">

          <select
            className="
            appearance-none
            w-40
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

          <FiChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />

        </div>

        {/* Session */}

        <div className="relative">

          <FiCalendar
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <select
            className="
            appearance-none
            w-40
            h-12
            rounded-xl
            border
            border-[#E2E8F0]
            bg-white
            pl-11
            pr-10
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
            <option>2025-26</option>
            <option>2024-25</option>
            <option>2023-24</option>
          </select>

          <FiChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />

        </div>

      </div>

    </div>
  );
}