import React, { useState } from "react";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiUpload,
} from "react-icons/fi";

const StudentList = () => {
  const [students] = useState([
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
  ]);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="bg-white rounded-xl shadow-sm border p-6">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Students - CSE 3rd Year - Section A
          </h1>

          <div className="flex gap-4">

            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition">
              <FiPlus />
              Add Student
            </button>

            <button className="flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              <FiUpload />
              Import Students
            </button>

          </div>
        </div>

        {/* Search */}

        <div className="flex gap-6 mb-8">

          <div className="relative w-96">
            <FiSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search student..."
              className="w-full border rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select className="border rounded-lg px-4 py-3 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>CSE 3rd Year - Section A</option>
            <option>CSE 3rd Year - Section B</option>
            <option>CSE 2nd Year - Section A</option>
          </select>

        </div>

        {/* Table */}

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-gray-50 border-y">

                <th className="py-4 px-4 text-left">#</th>

                <th className="py-4 px-4 text-left">Roll No.</th>

                <th className="py-4 px-4 text-left">Name</th>

                <th className="py-4 px-4 text-left">Email</th>

                <th className="py-4 px-4 text-left">Phone</th>

                <th className="py-4 px-4 text-center">Action</th>

              </tr>

            </thead>

            <tbody>

              {students.map((student, index) => (
                <tr
                  key={student.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-5 px-4">{index + 1}</td>

                  <td className="py-5 px-4 font-medium">
                    {student.roll}
                  </td>

                  <td className="py-5 px-4">
                    {student.name}
                  </td>

                  <td className="py-5 px-4">
                    {student.email}
                  </td>

                  <td className="py-5 px-4">
                    {student.phone}
                  </td>

                  <td className="py-5 px-4">

                    <div className="flex justify-center gap-5">

                      <button className="text-blue-600 hover:text-blue-800 text-xl">
                        <FiEdit2 />
                      </button>

                      <button className="text-red-500 hover:text-red-700 text-xl">
                        <FiTrash2 />
                      </button>

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default StudentList;