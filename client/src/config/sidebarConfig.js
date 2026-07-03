import { 
  Home, 
  Building2, 
  Users, 
  GraduationCap, 
  FileText, 
  ClipboardCheck, 
  Settings, 
  UserCircle,
  User
} from 'lucide-react';

export const sidebarMenus = {
  hod: [
    { label: 'Dashboard', icon: Home, path: '/hod/dashboard' },
    { label: 'Department', icon: Building2, path: '/hod/departments' },
    { label: 'Teachers', icon: Users, path: '/hod/teachers' },
    { label: 'Students', icon: GraduationCap, path: '/hod/students' },
    { label: 'Profile', icon: UserCircle, path: '/hod/profile' },
  ],
  teacher: [
    { label: "Dashboard", icon: Home, path: "/teacher/dashboard" },
    { label: "Manage Students", icon: Users, path: "/teacher/manage-students" },
    { label: "Attendance", icon: ClipboardCheck, path: "/teacher/attendance" },
    { label: "Reports", icon: FileText, path: "/teacher/reports" },
    { label: "Profile", icon: User, path: "/teacher/profile" },
  ],
  student: [
    { label: 'Dashboard', icon: Home, path: '/student/dashboard' },
    { label: 'Attendance', icon: ClipboardCheck, path: '/student/attendance' },
    { label: 'Profile', icon: UserCircle, path: '/student/profile' },
  ]
};
