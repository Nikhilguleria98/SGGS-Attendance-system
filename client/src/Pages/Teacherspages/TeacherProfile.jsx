import React, { useState, useEffect, useRef } from 'react';
import TeacherProfileHeader from '../../components/TeachersComp/TeacherProfile/TeacherProfileHeader';
import TeacherPersonalInformation from '../../components/TeachersComp/TeacherProfile/TeacherPersonalInformation';
import TeacherProfessionalInformation from '../../components/TeachersComp/TeacherProfile/TeacherProfessionalInformation';
import TeacherAccountSecurity from '../../components/TeachersComp/TeacherProfile/TeacherAccountSecurity';
import TeacherProfilePhoto from '../../components/TeachersComp/TeacherProfile/TeacherProfilePhoto';

const TeacherProfile = () => {
  const topRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
  }

  if (!userData) {
    return <div className="p-8 text-center text-red-500">Failed to load profile data.</div>;
  }

  return (
    <div className="p-4 md:p-8 min-h-[calc(100vh-4rem)]" ref={topRef}>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">User Profile</h1>
      
      <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
        <TeacherProfileHeader user={userData} onEdit={handleEditGlobal} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <TeacherPersonalInformation user={userData} />
            <TeacherProfessionalInformation user={userData} />
            <TeacherAccountSecurity user={userData} />
          </div>
          
          <div className="lg:col-span-1 flex flex-col gap-6">
            <TeacherProfilePhoto user={userData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
