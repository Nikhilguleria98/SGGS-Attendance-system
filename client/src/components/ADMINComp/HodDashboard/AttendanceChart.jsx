import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1', percent: 35 },
  { name: '5', percent: 48 },
  { name: '10', percent: 45 },
  { name: '15', percent: 58 },
  { name: '20', percent: 38 },
  { name: '25', percent: 65 },
  { name: '28', percent: 55 },
  { name: '29', percent: 80 },
  { name: '30', percent: 75 },
  { name: '31', percent: 87 }
];

const AttendanceChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 flex-1 min-w-[300px]">
      <h3 className="text-xl font-bold text-[#162b4a] mb-6">Attendance Overview (This Month)</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPercent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c00021" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#c00021" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#162b4a', fontSize: 12 }} dy={10} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#162b4a', fontSize: 12 }} 
              tickFormatter={(value) => `${value}%`}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="percent" 
              stroke="#c00021" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPercent)" 
              activeDot={{ r: 6, fill: '#162b4a' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
