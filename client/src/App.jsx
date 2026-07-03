import React from 'react';
import { Routes, Route } from 'react-router-dom';

import DashboardLayout from './components/GlobalComp/DashboardLayout';
import PublicLayout from './components/GlobalComp/PublicLayout';

import HodDashboardPage from './Pages/ADMINpages/HodDashboardPage';
import ManageTeachers from './Pages/ADMINpages/ManageTeachers';
import CreateDepartment from './Pages/ADMINpages/createDepartment';

import Landingpage from './Pages/Defaultpages/Landingpage';
import Aboutuspage from './Pages/Defaultpages/Aboutuspage';
import Contactuspage from './Pages/Defaultpages/Contactuspage';
import TeacherHome from './Pages/Teacherspages/TeacherHome';
import TeacherDashboard from './components/TeachersComp/TeacherDashboard';
import ProfilePage from './Pages/ADMINpages/ProfilePage';

const App = () => {
  return (
    <Routes>
      {/* HOD Routes */}
      <Route path="/hod" element={<DashboardLayout role="hod" />}>
        <Route path="dashboard"         element={<HodDashboardPage />} />
        <Route path="teachers"          element={<ManageTeachers />} />
        <Route path="departments"       element={<CreateDepartment />} />
        <Route path="students"          element={<div className="p-8"><h1 className="text-2xl font-bold">Manage Students</h1><p className="text-gray-500 mt-2">Coming Soon</p></div>} />
        <Route path="profile"           element={<ProfilePage />} />
      </Route>

      {/* Teacher Routes */}
      <Route path="/teacher" element={<DashboardLayout role="teacher" />}>
        <Route path="dashboard"         element={<TeacherDashboard />} />
        <Route path="managestudent"         element={<TeacherHome />} />
        <Route path="teacherdashboard"   element={<TeacherDashboard />} />
        <Route path="attendance"        element={<div className="p-8"><h1 className="text-2xl font-bold">Mark Attendance</h1></div>} />
        <Route path="reports"           element={<div className="p-8"><h1 className="text-2xl font-bold">Attendance Reports</h1></div>} />
        <Route path="profile"           element={<div className="p-8"><h1 className="text-2xl font-bold">Teacher Profile</h1></div>} />
      </Route>

      {/* Student Routes */}
      <Route path="/student" element={<DashboardLayout role="student" />}>
        <Route path="dashboard"         element={<div className="p-8"><h1 className="text-2xl font-bold">Student Dashboard</h1></div>} />
        <Route path="attendance"        element={<div className="p-8"><h1 className="text-2xl font-bold">My Attendance</h1></div>} />
        <Route path="profile"           element={<div className="p-8"><h1 className="text-2xl font-bold">Student Profile</h1></div>} />
      </Route>

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/"           element={<Landingpage />} />
        <Route path="/about-us"   element={<Aboutuspage />} />
        <Route path="/contact-us" element={<Contactuspage />} />
      </Route>
    </Routes>
  );
};

export default App;