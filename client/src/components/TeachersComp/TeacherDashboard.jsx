import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [teacherName, setTeacherName] = useState("Teacher");
  const [teacherAvatar, setTeacherAvatar] = useState("");

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${payload.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          if (data.success) {
            setTeacherName(`${data.data.firstName} ${data.data.lastName || ''}`);
            setTeacherAvatar(data.data.avatar || "https://ui-avatars.com/api/?name=" + data.data.firstName);
          }
        } catch (error) {
          console.error("Failed to fetch profile", error);
        }
      }
    };
    fetchTeacherProfile();
  }, []);

  // Mock data representing the class list
  const classesData = [
    { name: 'CSE 3rd Year - Section A', students: 28 },
    { name: 'CSE 2nd Year - Section B', students: 25 },
    { name: 'CSE 1st Year - Section A', students: 22 },
    { name: 'CSE 4th Year - Section A', students: 23 },
    { name: 'CSE 2nd Year - Section A', students: 20 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans antialiased text-slate-800">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-6 mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-950">Teacher Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-950">Welcome, {teacherName}</p>
              <p className="text-xs text-slate-500 font-medium">Faculty</p>
            </div>
            {/* Profile Image */}
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-200">
              <img 
                src={teacherAvatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* --- METRIC CARDS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Card 1: My Classes */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">My Classes</p>
              <p className="text-2xl font-bold text-slate-950 mt-0.5">5</p>
            </div>
          </div>

          {/* Card 2: Total Students */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Students</p>
              <p className="text-2xl font-bold text-slate-950 mt-0.5">98</p>
            </div>
          </div>

          {/* Card 3: Today's Attendance */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15.75 7.5a3 3 0 11-6 0 3 3 0 016 0zM5.25 6a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM14.25 6a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Today's Attendance</p>
              <p className="text-2xl font-bold text-slate-950 mt-0.5">82%</p>
            </div>
          </div>

        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: My Classes List */}
          {/* <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-950 mb-4">My Classes</h2>
            
            <div className="divide-y divide-slate-100">
              {classesData.map((cls, index) => (
                <div key={index} className="flex justify-between items-center py-3.5 first:pt-0 last:pb-0">
                  <span className="text-sm font-semibold text-slate-700">{cls.name}</span>
                  <span className="text-sm font-medium text-slate-400">{cls.students} Students</span>
                </div>
              ))}
            </div>

            <div className="mt-5 text-center">
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all">
                View All Classes
              </button>
            </div>
          </div> */}

          {/* Right Column: Quick Actions */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-950 mb-4">Quick Actions</h2>
            
            <div className="flex flex-col gap-3">
              {/* Action 1: Take Attendance */}
              <button 
                onClick={() => navigate('/teacher/mark-attendance')}
                className="flex items-center justify-start gap-3 w-full bg-black/90 hover:bg-black text-white font-medium px-5 py-3.5 rounded-xl shadow-sm transition-all active:scale-[0.99]"
              >
                <span className="text-xl font-light">+</span>
                <span className="text-sm font-semibold">Take Attendance</span>
              </button>

              {/* Action 2: View Students */}
              <button 
                onClick={() => navigate('/teacher/managestudent')}
                className="flex items-center justify-start gap-3 w-full bg-black/90 hover:bg-black text-white font-medium px-5 py-3.5 rounded-xl shadow-sm transition-all active:scale-[0.99]"
              >
                <span className="text-xl font-light">+</span>
                <span className="text-sm font-semibold">View Students</span>
              </button>

              {/* Action 3: Attendance Reports */}
              <button 
                onClick={() => navigate('/teacher/reports')}
                className="flex items-center justify-start gap-3 w-full bg-black/90 hover:bg-black text-white font-medium px-5 py-3.5 rounded-xl shadow-sm transition-all active:scale-[0.99]"
              >
                <span className="text-xl font-light">+</span>
                <span className="text-sm font-semibold">Attendance Reports</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}