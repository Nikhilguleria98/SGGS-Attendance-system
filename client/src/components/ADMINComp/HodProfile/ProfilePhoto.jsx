import React from 'react';
import { Camera } from 'lucide-react';
const ProfilePhoto = ({ user }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
      <div className="relative group">
        <div className="w-32 h-32 rounded-full border-4 border-gray-50 overflow-hidden bg-gray-100">
          <img src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
      <h3 className="mt-4 font-bold text-gray-900">{user?.firstName} {user?.lastName}</h3>
      <p className="text-sm text-gray-500">{user?.designation || 'Head of Department'}</p>
    </div>
  );
};
export default ProfilePhoto;
