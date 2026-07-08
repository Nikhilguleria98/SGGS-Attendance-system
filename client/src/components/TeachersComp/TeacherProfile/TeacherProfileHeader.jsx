import React from 'react';
import { Edit2, BadgeCheck } from 'lucide-react';

const TeacherProfileHeader = ({ user, onEdit }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex items-center justify-center relative">
      <div className="flex items-center gap-6">
        <div className="relative">
          <img 
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName || ''}&background=random`}
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-50"
          />
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-[#162b4a]">{user?.firstName} {user?.lastName || ''}</h2>
          </div>
          <p className="text-[#c00021] font-semibold text-lg">{user?.designation || (user?.role === 'hod' ? 'Head of Department' : 'Teacher')}</p>
          <p className="text-gray-500 text-sm">Department: {user?.department?.name || 'CSE'}</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileHeader;
