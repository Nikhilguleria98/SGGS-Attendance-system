import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { FiTrendingUp as TrendingUp, FiTrendingDown as TrendingDown, FiMinus as Minus } from "react-icons/fi";

export default function AttendanceTrend({ data = [] }) {
  // Compute trend (last week vs previous week)
  let trendPercent = 0;
  let TrendIcon = Minus;
  let trendColor = "text-gray-500 bg-gray-50";
  let trendSign = "";

  if (data.length >= 2) {
    const lastWeek = data[data.length - 1].attendance;
    const prevWeek = data[data.length - 2].attendance;
    if (prevWeek > 0) {
      trendPercent = ((lastWeek - prevWeek) / prevWeek) * 100;
    } else if (lastWeek > 0) {
      trendPercent = 100;
    }
    
    if (trendPercent > 0) {
      TrendIcon = TrendingUp;
      trendColor = "text-green-700 bg-green-50";
      trendSign = "+";
    } else if (trendPercent < 0) {
      TrendIcon = TrendingDown;
      trendColor = "text-red-700 bg-red-50";
    }
  }

  return (
    <div className="bg-white rounded-3xl border border-[#E7EDF5] shadow-[0_4px_20px_rgba(15,23,42,0.06)] p-6 h-full">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold text-[#17356D]">
            Attendance Trend
          </h2>

          <p className="text-gray-500 mt-1">
            Last {data.length || 8} Weeks Performance
          </p>

        </div>

        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${trendColor}`}>

          <TrendIcon size={18} />

          <span className="font-medium">
            {trendSign}{trendPercent.toFixed(1)}%
          </span>

        </div>

      </div>

      {/* Chart */}

      <div className="h-[330px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">

            <AreaChart data={data}>

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
                domain={[0, 100]}
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
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No historical data available.
          </div>
        )}
      </div>

    </div>
  );
}