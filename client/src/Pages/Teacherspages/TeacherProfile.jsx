import React, { useRef } from 'react';
import TeacherProfileHeader from '../../components/TeachersComp/TeacherProfile/TeacherProfileHeader';
import TeacherPersonalInformation from '../../components/TeachersComp/TeacherProfile/TeacherPersonalInformation';
import TeacherProfessionalInformation from '../../components/TeachersComp/TeacherProfile/TeacherProfessionalInformation';
import TeacherAccountSecurity from '../../components/TeachersComp/TeacherProfile/TeacherAccountSecurity';
import TeacherProfilePhoto from '../../components/TeachersComp/TeacherProfile/TeacherProfilePhoto';


const TeacherProfile = () => {
  // A ref just to scroll to top or manage focus if needed when editing
  const topRef = useRef(null);

  const handleEditGlobal = () => {
    // This could trigger a global edit mode, for now it's a placeholder
    // Individual components manage their own edit states as requested
    console.log("Global Edit Clicked");
  };

  return (
    <div className="p-4 md:p-8 min-h-[calc(100vh-4rem)]" ref={topRef}>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">User Profile</h1>
      
      <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
        {/* Top Header */}
        <TeacherProfileHeader onEdit={handleEditGlobal} />
        
        {/* Two Column Layout for Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (Main Info) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <TeacherPersonalInformation />
            <TeacherProfessionalInformation />
            <TeacherAccountSecurity />
          </div>
          
          {/* Right Column (Side Info) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <TeacherProfilePhoto />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
