import React from 'react';

const AttendanceTable = ({ students, attendanceData, handleStatusChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-700">
          <thead className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 w-20">S.No</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Roll No</th>
              <th className="px-6 py-4 w-64 text-center">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No students found for this filter.
                </td>
              </tr>
            ) : (
              students.map((student, index) => {
                const status = attendanceData[student._id];
                return (
                  <tr key={student._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-medium">{student.firstName} {student.lastName || ''}</td>
                    <td className="px-6 py-4 text-gray-500">{student.rollNo || '-'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-4">
                        <button 
                          onClick={() => handleStatusChange(student._id, 'present')}
                          className={`px-6 py-2 rounded-lg font-medium transition-all ${
                            status === 'present' 
                              ? 'bg-green-50 text-green-600 border border-green-200' 
                              : 'border border-gray-300 text-green-600 hover:bg-green-50'
                          }`}
                        >
                          Present
                        </button>
                        <button 
                          onClick={() => handleStatusChange(student._id, 'absent')}
                          className={`px-6 py-2 rounded-lg font-medium transition-all ${
                            status === 'absent' 
                              ? 'bg-[#c00021] text-white border border-[#c00021]' 
                              : 'border border-gray-300 text-[#c00021] hover:bg-red-50'
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
