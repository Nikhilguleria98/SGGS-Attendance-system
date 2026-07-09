import React, { useEffect, useState } from "react";

export default function AttendanceCards() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/attendance/student-dashboard`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch attendance records");
        }

        const resData = await response.json();
        setSubjects(resData.data || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-lg font-medium">
        Loading attendance...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-60 text-red-600 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 px-1">
        <h2 className="text-2xl font-bold text-[#17356D]">
          Subject Attendance
        </h2>
        <p className="text-gray-500 mt-1">
          Subject-wise attendance details
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-[1500px] mx-auto">
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          {subjects.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#E7EDF5] shadow-[0_4px_20px_rgba(15,23,42,0.06)] overflow-hidden flex flex-col w-full"
              >
                {/* Title */}
                <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 border-b border-[#EEF2F7]">
                  <h3 className="font-semibold text-[#17356D] leading-snug">
                    {item.subject}
                  </h3>

                  <span className="font-semibold text-slate-700 whitespace-nowrap">
                    {item.subjectCode}
                  </span>
                </div>

                {/* Teacher */}
                <div className="px-5 py-3 space-y-2 border-b border-[#EEF2F7] text-sm">
                  <Row label="Teacher" value={item.teacher} />
                </div>

                {/* Attendance */}
                <div className="px-5 py-3 space-y-2 border-b border-[#EEF2F7] text-sm">
                  <Row label="Delivered" value={item.delivered} />
                  <Row label="Attended" value={item.attended} />
                  <Row label="Absent" value={item.absent} />
                </div>

                {/* Percentage */}
                <div className="px-5 py-3 text-sm">
                  <Row
                    label="Total Percentage"
                    value={`${item.percentage}%`}
                    valueClassName="font-semibold text-[#17356D]"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {!loading && subjects.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No attendance records found.
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, valueClassName = "" }) {
  return (
    <div className="flex items-baseline gap-2 text-slate-600">
      <span className="font-semibold text-slate-700">{label} :</span>
      <span className={valueClassName}>{value}</span>
    </div>
  );
}