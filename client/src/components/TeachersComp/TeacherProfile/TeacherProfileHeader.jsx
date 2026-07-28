import React from 'react';
import { BadgeCheck, Mail, Phone, Building2 } from 'lucide-react';

const TeacherProfileHeader = ({ user }) => {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-[linear-gradient(135deg,_#ffffff_0%,_#f8fbff_100%)] p-6 shadow-[0_20px_60px_rgba(22,43,74,0.08)] md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName || ''}&background=random`}
              alt="Profile"
              className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <div className="absolute bottom-0 right-0 rounded-full bg-[#c00021] p-1.5 text-white shadow-sm">
              <BadgeCheck size={14} />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#162b4a]">{user?.firstName} {user?.lastName || ''}</h2>
            <p className="mt-1 text-lg font-semibold text-[#c00021]">{user?.designation || (user?.role === 'hod' ? 'Head of Department' : 'Teacher')}</p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1"><Building2 size={14} /> {user?.department?.name || 'CSE'}</span>
              <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1"><Mail size={14} /> {user?.email || 'N/A'}</span>
              <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1"><Phone size={14} /> {user?.phone || 'N/A'}</span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-[#162b4a]/10 bg-[#162b4a]/5 px-4 py-3 text-sm font-medium text-[#162b4a]">
          {user?.role === 'hod' ? 'Department Head' : 'Teaching Faculty'}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileHeader;
