import React from "react";
import { motion } from "framer-motion";
import CreateDepartmentHeader from "../../components/ADMINComp/createDepartment/CreateDepartmentHeader";
import CreateDepartmentFormFields from "../../components/ADMINComp/createDepartment/CreateDepartmentFormFields";
import CreateDepartmentIllustration from "../../components/ADMINComp/createDepartment/CreateDepartmentIllustration";


const CreateDepartment = () => {
  const handleSubmitSuccess = (data) => {
    console.log("Department successfully created: ", data);
    // Integrate with context, state management or API here
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Outer Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl bg-white border border-slate-100 shadow-xl shadow-slate-100/50 rounded-3xl p-6 md:p-10 lg:p-12 relative overflow-hidden"
      >
        {/* Background ambient radial gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-50/30 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/40 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Back navigation header */}
        <CreateDepartmentHeader />

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Form Fields Card */}
          <div className="lg:col-span-7 w-full order-2 lg:order-1">
            <CreateDepartmentFormFields onSubmitSuccess={handleSubmitSuccess} />
          </div>

          {/* Right Column: Illustration Graphic */}
          <div className="lg:col-span-5 w-full flex justify-center order-1 lg:order-2">
            <CreateDepartmentIllustration />
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default CreateDepartment;
