import { useState } from "react";
import {
  X,
  User,
  Users,
  GraduationCap,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginDrawer = ({ isOpen, onClose }) => {
  const [selectedRole, setSelectedRole] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

const handleLoginSubmit = async (e) => {
  e.preventDefault();

  // HOD Login from backend
  if (selectedRole === "HOD") {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier,
            password,
            role: selectedRole,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        toast.error("Wrong email or password");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/hod/dashboard");
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Server Error. Please try again.");
    }

    return;
  }

  // Temporary Teacher Login
  if (selectedRole === "Teacher") {
    localStorage.setItem("role", "teacher");
    navigate("/teacher/dashboard");
    onClose();
    return;
  }

  // Temporary Student Login
  if (selectedRole === "Student") {
    localStorage.setItem("role", "student");
    navigate("/student/dashboard");
    onClose();
    return;
  }
};

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

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full md:w-[850px] h-full bg-white shadow-2xl flex flex-col md:flex-row z-50 overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
            >
              <X size={24} />
            </button>

            {/* Left Side */}
            <div className="hidden md:flex w-5/12 items-center justify-center bg-gray-100">
              <div className="text-center">
                <h2 className="text-2xl font-bold">
                  SGGS World University
                </h2>
                <p className="text-gray-500 mt-2">
                  Attendance Management System
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">
                  Welcome Back
                </h2>
                <p className="text-gray-500 mt-2">
                  Login to continue
                </p>
              </div>

              {/* Role Selection */}
              <div className="mb-6">
                <p className="font-semibold mb-3">
                  Login As
                </p>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("HOD")}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center ${
                      selectedRole === "HOD"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >
                    <User size={35} />
                    <span className="mt-2">HOD</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole("Teacher")}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center ${
                      selectedRole === "Teacher"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <Users size={35} />
                    <span className="mt-2">Teacher</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole("Student")}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center ${
                      selectedRole === "Student"
                        ? "border-black bg-gray-50"
                        : "border-gray-200"
                    }`}
                  >
                    <GraduationCap size={35} />
                    <span className="mt-2">Student</span>
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-400" />

                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) =>
                      setIdentifier(e.target.value)
                    }
                    required
                    placeholder="Enter Email / ID"
                    className="w-full pl-10 pr-3 py-3 border rounded-lg outline-none"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                    placeholder="Enter Password"
                    className="w-full pl-10 pr-10 py-3 border rounded-lg outline-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-3"
                  >
                    {showPassword ? (
                      <EyeOff />
                    ) : (
                      <Eye />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00529b] text-white py-3 rounded-lg font-bold"
                >
                  Login
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginDrawer;