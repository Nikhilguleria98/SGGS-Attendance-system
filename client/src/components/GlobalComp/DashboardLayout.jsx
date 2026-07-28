import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const DashboardLayout = ({ role }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(192,0,33,0.10),_transparent_35%),linear-gradient(135deg,_#f8fafc_0%,_#eef4ff_55%,_#fff7f8_100%)]">
      <Sidebar
        role={role}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="z-10 flex h-16 shrink-0 items-center border-b border-slate-200/80 bg-white/80 px-4 shadow-sm backdrop-blur lg:hidden">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="-ml-2 rounded-lg p-2 transition-colors hover:bg-slate-100"
          >
            <Menu size={24} className="text-slate-700" />
          </button>
          <span className="ml-4 text-base font-semibold text-slate-900">SGGS Dashboard</span>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="mx-auto w-full max-w-7xl p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
