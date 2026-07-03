import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserSquare2,
  ShieldCheck,
  ArrowRight,
  Building2,
  CalendarCheck,
} from "lucide-react";

import campusImage from "../../../assets/sggscampus.png";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full bg-[#FAFAFA] font-sans overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-between pt-20 pb-56 sm:pb-64 lg:pb-40 xl:pb-48 overflow-hidden">

        {/* Left Content */}
        <div className="w-full lg:w-1/2 px-5 sm:px-8 md:px-12 lg:px-14 xl:px-20 2xl:px-28 z-20 order-2 lg:order-1 mt-8 lg:mt-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl mx-auto lg:mx-0"
          >
            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="
                text-[32px] leading-[1.2]
                sm:text-[40px]
                md:text-[48px]
                lg:text-[52px]
                xl:text-[58px]
                font-extrabold text-[#111827] tracking-tight mb-4 sm:mb-5 lg:mb-6
              "
            >
              <span className="text-[#c8102e]">Smart Attendance</span>
              <br />
              for a Smarter Campus
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md leading-relaxed"
            >
              Manage student attendance, leave requests, notices and reports
              efficiently in one centralized platform.
            </motion.p>

            {/* Role Badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-7 sm:mb-9 lg:mb-10"
            >
              {[
                { Icon: Users, label: "For Students" },
                { Icon: UserSquare2, label: "For Teachers" },
                { Icon: ShieldCheck, label: "For Admins" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="bg-[#c8102e] p-1 sm:p-1.5 rounded-md shrink-0">
                    <Icon size={14} className="text-white sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 whitespace-nowrap">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <button className="flex items-center gap-2 bg-[#c8102e] hover:bg-[#a00d24] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                Get Started <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
              <button className="flex items-center gap-2 bg-transparent border-2 border-[#1a2d5c] text-[#1a2d5c] hover:bg-[#1a2d5c] hover:text-white px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all">
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="
            w-full lg:w-1/2
            relative
            h-[220px] xs:h-[260px] sm:h-[340px] md:h-[420px] lg:h-[560px] xl:h-[620px]
            order-1 lg:order-2
            shrink-0
          "
        >
          <img
            src={campusImage}
            alt="SGGS Campus"
            className="
              absolute top-0 right-0
              w-full lg:w-[108%]
              h-full
              lg:-right-8 xl:-right-10
              object-cover object-center
              rounded-bl-[80px] sm:rounded-bl-[120px] lg:rounded-bl-[150px]
            "
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 30%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 30%)",
            }}
          />
        </motion.div>
      </section>

      {/* ── WAVE + STATS ── */}
      <div className="relative z-20 -mt-44 sm:-mt-52 md:-mt-56 lg:-mt-44 xl:-mt-52 w-full">

        {/* SVG Wave */}
        <svg
          className="absolute bottom-full left-0 w-full h-[60px] sm:h-[100px] md:h-[140px] lg:h-[180px] xl:h-[220px] drop-shadow-xl"
          preserveAspectRatio="none"
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Red accent layer */}
          <path
            d="M0,150 C400,250 800,0 1440,80 V200 H0 V150 Z"
            fill="#c8102e"
            transform="translate(0,-15)"
          />
          {/* Deep navy base */}
          <path
            d="M0,150 C400,250 800,0 1440,80 V200 H0 V150 Z"
            fill="#132345"
          />
        </svg>

        {/* Stats Bar */}
        <div className="bg-[#132345] relative w-full pt-4 sm:pt-6 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-6 lg:px-16 xl:px-24">
          <div className="max-w-7xl mx-auto">

            {/* Mobile: 2×2 grid | md+: single row */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 sm:gap-y-8 md:flex md:flex-row md:justify-around lg:justify-end md:gap-8 lg:gap-12 xl:gap-16">

              <StatBlock icon={Users} count="10,000+" label="Students" />

              {/* Divider — hidden on mobile */}
              <div className="hidden md:block w-px h-12 bg-white/20 self-center" />

              <StatBlock icon={UserSquare2} count="500+" label="Faculty" />

              <div className="hidden md:block w-px h-12 bg-white/20 self-center" />

              <StatBlock icon={Building2} count="50+" label="Departments" />

              <div className="hidden md:block w-px h-12 bg-white/20 self-center" />

              <StatBlock icon={CalendarCheck} count="98%" label="Accuracy" />
            </div>
          </div>
        </div>
      </div>

      {/* ── LATEST CIRCULARS TICKER ── */}
      <div className="bg-[#132345] w-full overflow-hidden border-t border-white/10">
        <div className="flex items-center">

          {/* Label pill */}
          <div className="shrink-0 flex items-center gap-1.5 bg-[#c8102e] text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 sm:py-2.5 z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />
            Latest Circulars
          </div>

          {/* Scrolling ticker */}
          <div className="relative flex-1 overflow-hidden py-2 sm:py-2.5">
            <motion.div
              className="flex gap-8 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            >
              {[...Array(2)].map((_, outerIdx) => (
                <span key={outerIdx} className="flex gap-6 shrink-0">
                  {[
                    "Examination postponed (26.5.2026 to be held on 5.06.2026)",
                    "List of Selected Candidates for Admission to BPT Program",
                    "Second Counselling for Admission to BPT Program",
                    "Fee Structure for Session 2026-27 now available",
                    "Annual Sports Meet Registration open till 30th June",
                  ].map((text, i) => (
                    <span
                      key={i}
                      className="text-white/80 text-xs sm:text-sm inline-flex items-center gap-2"
                    >
                      <span className="text-[#c8102e]">›</span>
                      {text}
                    </span>
                  ))}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Arrow button */}
          <button className="shrink-0 px-3 sm:px-4 py-2 sm:py-2.5 text-white/60 hover:text-white border-l border-white/10 transition-colors">
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

    </div>
  );
};

/* ── Stat Block ── */
const StatBlock = ({ icon: Icon, count, label }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center gap-2 sm:gap-3 lg:gap-4 text-white"
  >
    <Icon
      className="text-white/90 shrink-0"
      style={{ width: "clamp(22px, 4vw, 32px)", height: "clamp(22px, 4vw, 32px)" }}
    />
    <div className="flex flex-col">
      <span className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">
        {count}
      </span>
      <span className="text-xs sm:text-sm text-gray-300">{label}</span>
    </div>
  </motion.div>
);

export default HeroSection;