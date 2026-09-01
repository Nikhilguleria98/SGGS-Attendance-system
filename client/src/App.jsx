import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./components/GlobalComp/DashboardLayout";
import PublicLayout from "./components/GlobalComp/PublicLayout";
import ProtectedRoute from "./components/GlobalComp/ProtectedRoute/ProtectedRoute";

// HOD Pages
const HodDashboardPage = lazy(() => import("./Pages/ADMINpages/HodDashboardPage"));
const ManageTeachers = lazy(() => import("./Pages/ADMINpages/ManageTeachers"));
const CreateDepartment = lazy(() => import("./Pages/ADMINpages/createDepartment"));
const ProfilePage = lazy(() => import("./Pages/ADMINpages/ProfilePage"));
const ManageStudentsPage = lazy(() => import("./Pages/ADMINpages/ManageStudentsPage"));

// Teacher Pages
const TeacherHome = lazy(() => import("./Pages/Teacherspages/TeacherHome"));
const TeacherDashboard = lazy(() => import("./components/TeachersComp/TeacherDashboard"));
const MarkAttendance = lazy(() => import("./components/TeachersComp/MarkAttendance/MarkAttendance"));
const TeacherProfile = lazy(() => import("./Pages/Teacherspages/TeacherProfile"));

// Student Pages
const StudentProfile = lazy(() => import("./components/StudentComp/profile"));

// Public Pages
const Landingpage = lazy(() => import("./Pages/Defaultpages/Landingpage"));
const Aboutuspage = lazy(() => import("./Pages/Defaultpages/Aboutuspage"));
const Contactuspage = lazy(() => import("./Pages/Defaultpages/Contactuspage"));
const AttendanceDashboard = lazy(() => import("./Pages/Studentpages/AttendanceDashboard"));
const StudentDashboard = lazy(() => import("./Pages/Studentpages/StudentDashboard"));
const TeacherReport = lazy(() => import("./components/TeachersComp/TeacherReport/Teacherreport"));
const LoginDrawer = lazy(() => import("./components/GlobalComp/logincomp/LoginDrawer"));

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

      {/* Teacher Protected */}
      <Route element={<ProtectedRoute allowedRole="teacher" />}>
        <Route path="/teacher" element={<DashboardLayout role="teacher" />}>
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="managestudent" element={<TeacherHome />} />
          <Route path="teacherdashboard" element={<TeacherDashboard />} />
          <Route path="mark-attendance" element={<MarkAttendance />} />
          <Route path="reports" element={<TeacherReport />} />
          <Route path="profile" element={<TeacherProfile />} />
        </Route>
      </Route>

      {/* Student Protected */}
      <Route element={<ProtectedRoute allowedRole="student" />}>
        <Route path="/student" element={<DashboardLayout role="student" />}>
          <Route path="dashboard" element={<StudentDashboard/>} />
          <Route path="attendance" element={<AttendanceDashboard/>} />
          <Route path="profile" element={<StudentProfile />} />
        </Route>
      </Route>

      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landingpage />} />
        <Route path="/about-us" element={<Aboutuspage />} />
        <Route path="/contact-us" element={<Contactuspage />} />
        <Route path="/login" element={<LoginDrawer />} />
      </Route>
    </Routes>
  );
};

export default App;
