import React, { useState } from 'react';
import { Shield, Key, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const TeacherAccountSecurity = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!password || password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    setIsSaving(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ password })
      });
      const data = await response.json();
      if (data.success) {
        setIsEditing(false);
        setPassword("");
        setConfirmPassword("");
        toast.success("Password updated successfully!");
      } else {
        toast.error(data.message || "Failed to update password");
      }
    } catch (e) {
      toast.error("Failed to update password");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
        <div className="p-2.5 bg-blue-50 text-[#00529b] rounded-lg">
          <Shield size={20} className="stroke-[2.5]" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Account & Security</h3>
      </div>
      
      <div className="space-y-6">
        {/* Current Password Display */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-lg border border-gray-100 text-gray-400">
              <Key size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">Password</p>
              <p className="text-gray-500 font-mono mt-0.5 text-lg">••••••••</p>
            </div>
          </div>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#00529b] hover:bg-[#003d73] text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-[#00529b]/20"
            >
              <Key size={16} />
              Update Password
            </button>
          )}
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password (min 8 characters)"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#00529b]/20 focus:border-[#00529b]"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#00529b]/20 focus:border-[#00529b]"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button 
                onClick={handleSave} 
                disabled={isSaving}
                className="px-5 py-2.5 bg-[#00529b] hover:bg-[#003d73] text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-[#00529b]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save Password'}
              </button>
              <button 
                onClick={() => { setIsEditing(false); setPassword(""); setConfirmPassword(""); }} 
                className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl text-sm transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default TeacherAccountSecurity;
