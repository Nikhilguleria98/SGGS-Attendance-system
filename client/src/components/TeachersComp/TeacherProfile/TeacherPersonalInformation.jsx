import React, { useState, useEffect } from 'react';
import { Edit2, Save, X, CheckCircle } from 'lucide-react';

const TeacherPersonalInformation = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'Male',
    dob: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || 'Male',
        dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setIsEditing(false);
        setShowSuccess(true);
        const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({ ...existingUser, ...data.data }));
        setTimeout(() => {
          setShowSuccess(false);
          window.location.reload();
        }, 1500);
      } else {
        alert(data.message || "Failed to update");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(22,43,74,0.06)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#162b4a]">Personal Information</h3>
          <p className="mt-1 text-sm text-slate-500">Ensure faculty details stay current and polished.</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-xl border border-[#c00021]/15 bg-[#fff1f3] p-2 text-[#c00021] transition-colors hover:bg-[#ffe4e9]"
          >
            <Edit2 size={18} />
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-100"
            >
              <X size={16} /> Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1 rounded-lg bg-[#162b4a] px-3 py-1.5 text-sm text-white transition-colors hover:bg-[#0f1d33]"
            >
              <Save size={16} /> Save
            </button>
          </div>
        )}
      </div>

      {showSuccess && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          <CheckCircle size={16} /> Personal information updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-500">First Name</label>
          {isEditing ? (
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-2.5 outline-none transition focus:border-[#162b4a] focus:ring-2 focus:ring-[#162b4a]/10" />
          ) : (
            <p className="font-medium text-slate-900">{formData.firstName || '-'}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-500">Last Name</label>
          {isEditing ? (
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-2.5 outline-none transition focus:border-[#162b4a] focus:ring-2 focus:ring-[#162b4a]/10" />
          ) : (
            <p className="font-medium text-slate-900">{formData.lastName || '-'}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-500">Official Email</label>
          {isEditing ? (
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-2.5 outline-none transition focus:border-[#162b4a] focus:ring-2 focus:ring-[#162b4a]/10" />
          ) : (
            <p className="font-medium text-slate-900">{formData.email || '-'}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-500">Phone Number</label>
          {isEditing ? (
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-2.5 outline-none transition focus:border-[#162b4a] focus:ring-2 focus:ring-[#162b4a]/10" />
          ) : (
            <p className="font-medium text-slate-900">{formData.phone || '-'}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-500">Gender</label>
          {isEditing ? (
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-2.5 outline-none transition focus:border-[#162b4a] focus:ring-2 focus:ring-[#162b4a]/10">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="font-medium text-slate-900">{formData.gender || '-'}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-500">Date of Birth</label>
          {isEditing ? (
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-2.5 outline-none transition focus:border-[#162b4a] focus:ring-2 focus:ring-[#162b4a]/10" />
          ) : (
            <p className="font-medium text-slate-900">{formData.dob ? new Date(formData.dob).toLocaleDateString() : '-'}</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default TeacherPersonalInformation;
