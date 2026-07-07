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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#162b4a]">Professional Information</h3>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-[#c00021] hover:bg-[#c00021]/10 p-2 rounded-lg transition-colors"
          >
            <Edit2 size={18} />
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-1 text-gray-500 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors text-sm"
            >
              <X size={16} /> Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1 bg-[#162b4a] text-white px-3 py-1.5 rounded-lg transition-colors text-sm hover:bg-[#0f1d33]"
            >
              <Save size={16} /> {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </div>

      {showSuccess && (
        <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-lg flex items-center gap-2 border border-green-100 text-sm">
          <CheckCircle size={16} /> Professional information updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Employee ID</label>
          <p className="text-gray-900 font-medium">{formData.employeeId || '-'} <span className="text-xs text-gray-400 ml-2"></span></p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Department</label>
          <p className="text-gray-900 font-medium">{formData.department || '-'} <span className="text-xs text-gray-400 ml-2"></span></p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Designation</label>
          {isEditing ? (
            <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a]" />
          ) : (
            <p className="text-gray-900 font-medium">{formData.designation || '-'}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Role</label>
          <p className="text-gray-900 font-medium capitalize">{formData.role || '-'} <span className="text-xs text-gray-400 ml-2"></span></p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Joining Date</label>
          <p className="text-gray-900 font-medium">{formData.joiningDate ? new Date(formData.joiningDate).toLocaleDateString() : '-'} <span className="text-xs text-gray-400 ml-2"></span></p>
        </div>
        {/* <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Specialization</label>
          {isEditing ? (
            <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a]" />
          ) : (
            <p className="text-gray-900 font-medium">{formData.specialization || '-'}</p>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default TeacherProfessionalInformation;
