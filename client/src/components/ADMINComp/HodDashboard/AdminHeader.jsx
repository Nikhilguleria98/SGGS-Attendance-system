import React, { useState, useEffect } from 'react';
import { User, ChevronDown } from 'lucide-react';

const AdminHeader = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const fullName = user 
    ? (user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user.name) || 'Admin'
    : 'Loading...';
  const roleDisplay = user?.designation || user?.role || 'Head of Department';

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <p className="text-sm text-[#c00021] font-medium">Welcome Back,</p>
        <h1 className="text-2xl font-bold text-[#162b4a]">{fullName}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="hidden sm:block text-sm">
            <p className="font-semibold text-gray-800">{fullName}</p>
            <p className="text-xs text-gray-500 capitalize">
              {roleDisplay}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
