import { useState } from "react";
import { X, User, Users, GraduationCap, Lock, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LoginDrawer = ({ isOpen, onClose }) => {
  const [selectedRole, setSelectedRole] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full md:w-[850px] h-full bg-white shadow-2xl flex flex-col md:flex-row z-50 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Left Side - Image/Branding (Hidden on small mobile) */}
            <div 
              className="hidden md:flex flex-col items-center justify-center w-5/12 bg-cover bg-center relative p-8 text-center"
              style={{ backgroundImage: "url('/path-to-your-university-building-image.jpg')" }} 
            >
              <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-[2px]"></div>
              <div className="relative z-10 bg-white/90 p-6 rounded-xl shadow-lg border border-white/50">
                <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-xs text-gray-500">Logo Here</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">SRI GURU GRANTH SAHIB</h2>
                <h3 className="text-lg font-semibold text-gray-700">WORLD UNIVERSITY</h3>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center h-full overflow-y-auto">
              <div className="text-center mb-8 mt-6 md:mt-0">
                <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back!</h2>
                <p className="text-gray-500 mt-2">Login to Continue to your account</p>
              </div>

              <div className="mb-6">
                <p className="font-semibold text-gray-800 mb-3">Login As</p>
                <div className="grid grid-cols-3 gap-3">
                  
                  {/* Role: HOD */}
                  <button
                    onClick={() => setSelectedRole("HOD")}
                    className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                      selectedRole === "HOD" ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"
                    }`}
                  >
                    <User size={36} className={selectedRole === "HOD" ? "text-green-500" : "text-gray-400"} />
                    <span className={`mt-2 font-bold text-sm ${selectedRole === "HOD" ? "text-green-600" : "text-gray-500"}`}>HOD</span>
                  </button>

                  {/* Role: Teacher */}
                  <button
                    onClick={() => setSelectedRole("Teacher")}
                    className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                      selectedRole === "Teacher" ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <Users size={36} className={selectedRole === "Teacher" ? "text-blue-600" : "text-gray-400"} />
                    <span className={`mt-2 font-bold text-sm ${selectedRole === "Teacher" ? "text-blue-700" : "text-gray-500"}`}>Teacher</span>
                  </button>

                  {/* Role: Student */}
                  <button
                    onClick={() => setSelectedRole("Student")}
                    className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                      selectedRole === "Student" ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <GraduationCap size={36} className={selectedRole === "Student" ? "text-black" : "text-gray-400"} />
                    <span className={`mt-2 font-bold text-sm ${selectedRole === "Student" ? "text-black" : "text-gray-500"}`}>Student</span>
                  </button>

                </div>
              </div>

              {/* Form Inputs */}
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all outline-none"
                    placeholder="Enter Email / ID"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all outline-none"
                    placeholder="Enter Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="font-medium">Remember me</span>
                  </label>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                    Forgot Password
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold py-3.5 rounded-lg shadow-md transition-colors mt-4"
                >
                  Login
                </button>
              </form>

              <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account? <a href="#" className="font-bold text-blue-600 hover:underline">Register Now</a>
              </p>
              
              <p className="text-center text-xs text-gray-400 mt-auto pt-8">
                @ 2026 college Attendance System
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginDrawer;