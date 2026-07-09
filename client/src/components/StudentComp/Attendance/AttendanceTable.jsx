import React, { useEffect, useState } from "react";

export default function AttendanceCards() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/attendance-summary/student-dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Specific error handling for auth failures
        if (response.status === 401) {
          throw new Error("Session expired. Please log in again.");
        }
        if (response.status === 403) {
          throw new Error("You are not authorized to view this page.");
        }
        if (!response.ok) {
          throw new Error("Failed to fetch attendance records.");
        }

        const resData = await response.json();
        setSubjects(resData.data || []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-lg font-medium text-slate-500">
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

  if (subjects.length === 0) {
    return (
      <div className="flex justify-center items-center h-60 text-gray-400 font-medium">
        No attendance records found.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6 px-1">
        <h2 className="text-2xl font-bold text-[#17356D]">Subject Attendance</h2>
        <p className="text-gray-500 mt-1">Subject-wise attendance details</p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-[1500px] mx-auto">
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
        >
          {subjects.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-[#E7EDF5] shadow-[0_4px_20px_rgba(15,23,42,0.06)] overflow-hidden flex flex-col w-full"
            >
              {/* Subject title + code */}
              <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 border-b border-[#EEF2F7]">
                <h3 className="font-semibold text-[#17356D] leading-snug">
                  {item.subject}
                </h3>
                <span className="font-semibold text-slate-700 whitespace-nowrap">
                  {item.subjectCode}
                </span>
              </div>

              {/* Teacher + Department */}
              <div className="px-5 py-3 space-y-2 border-b border-[#EEF2F7] text-sm">
                <Row label="Teacher"    value={item.teacher}    />
                <Row label="Department" value={item.department} />
              </div>

              {/* Semester / Batch / Section */}
              <div className="px-5 py-3 space-y-2 border-b border-[#EEF2F7] text-sm">
                {item.semester     && <Row label="Semester" value={`Semester ${item.semester}`} />}
                {item.batch        && <Row label="Batch"    value={item.batch}    />}
                {item.section      && <Row label="Section"  value={item.section}  />}
                {item.academicYear && <Row label="Year"     value={item.academicYear} />}
              </div>

              {/* Attendance counters */}
              <div className="px-5 py-3 space-y-2 border-b border-[#EEF2F7] text-sm">
                <Row label="Delivered" value={item.delivered} />
                <Row label="Attended"  value={item.attended}  />
                <Row label="Absent"    value={item.absent}    />
              </div>

              {/* Percentage */}
              <div className="px-5 py-3 text-sm">
                <Row
                  label="Total Percentage"
                  value={`${item.percentage}%`}
                  valueClassName={
                    item.percentage >= 75
                      ? "font-semibold text-green-600"
                      : "font-semibold text-red-500"
                  }
                />
              </div>
            </div>
          ))}
        </div>
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