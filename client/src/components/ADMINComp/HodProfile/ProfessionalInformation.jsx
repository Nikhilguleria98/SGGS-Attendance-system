import React from 'react';
const ProfessionalInformation = ({ user }) => {
  const departmentName = user?.department?.name || user?.department || 'N/A';
  return (
    <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(22,43,74,0.06)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-brand-blue">Professional Information</h3>
          <p className="mt-1 text-sm text-slate-500">Role-based academic context and assignments.</p>
        </div>
        <div className="rounded-full bg-[#162b4a]/5 px-3 py-1 text-sm font-semibold text-[#162b4a]">Department Lead</div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <label className="mb-1 block text-sm font-medium text-slate-500">Employee ID</label>
          <p className="font-medium text-slate-900">{user?.employeeId || 'N/A'}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <label className="mb-1 block text-sm font-medium text-slate-500">Designation</label>
          <p className="font-medium text-slate-900">{user?.designation || 'Head of Department'}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <label className="mb-1 block text-sm font-medium text-slate-500">Department</label>
          <p className="font-medium text-slate-900">{departmentName}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <label className="mb-1 block text-sm font-medium text-slate-500">Role</label>
          <p className="font-medium capitalize text-slate-900">{user?.role}</p>
        </div>
      </div>
    </div>
  );
};
export default ProfessionalInformation;
