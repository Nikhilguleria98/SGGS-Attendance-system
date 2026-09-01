import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = { present: "#22C55E", absent: "#EF4444" };

export default function AttendanceOverview({ summaries = [] }) {
  const { present, absent, overall } = useMemo(() => {
    const totalAttended = summaries.reduce((sum, s) => sum + (s.attended || 0), 0);
    const totalAbsent = summaries.reduce((sum, s) => sum + (s.absent || 0), 0);
    const total = totalAttended + totalAbsent;
    const pct = total > 0 ? Math.round((totalAttended / total) * 100) : 0;
    return { present: totalAttended, absent: totalAbsent, overall: pct };
  }, [summaries]);

  const chartData = [
    { name: "Present", value: present, color: COLORS.present },
    { name: "Absent", value: absent, color: COLORS.absent },
  ];

  return (
    <div className="bg-white rounded-3xl border border-[#E7EDF5] shadow-[0_4px_20px_rgba(15,23,42,0.06)] p-6 h-full">
      <h2 className="text-[24px] font-bold text-[#17356D] mb-6">Attendance Overview</h2>

      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center w-full max-w-[320px] aspect-square shrink-0 mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" cx="50%" cy="50%" innerRadius={75} outerRadius={100} paddingAngle={4} stroke="none">
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <h2 className="text-3xl sm:text-5xl font-bold text-[#17356D]">{overall}%</h2>
            <p className="text-gray-500 mt-1">Overall</p>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full max-w-[320px] mt-6 space-y-4">
          {chartData.map((item) => {
            const total = present + absent;
            const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
            return (
              <div key={item.name} className="flex items-center justify-between bg-[#F8FAFC] rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                  <span className="text-[15px] font-medium text-[#334155]">{item.name}</span>
                </div>
                <span className="font-semibold text-[#17356D]">{item.value} ({percentage}%)</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
