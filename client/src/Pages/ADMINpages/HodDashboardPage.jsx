import React, { useState, useEffect } from 'react';
import AdminHeader from '../../components/ADMINComp/HodDashboard/AdminHeader';
import StatCards from '../../components/ADMINComp/HodDashboard/StatCards';
import AttendanceChart from '../../components/ADMINComp/HodDashboard/AttendanceChart';
import QuickActions from '../../components/ADMINComp/HodDashboard/QuickActions';

const HodDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [teachersRes, studentsRes, deptsRes, attendanceRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/users?role=teacher`, { headers }),
          fetch(`${import.meta.env.VITE_API_URL}/users?role=student`, { headers }),
          fetch(`${import.meta.env.VITE_API_URL}/departments`, { headers }),
          fetch(`${import.meta.env.VITE_API_URL}/attendance-summary/hod-dashboard`, { headers })
        ]);

        const [teachersData, studentsData, deptsData, attendanceData] = await Promise.all([
          teachersRes.json(), studentsRes.json(), deptsRes.json(), attendanceRes.json()
        ]);

        setDashboardData({
          teachers: teachersData.success ? teachersData.data.length : 0,
          students: studentsData.success ? studentsData.data.length : 0,
          departments: deptsData.success ? deptsData.data.length : 0,
          attendance: attendanceData.success ? attendanceData.data : null,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <AdminHeader />
        <StatCards data={dashboardData} isLoading={isLoading} />
        <QuickActions />
        <div className="flex flex-col lg:flex-row gap-6">
          <AttendanceChart data={dashboardData?.attendance} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default HodDashboardPage;
