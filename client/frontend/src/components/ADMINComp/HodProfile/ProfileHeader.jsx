import React from 'react';
import { Edit2, BadgeCheck } from 'lucide-react';

const ProfileHeader = ({ onEdit }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex items-center justify-center relative">
      <div className="flex items-center gap-6">
        <div className="relative">
          <img 
            src="https://randomuser.me/api/portraits/men/32.jpg" 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-50"
          />
          <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white" title="Active Status"></div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-[#162b4a]">Dr. Rajesh Kumar</h2>
            <BadgeCheck className="text-blue-500" size={20} />
          </div>
          <p className="text-[#c00021] font-semibold text-lg">Head of Department</p>
          <p className="text-gray-500 text-sm">Department: CSE</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
