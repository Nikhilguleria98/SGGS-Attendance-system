import React from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/**
 * CreateDepartmentHeader component
 * Displays a styled back button and the page title.
 * 
 * @param {Object} props
 * @param {Function} [props.onBack] - Optional custom handler for back click. If not provided, falls back to useNavigate(-1).
 */
const CreateDepartmentHeader = ({ onBack }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center gap-4 mb-6 md:mb-8"
    >
      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.08, backgroundColor: "#f3f4f6" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleBackClick}
        className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm hover:text-[#c8102e] hover:border-[#c8102e]/30 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#c8102e]"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5" />
      </motion.button>

      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
        Create Department
      </h1>
    </motion.div>
  );
};

export default CreateDepartmentHeader;
