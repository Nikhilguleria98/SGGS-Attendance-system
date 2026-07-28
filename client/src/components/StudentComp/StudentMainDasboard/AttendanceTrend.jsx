import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { FiTrendingUp } from "react-icons/fi";

const attendanceData = [
  { week: "Week 1", attendance: 76 },
  { week: "Week 2", attendance: 82 },
  { week: "Week 3", attendance: 79 },
  { week: "Week 4", attendance: 86 },
  { week: "Week 5", attendance: 88 },
  { week: "Week 6", attendance: 84 },
  { week: "Week 7", attendance: 91 },
  { week: "Week 8", attendance: 89 },
];

export default function AttendanceTrend() {
  return (
    <div className="bg-white rounded-3xl border border-[#E7EDF5] shadow-[0_4px_20px_rgba(15,23,42,0.06)] p-6 h-full">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-[#17356D]">
            Attendance Trend
          </h2>

          <p className="text-gray-500 mt-1">
            Last 8 Weeks Performance
          </p>

        </div>

        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl">

          <FiTrendingUp size={18} />

          <span className="font-medium">
            +4.8%
          </span>

        </div>

      </div>

      {/* Chart */}

      <div className="h-[330px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={attendanceData}>

            <defs>

              <linearGradient
                id="attendanceFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#2563EB"
                  stopOpacity={0.35}
                />

                <stop
                  offset="95%"
                  stopColor="#2563EB"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#E2E8F0"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="week"
              tick={{
                fill: "#64748B",
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[60, 100]}
              tick={{
                fill: "#64748B",
                fontSize: 13,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="attendance"
              stroke="#2563EB"
              strokeWidth={4}
              fill="url(#attendanceFill)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}