import React from "react";
import { 
  Users, 
  UserSquare2, 
  ShieldCheck, 
  ArrowRight, 
  Building2, 
  CalendarCheck 
} from "lucide-react";

// Replace with your actual image path
import campusImage from "../../../assets/sggscampus.jpg"; 

const HeroSection = () => {
  return (
    <section className="w-full flex flex-col font-sans overflow-x-hidden bg-white">
      
      {/* =========================================
          1. TOP HERO AREA (Text + Faded Image)
          ========================================= */}
      <div className="relative w-full">
        
        {/* --- BACKGROUND LAYER --- */}
        {/* This sits behind the text. It contains the image on the right, and a fade gradient on the left. */}
        <div className="absolute inset-0 w-full h-full z-0 flex justify-end">
          {/* The gradient mask: Solid white on the left, fading to transparent on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 md:via-white/40 to-transparent w-full md:w-[80%] lg:w-[60%] left-0 z-10"></div>
          
          <img
            src={campusImage}
            alt="Campus"
            className="w-full lg:w-[70%] h-full object-cover object-right"
          />
        </div>

        {/* --- FOREGROUND TEXT LAYER --- */}
        {/* We use standard document flow here so it pushes the wave down naturally.
            Notice the pb-48 (padding-bottom). This guarantees the text never touches the wave. */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-20 pb-48 md:pt-28 md:pb-56 lg:pt-36 lg:pb-64 flex flex-col">
          
          <div className="w-full max-w-2xl text-center md:text-left">
            <h1 className="text-[38px] sm:text-5xl lg:text-[56px] leading-[1.15] font-extrabold tracking-tight mb-5">
              <span className="text-[#a00d24]">Smart Attendance</span> <br />
              <span className="text-[#0a192f]">for a Smarter Campus</span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 mb-8 max-w-[480px] mx-auto md:mx-0 leading-relaxed font-medium">
              Efficiently manage student attendance, leave requests, and reports in one centralized system.
            </p>

            {/* Badges Row */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 mb-10">
              <Badge icon={Users} label="For Students" />
              <Badge icon={UserSquare2} label="For Teachers" />
              <Badge icon={ShieldCheck} label="For Admins" />
            </div>

            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#a00d24] hover:bg-[#850b1e] text-white px-8 py-3.5 rounded-lg font-bold transition-colors shadow-md">
                Get Started <ArrowRight size={18} strokeWidth={2.5} />
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-[#0a192f] text-[#0a192f] hover:bg-gray-50 px-8 py-3.5 rounded-lg font-bold transition-colors">
                Learn More
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================
          2. WAVE & STATS AREA (Bottom section)
          ========================================= */}
      {/* We use a negative margin (-mt) to pull this layer UP, overlapping the padding-bottom of the section above. */}
      <div className="relative w-full z-20 -mt-24 md:-mt-32 lg:-mt-48 pointer-events-none">
        
        {/* --- THE SVG WAVE --- */}
        <svg 
          className="w-full h-[80px] sm:h-[140px] md:h-[180px] lg:h-[260px] block drop-shadow-xl" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Red Accent Path (Shifted up slightly using transform) */}
          <path 
            fill="#a00d24" 
            d="M0,192 C400,320 900,32 1440,128 L1440,320 L0,320 Z" 
            transform="translate(0, -12)"
          />
          {/* Main Navy Blue Path */}
          <path 
            fill="#0a192f" 
            d="M0,192 C400,320 900,32 1440,128 L1440,320 L0,320 Z" 
          />
        </svg>

        {/* --- STATS BAR --- */}
        {/* We use pointer-events-auto here so text can be selected if needed. -mt-1 removes the tiny 1px gap below SVGs */}
        <div className="bg-[#0a192f] w-full px-6 sm:px-10 lg:px-12 py-8 lg:py-10 -mt-1 pointer-events-auto">
          
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:flex lg:flex-row lg:justify-end items-center gap-y-10 gap-x-4 lg:gap-10 xl:gap-14 lg:pr-8">
            
            <StatBlock icon={Users} count="10,000+" label="Students" />
            
            {/* Divider lines only show on desktop */}
            <div className="hidden lg:block w-px h-10 bg-white/20"></div>
            
            <StatBlock icon={UserSquare2} count="500+" label="Faculty" />
            
            <div className="hidden lg:block w-px h-10 bg-white/20"></div>
            
            <StatBlock icon={Building2} count="50+" label="Departments" />
            
            <div className="hidden lg:block w-px h-10 bg-white/20"></div>
            
            <StatBlock icon={CalendarCheck} count="98%" label="Accuracy" />

          </div>
        </div>
        
      </div>
      
    </section>
  );
};

/* =========================================
   SUB-COMPONENTS FOR CLEANER CODE
   ========================================= */

const Badge = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2.5 bg-white px-2 py-1.5 rounded-lg shadow-sm border border-gray-200">
    <div className="bg-[#a00d24] p-1.5 rounded-md text-white">
      <Icon size={16} strokeWidth={2.5} />
    </div>
    <span className="text-[13px] sm:text-sm font-bold text-gray-800 pr-1.5">{label}</span>
  </div>
);

const StatBlock = ({ icon: Icon, count, label }) => (
  <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center justify-center gap-3 text-white w-full">
    <div className="text-white">
      <Icon size={34} strokeWidth={1.5} />
    </div>
    <div className="flex flex-col text-center sm:text-left">
      <span className="text-xl sm:text-2xl font-extrabold leading-none mb-1">{count}</span>
      <span className="text-xs sm:text-[13px] text-gray-300 font-medium">{label}</span>
    </div>
  </div>
);

export default HeroSection;