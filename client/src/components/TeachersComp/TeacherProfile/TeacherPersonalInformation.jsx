import React, { useState, useEffect } from 'react';
import { Edit2, Save, X, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const TeacherPersonalInformation = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
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
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (formData.dob) {
      const dobDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();
      if (age < 10 || age > 100) {
        newErrors.dob = "Invalid date of birth";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) {
      toast.error("Please fix the errors before saving");
      return;
    }
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
        toast.error(data.message || "Failed to update");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
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
              onClick={() => { setIsEditing(false); setErrors({}); }}
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
            <div>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={`w-full border rounded-lg p-2 outline-none focus:border-[#162b4a] ${errors.firstName ? 'border-red-400' : 'border-gray-300'}`} />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
          ) : (
            <p className="text-gray-900 font-medium">{formData.firstName || '-'}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
          {isEditing ? (
            <div>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={`w-full border rounded-lg p-2 outline-none focus:border-[#162b4a] ${errors.lastName ? 'border-red-400' : 'border-gray-300'}`} />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          ) : (
            <p className="text-gray-900 font-medium">{formData.lastName || '-'}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Official Email</label>
          {isEditing ? (
            <div>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full border rounded-lg p-2 outline-none focus:border-[#162b4a] ${errors.email ? 'border-red-400' : 'border-gray-300'}`} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          ) : (
            <p className="text-gray-900 font-medium">{formData.email || '-'}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
          {isEditing ? (
            <div>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} inputMode="numeric" pattern="[0-9]*" placeholder="10-digit number" className={`w-full border rounded-lg p-2 outline-none focus:border-[#162b4a] ${errors.phone ? 'border-red-400' : 'border-gray-300'}`} />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
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
            <div>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={`w-full border rounded-lg p-2 outline-none focus:border-[#162b4a] ${errors.dob ? 'border-red-400' : 'border-gray-300'}`} />
              {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
            </div>
          ) : (
            <p className="text-gray-900 font-medium">{formData.dob ? new Date(formData.dob).toLocaleDateString() : '-'}</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default TeacherPersonalInformation;
