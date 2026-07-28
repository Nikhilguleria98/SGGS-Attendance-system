import React, { useState, useEffect, useRef } from 'react';
import TeacherProfileHeader from '../../components/TeachersComp/TeacherProfile/TeacherProfileHeader';
import TeacherPersonalInformation from '../../components/TeachersComp/TeacherProfile/TeacherPersonalInformation';
import TeacherProfessionalInformation from '../../components/TeachersComp/TeacherProfile/TeacherProfessionalInformation';
import TeacherAccountSecurity from '../../components/TeachersComp/TeacherProfile/TeacherAccountSecurity';
import TeacherProfilePhoto from '../../components/TeachersComp/TeacherProfile/TeacherProfilePhoto';

const decodeJwtPayload = (token) => {
  if (!token) return null;

  const payloadPart = token.split('.')[1];
  if (!payloadPart) return null;

  const normalized = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  const decoded = atob(padded);

  return JSON.parse(decoded);
};

const TeacherProfile = () => {
  const topRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = decodeJwtPayload(token);
          const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${payload.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          if (data.success) {
            setUserData(data.data);
          }
        } catch (error) {
          console.error("Failed to fetch profile", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchTeacherProfile();
  }, []);

  const handleEditGlobal = () => {
    console.log("Global Edit Clicked");
  };

  if (isLoading) {
    return <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 text-center text-slate-500 shadow-sm">Loading profile...</div>;
  }

  if (!userData) {
    return <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-600 shadow-sm">Failed to load profile data.</div>;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-2 md:py-4" ref={topRef}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 pb-10">
        <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_20px_60px_rgba(22,43,74,0.08)] backdrop-blur sm:p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#c00021]">Faculty</p>
              <h1 className="text-3xl font-bold text-slate-900">Teacher Profile</h1>
            </div>
            <div className="rounded-full border border-[#162b4a]/10 bg-[#162b4a]/5 px-4 py-2 text-sm font-medium text-[#162b4a]">Role-based professional view</div>
          </div>
        </div>

        <TeacherProfileHeader user={userData} onEdit={handleEditGlobal} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <TeacherPersonalInformation user={userData} />
            <TeacherProfessionalInformation user={userData} />
            <TeacherAccountSecurity user={userData} />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-1">
            <TeacherProfilePhoto user={userData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
