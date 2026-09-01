import React, { useState, useEffect } from "react";
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
  const [allSubjects, setAllSubjects] = useState([]);
  const [trendData, setTrendData] = useState([]);
  
  const [semesters, setSemesters] = useState([]);
  const [sessions, setSessions] = useState([]);
  
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [selectedSession, setSelectedSession] = useState("All");

  const [stats, setStats] = useState({
    overall: 0,
    attended: 0,
    missed: 0,
    delivered: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/attendance-summary/student-dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        
        if (data.success) {
          const payload = data.data || {};
          const subjects = payload.subjects || (Array.isArray(payload) ? payload : []);
          const trend = payload.trend || [];
          
          setAllSubjects(subjects);
          setTrendData(trend);
          
          const uniqueSemesters = [...new Set(subjects.map(s => s.semester).filter(Boolean))].sort((a,b) => b - a);
          const uniqueSessions = [...new Set(subjects.map(s => s.academicYear).filter(Boolean))].sort((a,b) => b.localeCompare(a));
          
          setSemesters(uniqueSemesters);
          setSessions(uniqueSessions);
          
          if (uniqueSemesters.length > 0) setSelectedSemester(String(uniqueSemesters[0]));
          if (uniqueSessions.length > 0) setSelectedSession(uniqueSessions[0]);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };
    fetchDashboardData();
  }, []);

  useEffect(() => {
    let filtered = allSubjects;
    if (selectedSemester !== "All") {
      filtered = filtered.filter(s => String(s.semester) === String(selectedSemester));
    }
    if (selectedSession !== "All") {
      filtered = filtered.filter(s => String(s.academicYear) === String(selectedSession));
    }

    let attended = 0;
    let delivered = 0;
    let missed = 0;

    filtered.forEach(sub => {
      attended += (sub.attended || 0);
      delivered += (sub.delivered || 0);
      missed += (sub.absent || 0);
    });

    const overall = delivered > 0 ? Math.round((attended / delivered) * 100) : 0;
    
    setStats({ overall, attended, missed, delivered });
  }, [allSubjects, selectedSemester, selectedSession]);

  return (
    <div className="min-h-screen bg-slate-100">

      <AttendanceHeader 
        semesters={semesters}
        sessions={sessions}
        selectedSemester={selectedSemester}
        setSelectedSemester={setSelectedSemester}
        selectedSession={selectedSession}
        setSelectedSession={setSelectedSession}
      />

      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">

        {/* Summary Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          <SummaryCard
            title="Overall Attendance"
            value={`${stats.overall}%`}
            subtitle="Updated Today"
            color="green"
            icon={<FaChartLine />}
          />

          <SummaryCard
            title="Classes Attended"
            value={stats.attended.toString()}
            subtitle="This Semester"
            color="blue"
            icon={<FaUserCheck />}
          />

          <SummaryCard
            title="Classes Missed"
            value={stats.missed.toString()}
            subtitle="This Semester"
            color="red"
            icon={<FaUserTimes />}
          />

        </div>

        {/* Charts */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow p-4">
            <AttendanceOverview present={stats.attended} absent={stats.missed} overall={stats.overall} />
          </div>

          <div className="xl:col-span-2 bg-white rounded-2xl shadow p-4">
            <AttendanceTrend data={trendData} />
          </div>

        </div>

      </div>

    </div>
  );
}