import React from 'react';
const ProfessionalInformation = ({ user }) => {
  const departmentName = user?.department?.name || user?.department || 'N/A';
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#162b4a]">Professional Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Employee ID</label>
          <p className="text-gray-900 font-medium">{user?.employeeId || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Designation</label>
          <p className="text-gray-900 font-medium">{user?.designation || 'Head of Department'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Department</label>
          <p className="text-gray-900 font-medium">{departmentName}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Role</label>
          <p className="text-gray-900 font-medium capitalize">{user?.role}</p>
        </div>
      </div>
    </div>
  );
};
export default ProfessionalInformation;
