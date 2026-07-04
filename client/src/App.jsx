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
import MarkAttendance from './components/TeachersComp/MarkAttendance/MarkAttendance';
import ProfilePage from './Pages/ADMINpages/ProfilePage';
import ManageStudentsPage from './Pages/ADMINpages/ManageStudentsPage';
import TeacherProfile from './Pages/Teacherspages/TeacherProfile';
import StudentProfile from './components/StudentComp/profile';

const App = () => {
  return (
    <Routes>
      {/* HOD Routes */}
      <Route path="/hod" element={<DashboardLayout role="hod" />}>
        <Route path="dashboard"         element={<HodDashboardPage />} />
        <Route path="teachers"          element={<ManageTeachers />} />
        <Route path="departments"       element={<CreateDepartment />} />
        <Route path="manage-students"   element={<ManageStudentsPage />} />
        <Route path="profile"           element={<ProfilePage />} />
      </Route>

      {/* Teacher Routes */}
      <Route path="/teacher" element={<DashboardLayout role="teacher" />}>
        <Route path="dashboard"         element={<TeacherDashboard />} />
        <Route path="managestudent"         element={<TeacherHome />} />
        <Route path="teacherdashboard"   element={<TeacherDashboard />} />
        <Route path="mark-attendance"    element={<MarkAttendance />} />
        <Route path="reports"           element={<div className="p-8"><h1 className="text-2xl font-bold">Attendance Reports</h1></div>} />
        <Route path="profile"           element={<TeacherProfile/>} />
      </Route>

      {/* Student Routes */}
      <Route path="/student" element={<DashboardLayout role="student" />}>
        <Route path="dashboard"         element={<div className="p-8"><h1 className="text-2xl font-bold">Student Dashboard</h1></div>} />
        <Route path="attendance"        element={<div className="p-8"><h1 className="text-2xl font-bold">My Attendance</h1></div>} />
        <Route path="profile"           element={<StudentProfile/>} />
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