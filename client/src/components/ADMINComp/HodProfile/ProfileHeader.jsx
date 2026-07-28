import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

const ProfileHeader = ({ user }) => {
  const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'HOD Profile';
  const departmentName = user?.department?.name || user?.department || 'N/A';

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-[linear-gradient(135deg,_#162b4a_0%,_#0f1d33_100%)] p-6 text-white shadow-[0_20px_60px_rgba(22,43,74,0.16)] md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white/90">
            <ShieldCheck size={16} />
            Verified Academic Leadership
          </div>
          <h2 className="text-3xl font-bold tracking-tight">{fullName}</h2>
          <p className="mt-2 text-lg font-semibold text-[#f7c7c7]">{user?.designation || 'Head of Department'}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-200">
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2"><Mail size={15} /> {user?.email || 'N/A'}</span>
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2"><Phone size={15} /> {user?.phone || 'N/A'}</span>
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2"><MapPin size={15} /> {departmentName}</span>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-100">
          <div className="font-semibold">Role</div>
          <div className="mt-1 capitalize text-white">{user?.role || 'hod'}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
