import React from 'react';
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
  const stats = [
    { title: 'Teachers', count: '20', icon: Users, color: 'text-[#c00021] bg-[#c00021]/10' },
    { title: 'Department', count: '6', icon: Building2, color: 'text-[#162b4a] bg-[#162b4a]/10' },
    { title: 'Students', count: '400', icon: GraduationCap, color: 'text-[#c00021] bg-[#c00021]/10' },
    { title: 'Attendance Today', count: '80%', icon: TrendingUp, color: 'text-[#162b4a] bg-[#162b4a]/10' },
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
