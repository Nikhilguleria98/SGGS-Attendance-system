import React from "react";

const StatCard = ({ icon, iconBg, iconColor, label, value }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
      <div
        className={`w-14 h-14 flex items-center justify-center rounded-full shrink-0 ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;