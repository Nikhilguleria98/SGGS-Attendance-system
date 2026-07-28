import React from 'react';
import AdminHeader from '../../components/ADMINComp/HodDashboard/AdminHeader';
import StatCards from '../../components/ADMINComp/HodDashboard/StatCards';
import AttendanceChart from '../../components/ADMINComp/HodDashboard/AttendanceChart';

import QuickActions from '../../components/ADMINComp/HodDashboard/QuickActions';

const HodDashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <AdminHeader />
        <StatCards />
        <QuickActions />

        <div className="flex flex-col lg:flex-row gap-6">
          <AttendanceChart />
         
        </div>
      </div>
    </div>
  );
};

export default HodDashboardPage;
