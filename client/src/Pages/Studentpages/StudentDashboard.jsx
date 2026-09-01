import { useState, useEffect, useMemo } from "react";
import AttendanceHeader from "../../components/StudentComp/StudentMainDasboard/AttendanceHeader";
import SummaryCard from "../../components/StudentComp/StudentMainDasboard/SummaryCard";
import AttendanceOverview from "../../components/StudentComp/StudentMainDasboard/AttendanceOverview";
import AttendanceTrend from "../../components/StudentComp/StudentMainDasboard/AttendanceTrend";
import { TrendingUp, UserCheck, UserX } from "lucide-react";

export default function StudentDashboard() {
  const [summaries, setSummaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/attendance-summary/student-dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && data.data) {
          setSummaries(data.data.subjects || []);
        }
      } catch (err) {
        console.error("Failed to fetch attendance data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const semesters = useMemo(() => {
    const map = new Map();
    summaries.forEach(s => {
      if (s.semester) map.set(String(s.semester), String(s.semester));
    });
    return Array.from(map.values());
  }, [summaries]);

  const sessions = useMemo(() => {
    const map = new Map();
    summaries.forEach(s => {
      if (s.academicYear) map.set(s.academicYear, s.academicYear);
    });
    return Array.from(map.values());
  }, [summaries]);

  const currentSemester = semesters.length === 1 ? semesters[0] : "All";
  const currentSession = sessions.length === 1 ? sessions[0] : "All";

  const { totalDelivered, totalAttended, totalAbsent, overallPercent } = useMemo(() => {
    const td = summaries.reduce((sum, s) => sum + (s.delivered || 0), 0);
    const ta = summaries.reduce((sum, s) => sum + (s.attended || 0), 0);
    const tabs = summaries.reduce((sum, s) => sum + (s.absent || 0), 0);
    const op = td > 0 ? Math.round((ta / td) * 100) : 0;
    return { totalDelivered: td, totalAttended: ta, totalAbsent: tabs, overallPercent: op };
  }, [summaries]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#17356D]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <AttendanceHeader 
        semesters={semesters}
        sessions={sessions}
        selectedSemester={currentSemester}
        selectedSession={currentSession}
      />
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <SummaryCard
            title="Overall Attendance"
            value={`${overallPercent}%`}
            subtitle="Updated Today"
            color="green"
            icon={<TrendingUp />}
          />
          <SummaryCard
            title="Classes Attended"
            value={totalAttended}
            subtitle="This Semester"
            color="blue"
            icon={<UserCheck />}
          />
          <SummaryCard
            title="Classes Missed"
            value={totalAbsent}
            subtitle="This Semester"
            color="red"
            icon={<UserX />}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-4">
            <AttendanceOverview summaries={summaries} />
          </div>
          <div className="xl:col-span-2 bg-white rounded-2xl shadow p-4">
            <AttendanceTrend summaries={summaries} />
          </div>
        </div>
      </div>
    </div>
  );
}
