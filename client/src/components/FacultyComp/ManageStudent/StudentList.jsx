import React, { useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiUpload,
  FiEdit2,
  FiTrash2,
  FiChevronDown,
} from "react-icons/fi";

const StudentList = () => {
  const [search, setSearch] = useState("");

  const students = [
  {
    id: 1,
    roll: "CS301",
    name: "Amit Kumar",
    email: "amit.cs301@college.edu.in",
    phone: "9876543210",
  },
  {
    id: 2,
    roll: "CS302",
    name: "Sana Khan",
    email: "sana.cs302@college.edu.in",
    phone: "9876543211",
  },
  {
    id: 3,
    roll: "CS303",
    name: "Rohit Yadav",
    email: "rohit.cs303@college.edu.in",
    phone: "9876543212",
  },
  {
    id: 4,
    roll: "CS304",
    name: "Pooja Sharma",
    email: "pooja.cs304@college.edu.in",
    phone: "9876543213",
  },
  {
    id: 5,
    roll: "CS305",
    name: "Vivek Maurya",
    email: "vivek.cs305@college.edu.in",
    phone: "9876543214",
  },
];

  return (
    <div className="w-full rounded-2xl bg-white border border-[#E2E8F0] shadow-[0_2px_12px_rgba(15,23,42,0.06)] p-10">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-[34px] font-bold text-[#0F172A] leading-none">
          Students - CSE 3rd Year - Section A
        </h1>

        <div className="flex gap-4">

          <button className="flex items-center gap-2 h-12 px-7 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-semibold shadow-sm transition-all duration-200">

    <FiPlus size={18} />

    Add Student

</button>

          <button className="flex items-center gap-2 h-12 px-7 rounded-xl border border-[#CBD5E1] bg-white text-[#2563EB] font-semibold hover:bg-[#F8FAFC] transition-all">

    <FiUpload size={18} />

    Import Students

</button>

        </div>

      </div>

      {/* Search & Dropdown */}

      <div className="flex items-center gap-6 mb-8">

        <div className="relative w-[400px]">

          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <input
    type="text"
    placeholder="Search student..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full h-12 rounded-xl border border-[#CBD5E1] bg-white pl-12 pr-4 text-[15px] text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
/>

        </div>

        <div className="relative w-[270px]">

    <select className="appearance-none w-full h-12 rounded-xl border border-[#CBD5E1] bg-white px-5 text-[15px] text-slate-700 outline-none cursor-pointer focus:border-blue-500 focus:ring-4 focus:ring-blue-100">

        <option>CSE 3rd Year - Section A</option>

    </select>

    <FiChevronDown
        size={18}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
    />

</div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-200">

        <table className="w-full">

          <thead className="bg-[#F8FAFC]">

            <tr>

              <th className="px-6 py-5 text-left text-[15px] font-semibold tracking-wide text-[#334155]">
                #
              </th>

              <th className="px-6 py-5 text-left text-[15px] font-semibold tracking-wide text-[#334155]">
                Roll No.
              </th>

              <th className="px-6 py-5 text-left text-[15px] font-semibold tracking-wide text-[#334155]">
                Name
              </th>

              <th className="px-6 py-5 text-left text-[15px] font-semibold tracking-wide text-[#334155]">
                Email
              </th>

              <th className="px-6 py-5 text-left text-[15px] font-semibold tracking-wide text-[#334155]">
                Phone
              </th>

              <th className="px-6 py-5 text-center text-[15px] font-semibold tracking-wide text-[#334155]">
                Action
              </th>

            </tr>

          </thead>

          <tbody className="bg-white">

  {students.map((student, index) => (

    <tr
      key={student.id}
      className="border-t border-[#E2E8F0] hover:bg-[#F8FAFC] transition duration-200"
    >

      <td className="px-6 py-6 text-[15px] text-slate-700">
        {index + 1}
      </td>

      <td className="px-6 py-6">

        <span className="font-semibold text-[#0F172A]">
          {student.roll}
        </span>

      </td>

      <td className="px-6 py-6">

        <span className="font-medium text-[#334155]">
          {student.name}
        </span>

      </td>

      <td className="px-6 py-6">

        <span className="text-slate-600">
          {student.email}
        </span>

      </td>

      <td className="px-6 py-6">

        <span className="text-[#475569]">
          {student.phone}
        </span>

      </td>

      <td className="px-6 py-6">

        <div className="flex justify-center items-center gap-5">

          <button
            className="text-indigo-600 hover:text-indigo-800 hover:scale-110 transition-all"
          >
            <FiEdit2 className="text-[#4F46E5]" size={19} />
          </button>

          <button
            className="text-red-500 hover:text-red-700 hover:scale-110 active:scale-95 transition-all duration-200 "
          >
            <FiTrash2 className="text-[#EF4444]" size={19} />
          </button>

        </div>

      </td>

    </tr>

  ))}

</tbody>

        </table>

      </div>

    </div>
  );
};

export default StudentList;