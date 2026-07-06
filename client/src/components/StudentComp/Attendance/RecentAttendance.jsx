import {
  FiCheckCircle,
  FiXCircle,
  FiClock,
} from "react-icons/fi";

const attendance = [
  {
    subject: "Database Management",
    time: "Today • 10:00 AM",
    status: "Present",
  },
  {
    subject: "Operating System",
    time: "Yesterday • 11:00 AM",
    status: "Absent",
  },
  {
    subject: "Software Engineering",
    time: "Monday • 09:00 AM",
    status: "Present",
  },
  {
    subject: "Computer Networks",
    time: "Friday • 12:30 PM",
    status: "Present",
  },
];

export default function RecentAttendance() {
  return (
    <div className="bg-white rounded-3xl border border-[#E7EDF5] shadow-[0_4px_20px_rgba(15,23,42,0.06)] p-6">

      <h2 className="text-xl font-bold text-[#17356D]">
        Recent Attendance
      </h2>

      <p className="text-gray-500 mt-1 mb-6">
        Latest attendance records
      </p>

      <div className="space-y-5">

        {attendance.map((item, index) => (

          <div
            key={index}
            className="flex items-start justify-between border-b last:border-none pb-4"
          >

            <div className="flex gap-3">

              <div
                className={`mt-1 ${
                  item.status === "Present"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {item.status === "Present" ? (
                  <FiCheckCircle size={20} />
                ) : (
                  <FiXCircle size={20} />
                )}
              </div>

              <div>

                <h4 className="font-semibold text-slate-700">
                  {item.subject}
                </h4>

                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <FiClock size={14} />
                  {item.time}
                </div>

              </div>

            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold ${
                item.status === "Present"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {item.status}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}