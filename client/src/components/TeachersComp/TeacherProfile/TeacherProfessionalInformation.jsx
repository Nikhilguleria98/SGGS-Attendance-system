import React, { useState, useEffect } from 'react';
import { Edit2, Save, X, CheckCircle } from 'lucide-react';

const TeacherProfessionalInformation = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    employeeId: '',
    department: '',
    designation: '',
    role: '',
    joiningDate: '',
    specialization: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        employeeId: user.employeeId || '',
        department: user.department?.name || 'CSE',
        designation: user.designation || (user.role === 'hod' ? 'Head of Department' : 'Teacher'),
        role: user.role === 'hod' ? 'HOD' : user.role === 'teacher' ? 'Teacher' : user.role,
        joiningDate: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '',
        specialization: user.specialization || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ 
          designation: formData.designation, 
          specialization: formData.specialization 
        })
      });
      
      if (response.ok) {
        setIsEditing(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert("Failed to update professional information");
      }
    } catch (error) {
      alert("Failed to update professional information");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(22,43,74,0.06)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#162b4a]">Professional Information</h3>
          <p className="mt-1 text-sm text-slate-500">Current academic role and department details.</p>
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
              disabled={isSaving}
              className="flex items-center gap-1 rounded-lg bg-[#162b4a] px-3 py-1.5 text-sm text-white transition-colors hover:bg-[#0f1d33]"
            >
              <Save size={16} /> {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </div>

      {showSuccess && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          <CheckCircle size={16} /> Professional information updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <label className="mb-1 block text-sm font-medium text-slate-500">Employee ID</label>
          <p className="font-medium text-slate-900">{formData.employeeId || '-'}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <label className="mb-1 block text-sm font-medium text-slate-500">Department</label>
          <p className="font-medium text-slate-900">{formData.department || '-'}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <label className="mb-1 block text-sm font-medium text-slate-500">Designation</label>
          {isEditing ? (
            <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full rounded-xl border border-slate-200 p-2.5 outline-none transition focus:border-[#162b4a] focus:ring-2 focus:ring-[#162b4a]/10" />
          ) : (
            <p className="font-medium text-slate-900">{formData.designation || '-'}</p>
          )}
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <label className="mb-1 block text-sm font-medium text-slate-500">Role</label>
          <p className="font-medium capitalize text-slate-900">{formData.role || '-'}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-500">Joining Date</label>
          <p className="font-medium text-slate-900">{formData.joiningDate ? new Date(formData.joiningDate).toLocaleDateString() : '-'}</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfessionalInformation;
