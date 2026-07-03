import React from "react";
import { motion } from "framer-motion";

const CreateDepartmentIllustration = () => {
  // Leaf animations for the floating/waving plants
  const leafAnimation = (delay) => ({
    animate: {
      y: [0, -6, 0],
      rotate: [0, 4, -4, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      },
    },
  });

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[300px] select-none p-4">
      {/* Background soft red glowing circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute w-64 h-64 md:w-80 md:h-80 bg-red-50/50 rounded-full blur-3xl -z-10"
      />

      <svg
        viewBox="0 0 400 400"
        className="w-full max-w-[320px] md:max-w-[380px] h-auto drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main large circle backdrop background */}
        <motion.circle
          cx="200"
          cy="200"
          r="130"
          fill="#fef2f2"
          fillOpacity="0.8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.25 }}
        />

        {/* Building platform/ground base */}
        <motion.rect
          x="120"
          y="265"
          width="160"
          height="12"
          rx="6"
          fill="#c8102e"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ originX: 0.5 }}
        />
        <motion.rect
          x="100"
          y="272"
          width="200"
          height="8"
          rx="4"
          fill="#00529b"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ originX: 0.5 }}
        />

        {/* Main Building Group */}
        <motion.g
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", damping: 15 }}
        >
          {/* Main wall structure */}
          <rect x="135" y="160" width="130" height="105" fill="#ffffff" stroke="#00529b" strokeWidth="3" rx="4" />

          {/* Roof Pediment (Triangle) */}
          <polygon
            points="130,160 200,105 270,160"
            fill="#ffffff"
            stroke="#00529b"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Roof decoration lines */}
          <polygon points="142,154 200,113 258,154" fill="#c8102e" fillOpacity="0.15" />
          <circle cx="200" cy="135" r="7" fill="#f59e0b" stroke="#00529b" strokeWidth="2.5" />
          <line x1="200" y1="130" x2="200" y2="135" stroke="#00529b" strokeWidth="2" strokeLinecap="round" />
          <line x1="200" y1="135" x2="203" y2="137" stroke="#00529b" strokeWidth="1.5" strokeLinecap="round" />

          {/* Pillars */}
          {/* Left Pillar */}
          <rect x="148" y="160" width="12" height="105" fill="#f8fafc" stroke="#00529b" strokeWidth="2.5" />
          {/* Middle Left Pillar */}
          <rect x="180" y="160" width="12" height="105" fill="#f8fafc" stroke="#00529b" strokeWidth="2.5" />
          {/* Middle Right Pillar */}
          <rect x="208" y="160" width="12" height="105" fill="#f8fafc" stroke="#00529b" strokeWidth="2.5" />
          {/* Right Pillar */}
          <rect x="240" y="160" width="12" height="105" fill="#f8fafc" stroke="#00529b" strokeWidth="2.5" />

          {/* Windows */}
          {/* Top row windows */}
          <rect x="165" y="175" width="10" height="18" rx="2" fill="#f1f5f9" stroke="#00529b" strokeWidth="2" />
          <rect x="225" y="175" width="10" height="18" rx="2" fill="#f1f5f9" stroke="#00529b" strokeWidth="2" />
          {/* Bottom row windows */}
          <rect x="165" y="210" width="10" height="18" rx="2" fill="#f1f5f9" stroke="#00529b" strokeWidth="2" />
          <rect x="225" y="210" width="10" height="18" rx="2" fill="#f1f5f9" stroke="#00529b" strokeWidth="2" />

          {/* Main Entrance Door */}
          <path d="M190 265 V218 C190 212, 210 212, 210 218 V265" fill="#e2e8f0" stroke="#00529b" strokeWidth="2.5" />
          <circle cx="194" cy="242" r="1.5" fill="#00529b" />
          <circle cx="206" cy="242" r="1.5" fill="#00529b" />
        </motion.g>

        {/* Plant / Leaves Left */}
        <motion.g
          {...leafAnimation(0.2)}
          style={{ originX: "115px", originY: "265px" }}
        >
          {/* Stem Left */}
          <path d="M110 265 Q115 240, 100 220" stroke="#00529b" strokeWidth="3" strokeLinecap="round" />

          {/* Leaves */}
          <path d="M100 220 C92 222, 88 232, 98 238 C108 236, 108 226, 100 220 Z" fill="#34d399" stroke="#00529b" strokeWidth="2" />
          <path d="M111 235 C115 225, 125 225, 122 237 C118 243, 109 240, 111 235 Z" fill="#10b981" stroke="#00529b" strokeWidth="2" />
          <path d="M107 250 C98 248, 96 258, 105 261 C112 260, 112 252, 107 250 Z" fill="#059669" stroke="#00529b" strokeWidth="2" />
        </motion.g>

        {/* Plant / Leaves Right */}
        <motion.g
          {...leafAnimation(0.6)}
          style={{ originX: "285px", originY: "265px" }}
        >
          {/* Stem Right */}
          <path d="M290 265 Q285 235, 302 215" stroke="#00529b" strokeWidth="3" strokeLinecap="round" />

          {/* Leaves */}
          <path d="M302 215 C310 217, 314 227, 304 233 C294 231, 294 221, 302 215 Z" fill="#34d399" stroke="#00529b" strokeWidth="2" />
          <path d="M289 230 C285 220, 275 220, 278 232 C282 238, 291 235, 289 230 Z" fill="#10b981" stroke="#00529b" strokeWidth="2" />
          <path d="M293 248 C302 246, 304 256, 295 259 C288 258, 288 250, 293 248 Z" fill="#059669" stroke="#00529b" strokeWidth="2" />
        </motion.g>

        {/* Foreground dynamic floating particles */}
        <motion.circle
          cx="140"
          cy="110"
          r="4"
          fill="#c8102e"
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="270"
          cy="95"
          r="3"
          fill="#f59e0b"
          animate={{ y: [0, -8, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.circle
          cx="100"
          cy="180"
          r="5"
          fill="#34d399"
          animate={{ y: [0, -12, 0], opacity: [0.1, 0.7, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </svg>
    </div>
  );
};

export default CreateDepartmentIllustration;
