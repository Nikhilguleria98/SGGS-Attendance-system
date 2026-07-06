import AttendanceHeader from "../../components/StudentComp/Attendance/AttendanceHeader";
import SummaryCard from "../../components/StudentComp/Attendance/SummaryCard";
import AttendanceOverview from "../../components/StudentComp/Attendance/AttendanceOverview";
import AttendanceTrend from "../../components/StudentComp/Attendance/AttendanceTrend";
import AttendanceTable from "../../components/StudentComp/Attendance/AttendanceTable";
import RecentAttendance from "../../components/StudentComp/Attendance/RecentAttendance";
import QuickActions from "../../components/StudentComp/Attendance/QuickActions";

import {
  FaChartLine,
  FaUserCheck,
  FaUserTimes,
  FaCalendarCheck,
} from "react-icons/fa";

export default function AttendanceDashboard() {
  return (
    <div className="min-h-screen bg-[#F5F7FB]">

      <AttendanceHeader />

      <div className="p-8">

        {/* Summary Cards */}

        <div className="grid grid-cols-4 gap-6 mb-8">

  <SummaryCard
    title="Overall Attendance"
    value="82.4%"
    subtitle="↑ 4.2% from last month"
    color="green"
    icon={<FaChartLine />}
  />

  <SummaryCard
    title="Classes Attended"
    value="89"
    subtitle="Total Classes"
    color="blue"
    icon={<FaUserCheck />}
  />

  <SummaryCard
    title="Classes Absent"
    value="17"
    subtitle="Total Classes"
    color="red"
    icon={<FaUserTimes />}
  />

  <SummaryCard
    title="Leave Taken"
    value="2"
    subtitle="ML : 1 | DL : 1"
    color="orange"
    icon={<FaCalendarCheck />}
  />

</div>

        {/* Charts */}

        <div className="grid grid-cols-3 gap-6 mb-6">

          <div className="col-span-1 ">
    <AttendanceOverview />
</div>

          <div className="col-span-2">
            <AttendanceTrend />
          </div>

        </div>

        {/* Bottom Section */}

        <div className="grid grid-cols-4 gap-6">

          <div className="col-span-3">
            <AttendanceTable />
          </div>

          <div className="space-y-6">

            <RecentAttendance />

            <QuickActions />

          </div>

        </div>

      </div>

    </div>
  );
}