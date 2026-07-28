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
          {user?.avatar ? (
          <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-gray-100" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
        )}
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
