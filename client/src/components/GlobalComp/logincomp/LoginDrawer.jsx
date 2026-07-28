import { useState } from "react";
import { X, User, Users, GraduationCap, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
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

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
          role: selectedRole,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.message || "Invalid credentials");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "hod") {
        navigate("/hod/dashboard");
      } else if (data.user.role === "teacher") {
        navigate("/teacher/dashboard");
      } else if (data.user.role === "student") {
        navigate("/student/dashboard");
      }

      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Server Error. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative z-50 flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl md:w-[900px] md:flex-row"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 transition hover:bg-slate-200"
            >
              <X size={20} />
            </button>

            <div className="hidden w-5/12 items-center justify-center bg-[linear-gradient(135deg,_#162b4a_0%,_#0f1d33_100%)] p-8 text-white md:flex">
              <div className="max-w-sm text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
                  <ShieldCheck size={28} />
                </div>
                <h2 className="text-3xl font-bold">SGGS World University</h2>
                <p className="mt-3 text-sm leading-7 text-slate-200">Attendance Management System crafted for modern academic administration.</p>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fbff_100%)] p-8 md:p-12">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
                <p className="mt-2 text-sm text-slate-500">Access your dashboard with secure credentials.</p>
              </div>

              <div className="mb-6">
                <p className="mb-3 text-sm font-semibold text-slate-700">Login As</p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("HOD")}
                    className={`flex flex-col items-center rounded-2xl border p-3 text-sm font-medium transition ${selectedRole === "HOD" ? "border-[#c00021] bg-[#fff1f3] text-[#c00021] shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-[#162b4a]/40"}`}
                  >
                    <User size={28} />
                    <span className="mt-2">HOD</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole("Teacher")}
                    className={`flex flex-col items-center rounded-2xl border p-3 text-sm font-medium transition ${selectedRole === "Teacher" ? "border-[#162b4a] bg-[#eef4ff] text-[#162b4a] shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-[#162b4a]/40"}`}
                  >
                    <Users size={28} />
                    <span className="mt-2">Teacher</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole("Student")}
                    className={`flex flex-col items-center rounded-2xl border p-3 text-sm font-medium transition ${selectedRole === "Student" ? "border-[#162b4a] bg-[#f5f7fb] text-slate-800 shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-[#162b4a]/40"}`}
                  >
                    <GraduationCap size={28} />
                    <span className="mt-2">Student</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                    placeholder="Enter Email / ID"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-[#162b4a] focus:ring-2 focus:ring-[#162b4a]/10"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter Password"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm outline-none transition focus:border-[#c00021] focus:ring-2 focus:ring-[#c00021]/10"
                  />

                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-500">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="text-right">
                  <a href="#" className="text-sm font-medium text-[#162b4a] hover:text-[#c00021]">Forgot Password?</a>
                </div>

                <button type="submit" className="w-full rounded-xl bg-[linear-gradient(135deg,_#162b4a_0%,_#c00021_100%)] py-3 font-semibold text-white shadow-lg shadow-slate-300 transition hover:opacity-95">
                  Login
                </button>
              </form>

              <p className="mt-8 text-center text-xs text-slate-400">© 2026 College Attendance System</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginDrawer;