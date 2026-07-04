import React from "react";
import { CheckCircle, Phone, Mail } from "lucide-react";

const StudentProfile = () => {
  const student = {
    name: "ABD Singh",
    rollNo: "266tgdgd6",
    uid: "UID-2023-12593",

    fatherName: "XYZ Singh",
    motherName: "EFS Kaur",
    bloodGroup: "B+",
    religion: "XXX",
    dob: "00000-00-00",
    category: "GEN",

    address: "XYR, District mmmm, Punjab",

    department: "Computer Science Engineering",
    program: "B.Tech CSE",
    semester: "7",
    section: "23BCS-802",
    university: "Sri Guru Granth Sahib World University",

    mobile: "+91 9417314164",
    email: "ABD@sggswu.edu.in",

    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=500",
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}

        <div className="mb-6">
          <h1 className="text-[34px] font-bold text-[#102B63]">
            Student Profile
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            View your academic and personal information
          </p>
        </div>

        {/* Profile Header */}

        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm h-[220px] flex items-center px-10 mb-8">
          <div className="flex items-center gap-8">
            <div className="relative">
              <img
                src={student.photo}
                alt="student"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />

              <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white"></div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[30px] font-bold text-[#102B63]">
                  {student.name}
                </h2>

                <CheckCircle
                  size={22}
                  className="text-blue-500"
                />
              </div>

              <p className="text-[#D90429] text-lg font-semibold">
                Student
              </p>

              <p className="text-gray-600 text-sm mt-2">
                Department: {student.department}
              </p>

              <p className="text-gray-500 text-sm">
                Roll No: {student.rollNo}
              </p>

              <p className="text-gray-500 text-sm">
                Semester {student.semester}
              </p>
            </div>
          </div>
        </div>

        {/* Main Layout */}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Section */}

          <div className="lg:col-span-2 space-y-6">
            <Card title="Personal Information">
              <InfoGrid
                data={[
                  ["Full Name", student.name],
                  ["Father's Name", student.fatherName],
                  ["Mother's Name", student.motherName],
                  ["Blood Group", student.bloodGroup],
                  ["Religion", student.religion],
                  ["Date of Birth", student.dob],
                  ["Category", student.category],
                  ["Address", student.address],
                ]}
              />
            </Card>

            <Card title="Academic Information">
              <InfoGrid
                data={[
                  ["UID", student.uid],
                  ["Program", student.program],
                  ["Department", student.department],
                  ["Semester", student.semester],
                  ["Section", student.section],
                  ["University", student.university],
                ]}
              />
            </Card>

            <Card title="Qualification Details">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-3 text-left font-semibold">
                        Qualification
                      </th>
                      <th className="p-3 text-left font-semibold">
                        Board
                      </th>
                      <th className="p-3 text-left font-semibold">
                        Year
                      </th>
                      <th className="p-3 text-left font-semibold">
                        Marks
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-t">
                      <td className="p-3">10th</td>
                      <td className="p-3">PSEB</td>
                      <td className="p-3">2021</td>
                      <td className="p-3">100%</td>
                    </tr>

                    <tr className="border-t">
                      <td className="p-3">12th</td>
                      <td className="p-3">PSEB</td>
                      <td className="p-3">2023</td>
                      <td className="p-3">90.6%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Right Section */}

          <div className="space-y-6">
            <Card title="Profile Photo">
              <div className="flex flex-col items-center">
                <img
                  src={student.photo}
                  alt="student"
                  className="w-40 h-40 rounded-full object-cover border-4 border-gray-100"
                />

                <button className="mt-6 w-full bg-[#102B63] hover:bg-[#0E2555] text-white py-3 rounded-xl font-medium transition">
                  View Student Photo
                </button>
              </div>
            </Card>

            <Card title="Contact Information">
              <div className="space-y-5">
                <div className="flex gap-3 items-center">
                  <Phone
                    size={18}
                    className="text-[#102B63]"
                  />

                  <div>
                    <p className="text-xs text-gray-500">
                      Mobile Number
                    </p>

                    <p className="font-semibold text-sm">
                      {student.mobile}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <Mail
                    size={18}
                    className="text-[#102B63]"
                  />

                  <div>
                    <p className="text-xs text-gray-500">
                      Official Email
                    </p>

                    <p className="font-semibold text-sm break-all">
                      {student.email}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Facilities Available">
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Hostel",
                  "Library",
                  "Transport",
                  "Sports",
                  "Medical",
                  "Wi-Fi",
                ].map((item) => (
                  <div
                    key={item}
                    className="bg-gray-50 rounded-xl p-3 text-sm font-medium text-gray-700"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, children }) => (
  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
    <h2 className="text-[20px] font-bold text-[#102B63] mb-6">
      {title}
    </h2>

    {children}
  </div>
);

const InfoGrid = ({ data }) => (
  <div className="grid md:grid-cols-2 gap-y-8 gap-x-16">
    {data.map(([label, value]) => (
      <div key={label}>
        <p className="text-gray-500 text-sm mb-1">
          {label}
        </p>

        <p className="text-[16px] font-semibold text-slate-900">
          {value}
        </p>
      </div>
    ))}
  </div>
);

export default StudentProfile;