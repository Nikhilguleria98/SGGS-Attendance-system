import { 
  Home, 
  Building2, 
  Users, 
  GraduationCap, 
  FileText, 
  ClipboardCheck, 
  Settings, 
  UserCircle 
} from 'lucide-react';

export const sidebarMenus = {
  hod: [
    { label: 'Dashboard', icon: Home, path: '/hod/dashboard' },
    { label: 'Department', icon: Building2, path: '/hod/departments' },
    { label: 'Teachers', icon: Users, path: '/hod/teachers' },
    { label: 'Students', icon: GraduationCap, path: '/hod/students' },
    { label: 'Reports', icon: FileText, path: '/hod/reports' },
    { label: 'Attendance', icon: ClipboardCheck, path: '/hod/attendance' },
    { label: 'Setting', icon: Settings, path: '/hod/settings' },
    { label: 'Profile', icon: UserCircle, path: '/hod/profile' },
  ],
  teacher: [
    {label: 'Dashboard'},
    {label: 'Manage Students'},
    {label:'Attendance' },
    {label:'Reports'},
    {label:'Profile'},
  ],
  student: []
};
