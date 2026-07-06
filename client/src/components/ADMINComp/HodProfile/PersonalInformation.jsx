import React from 'react';
const PersonalInformation = ({ user }) => {
  const fullName = user?.firstName + " " + (user?.lastName || "");
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#162b4a]">Personal Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
          <p className="text-gray-900 font-medium">{fullName}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Official Email</label>
          <p className="text-gray-900 font-medium">{user?.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
          <p className="text-gray-900 font-medium">{user?.phone || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
          <p className="text-gray-900 font-medium">{user?.gender || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
          <p className="text-gray-900 font-medium">{user?.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};
export default PersonalInformation;
