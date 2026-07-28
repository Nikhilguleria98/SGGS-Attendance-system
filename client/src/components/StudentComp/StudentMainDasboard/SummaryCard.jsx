import React from "react";

const colors = {
  green: {
    bg: "bg-green-50",
    icon: "text-green-600",
    value: "text-green-600",
  },

  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    value: "text-blue-600",
  },

  red: {
    bg: "bg-red-50",
    icon: "text-red-500",
    value: "text-red-500",
  },

  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-500",
    value: "text-orange-500",
  },

  yellow: {
    bg: "bg-yellow-50",
    icon: "text-yellow-600",
    value: "text-yellow-600",
  },

  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
    value: "text-purple-600",
  },
};

export default function SummaryCard({
  title,
  value,
  subtitle,
  icon,
  color = "blue",
}) {
  // Fallback to blue if an invalid color is passed
  const theme = colors[color] || colors.blue;

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-[#E7EDF5]
        shadow-[0_4px_20px_rgba(15,23,42,0.06)]
        hover:shadow-[0_8px_30px_rgba(15,23,42,0.12)]
        transition-all
        duration-300
        p-6
      "
    >
      <div className="flex items-start justify-between">
        <div
          className={`
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            ${theme.bg}
          `}
        >
          <div className={`text-3xl ${theme.icon}`}>{icon}</div>
        </div>
      </div>

      <h4 className="mt-5 text-[18px] font-semibold text-[#334155]">
        {title}
      </h4>

      <h2 className={`mt-2 text-[42px] font-bold ${theme.value}`}>
        {value}
      </h2>

      <p className="mt-3 text-[15px] text-[#64748B]">
        {subtitle}
      </p>
    </div>
  );
}