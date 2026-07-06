import React, { useState } from 'react';
import { Shield, Key, Edit2, Save, X } from 'lucide-react';

const AccountSecurity = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!password || password.length < 8) return alert("Password must be at least 8 characters");
    setIsSaving(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ password })
      });
      if (response.ok) {
        setIsEditing(false);
        setPassword("");
        alert("Password updated successfully!");
      }
    } catch (e) {
      alert("Failed to update password");
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
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 relative">
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="absolute top-4 right-4 text-gray-400 hover:text-[#00529b]">
              <Edit2 size={16} />
            </button>
          )}
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white rounded-lg border border-gray-100 text-gray-400 mt-1">
              <Key size={18} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-700">Password</p>
              {isEditing ? (
                <div className="mt-2 space-y-2">
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 border rounded-md outline-none focus:border-[#00529b]"
                  />
                  <div className="flex gap-2">
                    <button onClick={handleSave} disabled={isSaving} className="bg-[#162b4a] text-white px-3 py-1 rounded text-sm hover:bg-[#0f1d33]">
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button onClick={() => setIsEditing(false)} className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 font-mono mt-1 text-lg">••••••••</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountSecurity;