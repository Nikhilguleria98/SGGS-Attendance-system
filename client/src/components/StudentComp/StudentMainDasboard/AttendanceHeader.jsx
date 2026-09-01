import { Calendar, ChevronDown } from "lucide-react";

export default function AttendanceHeader({ 
  semesters = [], 
  sessions = [], 
  selectedSemester = "All", 
  setSelectedSemester = () => {},
  selectedSession = "All",
  setSelectedSession = () => {}
}) {
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
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
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
            <option value="All">All Semesters</option>
            {semesters.map(sem => {
              const label = String(sem).toLowerCase().includes('semester') ? sem : `Semester ${sem}`;
              return <option key={sem} value={sem}>{label}</option>
            })}
          </select>

          <ChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />

        </div>

        {/* Session */}

        <div className="relative">

          <Calendar
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
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
            <option value="All">All Sessions</option>
            {sessions.map(ses => (
              <option key={ses} value={ses}>{ses}</option>
            ))}
          </select>

          <ChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
          />

        </div>

      </div>

    </div>
  );
}