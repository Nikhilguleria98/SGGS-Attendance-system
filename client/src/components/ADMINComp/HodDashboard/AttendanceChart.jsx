import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Loader2 } from 'lucide-react';

const COLORS = ['#c00021', '#00529b', '#16b84e', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

const AttendanceChart = ({ data, isLoading }) => {
  const overall = data?.overall;
  const chartRaw = data?.departmentAverage?.length > 0
    ? data.departmentAverage
    : data?.subjectAverage?.length > 0
      ? data.subjectAverage
      : [];

  const chartData = chartRaw.map(d => ({
    name: d.departmentName || d.subjectName || 'Unknown',
    percent: d.percentage
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 flex-1 min-w-[300px] select-none">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#162b4a]">Attendance Overview</h3>
        {overall && (
          <div className="text-right">
            <p className="text-sm text-gray-500">Overall</p>
            <p className="text-2xl font-bold text-[#c00021]">{overall.percentage}%</p>
          </div>
        )}
      </div>
      <div className="h-[300px] w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin text-[#00529b]" size={32} />
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            No attendance data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#162b4a', fontSize: 11 }} angle={-20} textAnchor="end" interval={0} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#162b4a', fontSize: 12 }} tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, 'Attendance']} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
              <Bar dataKey="percent" radius={[6, 6, 0, 0]} maxBarSize={50}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AttendanceChart;
