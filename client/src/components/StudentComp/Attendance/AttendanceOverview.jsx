import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Present",
    value: 89,
    color: "#22C55E",
  },
  {
    name: "Absent",
    value: 17,
    color: "#EF4444",
  },
  {
    name: "Medical Leave",
    value: 1,
    color: "#F59E0B",
  },
  {
    name: "Duty Leave",
    value: 1,
    color: "#3B82F6",
  },
];

const total = data.reduce((sum, item) => sum + item.value, 0);

const overall = Math.round((89 / total) * 100);

export default function AttendanceOverview() {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      border-[#E7EDF5]
      shadow-[0_4px_20px_rgba(15,23,42,0.06)]
      p-6
      h-full
      "
    >
      <h2 className="text-[24px] font-bold text-[#17356D] mb-6">
        Attendance Overview
      </h2>

      <div className="flex items-center justify-between">

        {/* Chart */}

        <div className="relative w-[230px] h-[230px]">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={data}
                innerRadius={75}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                  />
                ))}
              </Pie>

            </PieChart>
          </ResponsiveContainer>

          {/* Center */}

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <h2 className="text-5xl font-bold text-[#17356D]">
              {overall}%
            </h2>

            <p className="text-gray-500 mt-1">
              Overall
            </p>

          </div>

        </div>

        {/* Legend */}

        <div className="space-y-6">

          {data.map((item) => {

            const percentage = Math.round(
              (item.value / total) * 100
            );

            return (
              <div
                key={item.name}
                className="flex items-center justify-between gap-8 min-w-[220px]"
              >
                <div className="flex items-center gap-3">

                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: item.color,
                    }}
                  ></span>

                  <span className="text-[16px] text-[#334155]">
                    {item.name}
                  </span>

                </div>

                <span className="font-semibold text-[#17356D]">
                  {percentage}% ({item.value})
                </span>

              </div>
            );

          })}

        </div>

      </div>

    </div>
  );
}