import React from 'react';
import { User, ChevronDown } from 'lucide-react';

const AdminHeader = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <p className="text-sm text-[#c00021] font-medium">Welcome Back,</p>
        <h1 className="text-2xl font-bold text-[#162b4a]">Dr. Rajesh Kumar</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="hidden sm:block text-sm">
            <p className="font-semibold text-gray-800">Dr. Rajesh Kumar</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              HOD - CSE <ChevronDown size={14} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
