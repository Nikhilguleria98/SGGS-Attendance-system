import React, { useState } from 'react';
import { Shield, Key, Edit2, Save, X } from 'lucide-react';

const TeacherAccountSecurity = ({ user }) => {
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
    <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(22,43,74,0.06)]">
      <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="rounded-xl bg-[#162b4a]/10 p-2.5 text-[#162b4a]">
          <Shield size={20} className="stroke-[2.5]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Account & Security</h3>
          <p className="text-sm text-slate-500">Keep faculty access secure and easy to manage.</p>
        </div>
      </div>

      <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-4">
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="absolute right-4 top-4 rounded-lg p-2 text-slate-500 transition-colors hover:bg-white hover:text-[#162b4a]">
            <Edit2 size={16} />
          </button>
        )}
        <div className="flex items-start gap-4">
          <div className="mt-1 rounded-lg border border-slate-200 bg-white p-2 text-slate-500">
            <Key size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-slate-700">Password</p>
            {isEditing ? (
              <div className="mt-2 space-y-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none transition focus:border-[#162b4a] focus:ring-2 focus:ring-[#162b4a]/10"
                />
                <div className="flex gap-2">
                  <button onClick={handleSave} disabled={isSaving} className="rounded-lg bg-[#162b4a] px-3 py-1.5 text-sm text-white transition-colors hover:bg-[#0f1d33] disabled:opacity-60">
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                  <button onClick={() => setIsEditing(false)} className="rounded-lg bg-slate-200 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:bg-slate-300">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-1 font-mono text-lg text-slate-600">••••••••</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TeacherAccountSecurity;