import AttendanceTable from "../../components/StudentComp/Attendance/AttendanceTable";
import RecentAttendance from "../../components/StudentComp/Attendance/RecentAttendance";

export default function AttendanceDashboard() {
  return (
    <div className="min-h-screen bg-[#F5F7FB]">

      <div className="p-4 md:p-6 lg:p-8">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-[#17356D]">
            Attendance Records
          </h1>

          <p className="text-gray-500 mt-2">
            View subject-wise attendance details and recent attendance history.
          </p>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

          <div className="xl:col-span-3">
            <AttendanceTable />
          </div>

          <div>
            <RecentAttendance />
          </div>

        </div>

      </div>

    </div>
  );
}