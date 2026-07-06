import React, { useState, useEffect } from 'react';
import { Users, Building2, GraduationCap, TrendingUp } from 'lucide-react';

const StatCard = ({ title, count, icon: Icon, iconColor }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-[#162b4a] font-medium mb-1">{title}</span>
        <span className="text-4xl font-black text-[#c00021]">{count}</span>
      </div>
      <div className={`p-4 rounded-full flex items-center justify-center ${iconColor}`}>
        <Icon size={40} className="stroke-current" />
      </div>
    </div>
  );
};

const StatCards = () => {
  const [counts, setCounts] = useState({
    teachers: '...',
    departments: '...',
    students: '...',
    attendance: '80%' // Mocked for now until attendance is hooked up
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [teachersRes, studentsRes, deptsRes] = await Promise.all([
          fetch("http://localhost:3000/api/users?role=teacher", { headers }),
          fetch("http://localhost:3000/api/users?role=student", { headers }),
          fetch("http://localhost:3000/api/departments", { headers })
        ]);

        const [teachersData, studentsData, deptsData] = await Promise.all([
          teachersRes.json(),
          studentsRes.json(),
          deptsRes.json()
        ]);

        setCounts(prev => ({
          ...prev,
          teachers: teachersData.success ? teachersData.data.length : '0',
          students: studentsData.success ? studentsData.data.length : '0',
          departments: deptsData.success ? deptsData.data.length : '0'
        }));
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { title: 'Teachers', count: counts.teachers, icon: Users, color: 'text-[#c00021] bg-[#c00021]/10' },
    { title: 'Department', count: counts.departments, icon: Building2, color: 'text-[#162b4a] bg-[#162b4a]/10' },
    { title: 'Students', count: counts.students, icon: GraduationCap, color: 'text-[#c00021] bg-[#c00021]/10' },
    { title: 'Attendance Today', count: counts.attendance, icon: TrendingUp, color: 'text-[#162b4a] bg-[#162b4a]/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          count={stat.count}
          icon={stat.icon}
          iconColor={stat.color}
        />
      ))}
    </div>
  );
};

export default StatCards;
