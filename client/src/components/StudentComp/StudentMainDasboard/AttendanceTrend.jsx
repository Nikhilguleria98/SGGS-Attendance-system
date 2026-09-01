import { useMemo } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { TrendingUp } from "lucide-react";

const COLORS = ['#2563EB', '#c00021', '#16b84e', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

export default function AttendanceTrend({ summaries = [] }) {
  const { chartData, trend } = useMemo(() => {
    const data = summaries.map((s) => ({
      name: s.subject || "N/A",
      percent: s.percentage || 0,
    }));

    // Calculate trend: compare first half vs second half average
    let trendPercent = 0;
    if (data.length >= 2) {
      const mid = Math.floor(data.length / 2);
      const firstHalf = data.slice(0, mid);
      const secondHalf = data.slice(mid);
      const avgFirst = firstHalf.reduce((s, d) => s + d.percent, 0) / (firstHalf.length || 1);
      const avgSecond = secondHalf.reduce((s, d) => s + d.percent, 0) / (secondHalf.length || 1);
      trendPercent = parseFloat((avgSecond - avgFirst).toFixed(1));
    }

    return { chartData: data, trend: trendPercent };
  }, [summaries]);

  return (
    <div className="bg-white rounded-3xl border border-[#E7EDF5] shadow-[0_4px_20px_rgba(15,23,42,0.06)] p-6 h-full select-none">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#17356D]">Attendance Trend</h2>
          <p className="text-gray-500 mt-1">Subject-wise Performance</p>
        </div>
        {trend !== 0 && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${trend > 0 ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}`}>
            <TrendingUp size={18} className={trend < 0 ? 'rotate-180' : ''} />
            <span className="font-medium">{trend > 0 ? '+' : ''}{trend}%</span>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="h-[330px]">
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            No attendance data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
              <CartesianGrid stroke="#E2E8F0" strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "#64748B", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                angle={-20}
                textAnchor="end"
                interval={0}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "#64748B", fontSize: 13 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, 'Attendance']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
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
}
