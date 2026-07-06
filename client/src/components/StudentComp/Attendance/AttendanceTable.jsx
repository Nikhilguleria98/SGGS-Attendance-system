import { useState } from "react";
import { FiFilter } from "react-icons/fi";

const subjects = [
  {
    id: 1,
    subject: "Data Structures",
    faculty: "Dr. Aman Sharma",
    delivered: 45,
    attended: 43,
    percentage: 95,
  },
  {
    id: 2,
    subject: "Database Management",
    faculty: "Dr. Rahul Mehta",
    delivered: 40,
    attended: 36,
    percentage: 90,
  },
  {
    id: 3,
    subject: "Operating System",
    faculty: "Dr. Priya Singh",
    delivered: 42,
    attended: 32,
    percentage: 76,
  },
  {
    id: 4,
    subject: "Computer Networks",
    faculty: "Dr. Karan Gupta",
    delivered: 38,
    attended: 24,
    percentage: 63,
  },
  {
    id: 5,
    subject: "Software Engineering",
    faculty: "Dr. Neha Verma",
    delivered: 39,
    attended: 38,
    percentage: 97,
  },
];

const getStatus = (value) => {
  if (value >= 90)
    return {
      text: "Excellent",
      bg: "bg-green-100",
      color: "text-green-700",
    };

  if (value >= 75)
    return {
      text: "Good",
      bg: "bg-blue-100",
      color: "text-blue-700",
    };

  return {
    text: "Low",
    bg: "bg-red-100",
    color: "text-red-700",
  };
};

export default function AttendanceTable() {
 

  
  return (
    <div className="bg-white rounded-3xl border border-[#E7EDF5] shadow-[0_4px_20px_rgba(15,23,42,0.06)]">

      {/* Header */}

      <div className="flex justify-between items-center p-6 border-b border-[#E7EDF5]">

        <div>

          <h2 className="text-2xl font-bold text-[#17356D]">
            Subject Attendance
          </h2>

          <p className="text-gray-500 mt-1">
            Subject-wise attendance details
          </p>

        </div>

       <div className="flex items-center gap-4">

    <button className="flex items-center gap-2 h-11 px-5 rounded-xl border border-[#E2E8F0] hover:bg-gray-50 transition">

        <FiFilter />

        Filter

    </button>

</div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-[#F8FAFC]">

            <tr>

              <th className="px-6 py-4 text-left text-slate-600">
                Subject
              </th>

              <th className="px-6 py-4 text-left text-slate-600">
                Faculty
              </th>

              <th className="px-6 py-4 text-center text-slate-600">
                Delivered
              </th>

              <th className="px-6 py-4 text-center text-slate-600">
                Attended
              </th>

              <th className="px-6 py-4 text-center text-slate-600">
                %
              </th>

              <th className="px-6 py-4 text-center text-slate-600">
                Status
              </th>

              

            </tr>

          </thead>

          <tbody>

            {subjects.map((item) => {

              const status = getStatus(
                item.percentage
              );

              return (
                <tr
                  key={item.id}
                  className="border-t hover:bg-[#F8FAFC] transition"
                >

                  <td className="px-6 py-5 font-semibold text-slate-700">
                    {item.subject}
                  </td>

                  <td className="px-6 py-5 text-slate-600">
                    {item.faculty}
                  </td>

                  <td className="px-6 py-5 text-center">
                    {item.delivered}
                  </td>

                  <td className="px-6 py-5 text-center">
                    {item.attended}
                  </td>

                  <td className="px-6 py-5 text-center font-semibold">
                    {item.percentage}%
                  </td>

                  <td className="px-6 py-5 text-center">

                    <span
                      className={`${status.bg} ${status.color} px-4 py-2 rounded-full text-sm font-semibold`}
                    >
                      {status.text}
                    </span>

                  </td>

                  

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}