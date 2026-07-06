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

      <div className="flex flex-col items-center">

        {/* Chart */}

      <div className="relative flex  items-center justify-center w-[320px] h-[320px] shrink-0">

  <PieChart width={320} height={320}>
    <Pie
      data={data}
      dataKey="value"
      cx="50%"
      cy="50%"
      innerRadius={75}
      outerRadius={100}
      paddingAngle={4}
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

  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

    <h2 className="text-5xl font-bold text-[#17356D]">
      {overall}%
    </h2>

    <p className="text-gray-500 mt-1">
      Overall
    </p>

  </div>

</div>

        {/* Legend */}
<div className="w-full max-w-[320px] mt-6 space-y-4">

  {data.map((item) => {
    const percentage = Math.round(
      (item.value / total) * 100
    );

    return (
      <div
        key={item.name}
        className="flex items-center justify-between bg-[#F8FAFC] rounded-xl px-4 py-3"
      >
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: item.color }}
          />

          <span className="text-[15px] font-medium text-[#334155]">
            {item.name}
          </span>
        </div>

        <span className="font-semibold text-[#17356D]">
          {item.value} ({percentage}%)
        </span>
      </div>
    );
  })}

</div>

      </div>

    </div>
  );
}