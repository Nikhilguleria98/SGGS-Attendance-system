import React from "react";
import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./components/GlobalComp/DashboardLayout";
import PublicLayout from "./components/GlobalComp/PublicLayout";
import ProtectedRoute from "./components/GlobalComp/ProtectedRoute/ProtectedRoute";

// HOD Pages
import HodDashboardPage from "./Pages/ADMINpages/HodDashboardPage";
import ManageTeachers from "./Pages/ADMINpages/ManageTeachers";
import CreateDepartment from "./Pages/ADMINpages/createDepartment";
import ProfilePage from "./Pages/ADMINpages/ProfilePage";
import ManageStudentsPage from "./Pages/ADMINpages/ManageStudentsPage";

// Teacher Pages
import TeacherHome from "./Pages/Teacherspages/TeacherHome";
import TeacherDashboard from "./components/TeachersComp/TeacherDashboard";
import MarkAttendance from "./components/TeachersComp/MarkAttendance/MarkAttendance";
import TeacherProfile from "./Pages/Teacherspages/TeacherProfile";

// Student Pages
import StudentProfile from "./components/StudentComp/profile";

// Public Pages
import Landingpage from "./Pages/Defaultpages/Landingpage";
import Aboutuspage from "./Pages/Defaultpages/Aboutuspage";
import Contactuspage from "./Pages/Defaultpages/Contactuspage";

const App = () => {
  return (
    <Routes>
      {/* HOD Protected */}
      <Route element={<ProtectedRoute allowedRole="hod" />}>
      <Route path="/hod" element={<DashboardLayout role="hod" />}>
          <Route path="dashboard" element={<HodDashboardPage />} />
          <Route path="teachers" element={<ManageTeachers />} />
          <Route path="departments" element={<CreateDepartment />} />
          <Route path="manage-students" element={<ManageStudentsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Teacher - Not Protected */}
      <Route path="/teacher" element={<DashboardLayout role="teacher" />}>
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="managestudent" element={<TeacherHome />} />
        <Route path="teacherdashboard" element={<TeacherDashboard />} />
        <Route path="mark-attendance" element={<MarkAttendance />} />
        <Route path="reports" element={<div className="p-8"><h1 className="text-2xl font-bold">Attendance Reports</h1></div>} />
        <Route path="profile" element={<TeacherProfile />} />
      </Route>

      {/* Student - Not Protected */}
      <Route path="/student" element={<DashboardLayout role="student" />}>
        <Route path="dashboard" element={<div className="p-8"><h1 className="text-2xl font-bold">Student Dashboard</h1></div>} />
        <Route path="attendance" element={<div className="p-8"><h1 className="text-2xl font-bold">My Attendance</h1></div>} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landingpage />} />
        <Route path="/about-us" element={<Aboutuspage />} />
        <Route path="/contact-us" element={<Contactuspage />} />
      </Route>
    </Routes>
  );
};

export default App;