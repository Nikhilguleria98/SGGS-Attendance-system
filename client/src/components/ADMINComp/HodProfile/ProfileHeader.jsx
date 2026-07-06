import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
const ProfileHeader = ({ user, onEdit }) => {
  const fullName = user?.firstName + " " + (user?.lastName || "");
  const departmentName = user?.department?.name || user?.department || 'N/A';
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-2xl font-bold text-[#162b4a]">{fullName}</h2>
        <p className="text-[#c00021] font-medium">{user?.designation || 'Head of Department'}</p>
        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
          <span className="flex items-center gap-1.5"><Mail size={16} /> {user?.email}</span>
          <span className="flex items-center gap-1.5"><Phone size={16} /> {user?.phone || 'N/A'}</span>
          <span className="flex items-center gap-1.5"><MapPin size={16} /> {departmentName}</span>
        </div>
      </div>
    </div>
  );
};
export default ProfileHeader;
