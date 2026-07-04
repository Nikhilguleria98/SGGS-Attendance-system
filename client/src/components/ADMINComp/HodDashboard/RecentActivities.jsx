import React from 'react';
import { User } from 'lucide-react';

const activities = [
  { id: 1, text: 'Teacher Diwakar added', time: '10:30 AM' },
  { id: 2, text: "Department 'ECE' created", time: '11:30 AM' },
  { id: 3, text: 'Student Diwakar added', time: '12:30 AM' },
  { id: 4, text: 'Attendance Marked by Neha Singh', time: '02:00 PM' },
  { id: 5, text: 'Report generated', time: '03:00 PM' },
];

const RecentActivities = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 flex-1 min-w-[300px] flex flex-col">
      <h3 className="text-xl font-bold text-[#162b4a] mb-6">Recent Activities</h3>
      
      <div className="flex-1 space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <User size={20} className="text-gray-400" />
              <span className="text-gray-700">{activity.text}</span>
            </div>
            <span className="text-gray-500 text-sm">{activity.time}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivities;
