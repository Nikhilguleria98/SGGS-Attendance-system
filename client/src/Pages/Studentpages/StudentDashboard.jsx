import AttendanceHeader from "../../components/StudentComp/StudentMainDasboard/AttendanceHeader";
import SummaryCard from "../../components/StudentComp/StudentMainDasboard/SummaryCard";
import AttendanceOverview from "../../components/StudentComp/StudentMainDasboard/AttendanceOverview";
import AttendanceTrend from "../../components/StudentComp/StudentMainDasboard/AttendanceTrend";

import {
  FaChartLine,
  FaUserCheck,
  FaUserTimes,
} from "react-icons/fa";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-[#F5F7FB]">

      <AttendanceHeader />

      <div className="p-4 md:p-6 lg:p-8">

        {/* Summary Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

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

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

          <div className="xl:col-span-1">
            <AttendanceOverview />
          </div>

          <div className="xl:col-span-2">
            <AttendanceTrend />
          </div>

        </div>

        {/* Bottom */}

        {/* <div className="mt-6">

          <QuickActions />

        </div> */}

      </div>

    </div>
  );
}