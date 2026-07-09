import AttendanceHeader from "../../components/StudentComp/StudentMainDasboard/AttendanceHeader";
import SummaryCard from "../../components/StudentComp/StudentMainDasboard/SummaryCard";
import AttendanceOverview from "../../components/StudentComp/StudentMainDasboard/AttendanceOverview";
import AttendanceTrend from "../../components/StudentComp/StudentMainDasboard/AttendanceTrend";

import {
  FaChartLine,
  FaUserCheck,
  FaUserTimes
} from "react-icons/fa";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-slate-100">

      <AttendanceHeader />

      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">

        {/* Summary Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          <SummaryCard
            title="Overall Attendance"
            value="82%"
            subtitle="Updated Today"
            color="green"
            icon={<FaChartLine />}
          />

          <SummaryCard
            title="Classes Attended"
            value="89"
            subtitle="This Semester"
            color="blue"
            icon={<FaUserCheck />}
          />

          <SummaryCard
            title="Classes Missed"
            value="17"
            subtitle="This Semester"
            color="red"
            icon={<FaUserTimes />}
          />

        </div>

        {/* Charts */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow p-4">
            <AttendanceOverview />
          </div>

          <div className="xl:col-span-2 bg-white rounded-2xl shadow p-4">
            <AttendanceTrend />
          </div>

        </div>

      </div>

    </div>
  );
}