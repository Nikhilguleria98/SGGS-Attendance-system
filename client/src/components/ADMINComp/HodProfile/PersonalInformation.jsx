import React, { useState, useEffect } from 'react';
import { Edit2, Save, X, CheckCircle } from 'lucide-react';

const PersonalInformation = ({ user }) => {
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#162b4a]">Personal Information</h3>
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
              className="flex items-center gap-1 bg-[#162b4a] text-white px-3 py-1.5 rounded-lg transition-colors text-sm hover:bg-[#0f1d33]"
            >
              <Save size={16} /> Save
            </button>
          </div>
        )}
      </div>

      {showSuccess && (
        <div className="mb-4 bg-green-50 text-green-700 p-3 rounded-lg flex items-center gap-2 border border-green-100 text-sm">
          <CheckCircle size={16} /> Personal information updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
          {isEditing ? (
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a]" />
          ) : (
            <p className="text-gray-900 font-medium">{formData.firstName || '-'}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
          {isEditing ? (
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a]" />
          ) : (
            <p className="text-gray-900 font-medium">{formData.lastName || '-'}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Official Email</label>
          {isEditing ? (
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a]" />
          ) : (
            <p className="text-gray-900 font-medium">{formData.email || '-'}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
          {isEditing ? (
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a]" />
          ) : (
            <p className="text-gray-900 font-medium">{formData.phone || '-'}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
          {isEditing ? (
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a]">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-gray-900 font-medium">{formData.gender || '-'}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
          {isEditing ? (
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a]" />
          ) : (
            <p className="text-gray-900 font-medium">{formData.dob ? new Date(formData.dob).toLocaleDateString() : '-'}</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default PersonalInformation;
