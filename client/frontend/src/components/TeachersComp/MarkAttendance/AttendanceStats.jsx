import React from 'react';
import { Users, CheckCircle, XCircle } from 'lucide-react';

const AttendanceStats = ({ total, present, absent }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center gap-4 shadow-sm">
        <div className="p-3 rounded-full bg-green-100 text-green-600">
          <Users size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Total Students</p>
          <p className="text-2xl font-bold text-gray-800">{total}</p>
        </div>
      </div>
      
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center gap-4 shadow-sm">
        <div className="p-3 rounded-full bg-green-100 text-green-600">
          <CheckCircle size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Present</p>
          <p className="text-2xl font-bold text-gray-800">{present}</p>
        </div>
      </div>
      
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center gap-4 shadow-sm">
        <div className="p-3 rounded-full bg-red-100 text-red-600">
          <XCircle size={24} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Absent</p>
          <p className="text-2xl font-bold text-gray-800">{absent}</p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceStats;
