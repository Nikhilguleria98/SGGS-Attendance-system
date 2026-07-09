import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  ShieldCheck,
  UserSquare2,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDrawer from "../../GlobalComp/logincomp/LoginDrawer";

// Replace with your actual asset path
import campusImage from "../../../assets/sggscampus.png";
const HeroSection = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 },
    },
  };

  return (
    <div className="w-full bg-[#FAFAFA] font-sans flex flex-col min-h-screen overflow-x-hidden">
      {/* ── 1. HERO MAIN AREA ── */}
      {/* Both top (pt-0) and bottom (pb-0) padding removed for a flush layout */}
      <section className="relative w-full pt-0 pb-0 flex-grow flex flex-col justify-center">
        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-0">
          {/* Left Content Area */}
          <div className="w-full px-6 sm:px-12 lg:px-16 xl:px-24 z-20 order-2 lg:order-1">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
            >
              {/* Headline */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[64px] leading-[1.1] font-extrabold text-[#111827] tracking-tight mb-6 mt-8 lg:mt-0"
              >
                <span className="text-[#c8102e]">Smart Attendance</span>
                <br />
                for a Smarter Campus
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium"
              >
                Manage student attendance, leave requests, notices and reports
                efficiently in one centralized platform.
              </motion.p>

              {/* Role Badges */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10"
              >
                <Badge icon={Users} label="For Students" />
                <Badge icon={UserSquare2} label="For Teachers" />
                <Badge icon={ShieldCheck} label="For Admins" />
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <button
                  onClick={() => {
                    console.log("Get Started clicked");
                    setIsLoginOpen(true);
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#c8102e] hover:bg-[#a00d24] text-white px-8 py-3.5 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 focus:ring-4 focus:ring-red-100 group"
                >
                  Get Started
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border-2 border-[#132345] text-[#132345] hover:bg-[#132345] hover:text-white px-8 py-3.5 rounded-lg font-bold transition-all focus:ring-4 focus:ring-blue-100">
                  Learn More
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Image Area */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full relative h-[350px] sm:h-[450px] lg:h-[650px] order-1 lg:order-2 pointer-events-none"
          >
            <img
              src={campusImage}
              alt="SGGS Campus"
              className="absolute top-0 right-0 w-full lg:w-[115%] h-full object-cover object-center rounded-bl-[80px] lg:rounded-bl-[150px]"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 25%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 25%)",
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── 2. WAVE + STATS SECTION ── */}
      <div className="relative w-full mt-auto z-20">
        {/* SVG Wave */}
        <svg
          className="absolute bottom-full left-0 w-full h-[60px] sm:h-[100px] md:h-[140px] lg:h-[180px] drop-shadow-xl -mb-[1px]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,150 C400,250 800,0 1440,80 V200 H0 V150 Z"
            fill="#c8102e"
            transform="translate(0,-15)"
          />
          <path
            d="M0,150 C400,250 800,0 1440,80 V200 H0 V150 Z"
            fill="#132345"
          />
        </svg>

        {/* Stats Bar Container */}
        <div className="bg-[#132345] relative w-full pt-4 pb-10 px-6 sm:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:flex lg:flex-row lg:justify-end items-center gap-y-10 gap-x-6 lg:gap-12 xl:gap-16">
            <StatBlock icon={Users} count="10,000+" label="Students" />
            <div className="hidden lg:block w-px h-12 bg-white/20" />

            <StatBlock icon={UserSquare2} count="500+" label="Faculty" />
            <div className="hidden lg:block w-px h-12 bg-white/20" />

            <StatBlock icon={Building2} count="50+" label="Departments" />
            <div className="hidden lg:block w-px h-12 bg-white/20" />

            <StatBlock icon={CalendarCheck} count="98%" label="Accuracy" />
          </div>
        </div>

        {/* ── 3. LATEST CIRCULARS TICKER ── */}
        <div className="bg-[#0a1428] w-full flex items-center border-t border-white/5 overflow-hidden">
          {/* Static Label */}
          <div className="shrink-0 flex items-center gap-2 bg-[#c8102e] text-white text-xs sm:text-sm font-bold px-4 sm:px-6 py-3 z-10 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Latest Circulars
          </div>

          {/* Seamless Marquee Animation */}
          <div className="relative flex-1 overflow-hidden py-3 flex">
            <motion.div
              className="flex gap-10 whitespace-nowrap px-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            >
              {[...Array(2)].map((_, arrayIndex) => (
                <div key={arrayIndex} className="flex gap-10 shrink-0">
                  <TickerItem text="Examination postponed (26.5.2026 to be held on 5.06.2026)" />
                  <TickerItem text="List of Selected Candidates for Admission to BPT Program" />
                  <TickerItem text="Second Counselling for Admission to BPT Program" />
                  <TickerItem text="Fee Structure for Session 2026-27 now available" />
                  <TickerItem text="Annual Sports Meet Registration open till 30th June" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* End cap arrow */}
          <button className="shrink-0 px-4 sm:px-6 py-3 text-white/50 hover:text-white bg-[#0a1428] border-l border-white/5 transition-colors z-10">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <LoginDrawer isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

/* ── SUB-COMPONENTS ── */

const Badge = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-gray-100">
    <div className="bg-[#c8102e] p-1.5 rounded-md shrink-0">
      <Icon size={16} className="text-white" />
    </div>
    <span className="text-sm font-bold text-gray-800 whitespace-nowrap">
      {label}
    </span>
  </div>
);

const StatBlock = ({ icon: Icon, count, label }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -2 }}
    className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 text-white w-full transition-transform"
  >
    <Icon size={36} className="text-white/90 shrink-0" strokeWidth={1.5} />
    <div className="flex flex-col text-center sm:text-left">
      <span className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold leading-tight tracking-wide">
        {count}
      </span>
      <span className="text-sm text-blue-200 font-medium">{label}</span>
    </div>
  </motion.div>
);

const TickerItem = ({ text }) => (
  <span className="text-white/80 text-sm font-medium inline-flex items-center gap-3 hover:text-white transition-colors cursor-default">
    <span className="text-[#c8102e] font-bold text-lg leading-none">›</span>
    {text}
  </span>
);

export default HeroSection;
