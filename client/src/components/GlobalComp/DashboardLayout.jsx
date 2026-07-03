import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const DashboardLayout = ({ role }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f3f4f6] overflow-hidden">
      <Sidebar 
        role={role} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      <main className="flex-1 flex flex-col overflow-hidden relative min-w-0">
        {/* Mobile Header for Sidebar Toggle */}
        <div className="lg:hidden h-16 bg-white border-b flex items-center px-4 shadow-sm z-10 shrink-0">
          <button 
            onClick={() => setIsMobileOpen(true)} 
            className="p-2 -ml-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu size={24} className="text-gray-700" />
          </button>
          <span className="ml-4 font-bold text-gray-900">SGGS Dashboard</span>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-[#f8f9fa]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
