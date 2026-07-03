import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  UserSquare2, 
  ShieldCheck, 
  ArrowRight, 
  Building2, 
  CalendarCheck
} from "lucide-react";

// Re-added the proper image import for the React environment
import campusImage from "../../../assets/sggscampus.png"; 

const HeroSection = () => {
  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="w-full bg-[#FAFAFA] font-sans overflow-hidden overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-between pt-20 pb-48 lg:pb-32 z-10">
        
        {/* Left Content Area */}
        <div className="w-full lg:w-1/2 px-6 lg:px-16 xl:px-24 z-20">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-extrabold text-[#111827] tracking-tight mb-6"
            >
              <span className="text-[#c8102e]">Smart Attendance</span> <br />
              for a Smarter Campus
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed"
            >
              Efficiently manage student attendance, leave requests, and reports in one centralized system.
            </motion.p>

            {/* Role Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                <div className="bg-[#c8102e] p-1.5 rounded-md"><Users size={16} className="text-white" /></div>
                <span className="text-sm font-semibold text-gray-800">For Students</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                <div className="bg-[#c8102e] p-1.5 rounded-md"><UserSquare2 size={16} className="text-white" /></div>
                <span className="text-sm font-semibold text-gray-800">For Teachers</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                <div className="bg-[#c8102e] p-1.5 rounded-md"><ShieldCheck size={16} className="text-white" /></div>
                <span className="text-sm font-semibold text-gray-800">For Admins</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-[#c8102e] hover:bg-[#a00d24] text-white px-8 py-3.5 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Get Started <ArrowRight size={18} />
              </button>
              <button className="flex items-center gap-2 bg-transparent border-2 border-[#1a2d5c] text-[#1a2d5c] hover:bg-[#1a2d5c] hover:text-white px-8 py-3 rounded-lg font-semibold transition-all">
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Image Area */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="w-full lg:w-1/2 relative h-[300px] sm:h-[400px] lg:h-[600px] mt-12 lg:mt-0 z-10"
        >
          {/* Replaced the background-image div with the actual img tag and mask */}
          <img
            src={campusImage}
            alt="Campus"
            className="absolute top-0 right-0 w-full lg:w-[110%] h-[120%] lg:-right-10 object-cover object-center rounded-bl-[150px] z-0"
            style={{ 
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 35%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 35%)'
            }}
          />
        </motion.div>
      </section>

      {/* --- WAVE SEPARATOR & STATS BAR --- */}
      <div className="relative z-20 -mt-24 lg:-mt-40 w-full">
        
        {/* SVG Decorative Curve matching the design */}
        <svg 
          className="absolute bottom-full left-0 w-full h-[80px] md:h-[150px] lg:h-[220px] drop-shadow-xl" 
          preserveAspectRatio="none" 
          viewBox="0 0 1440 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Red Accent Path */}
          <path d="M0,150 C400,250 800,0 1440,80 V200 H0 V150 Z" fill="#c8102e" transform="translate(0, -15)" />
          {/* Deep Blue Base Path */}
          <path d="M0,150 C400,250 800,0 1440,80 V200 H0 V150 Z" fill="#132345" />
        </svg>

        {/* Stats Container (Deep Blue background continuous from SVG) */}
        <div className="bg-[#132345] relative w-full pt-6 pb-12 px-4 sm:px-6 lg:px-24">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between md:justify-around lg:justify-end gap-8 lg:gap-16">
            
            <StatBlock icon={Users} count="10,000+" label="Students" />
            <div className="hidden md:block w-px h-12 bg-white/20"></div>
            
            <StatBlock icon={UserSquare2} count="500+" label="Faculty" />
            <div className="hidden md:block w-px h-12 bg-white/20"></div>
            
            <StatBlock icon={Building2} count="50+" label="Departments" />
            <div className="hidden md:block w-px h-12 bg-white/20"></div>
            
            <StatBlock icon={CalendarCheck} count="98%" label="Accuracy" />

          </div>
        </div>
      </div>

    </div>
  );
};

// Sub-components for cleaner code
const StatBlock = ({ icon: Icon, count, label }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="flex items-center gap-4 text-white"
  >
    <Icon size={32} className="text-white/90" />
    <div className="flex flex-col">
      <span className="text-2xl font-bold">{count}</span>
      <span className="text-sm text-gray-300">{label}</span>
    </div>
  </motion.div>
);

export default HeroSection;