import React, { useRef, useState } from 'react';
import { Camera, Trash2, Upload } from 'lucide-react';

const TeacherProfilePhoto = ({ user }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      await updateAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveClick = async () => {
    if (confirm("Are you sure you want to remove your profile picture?")) {
      await updateAvatar("");
    }
  };

  const updateAvatar = async (base64String) => {
    setIsUploading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ avatar: base64String })
      });
      const data = await response.json();
      if (data.success) {
        const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({ ...existingUser, avatar: base64String }));
        window.location.reload();
      } else {
        alert(data.message || "Failed to update profile picture");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
      <div className="relative group mb-4">
        <div className="w-32 h-32 rounded-full border-4 border-gray-50 overflow-hidden bg-gray-100 flex items-center justify-center">
          {user?.avatar ? (
            <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <UserPlaceholder />
          )}
        </div>
      </div>
      <h3 className="font-bold text-gray-900">{user?.firstName} {user?.lastName}</h3>
      <p className="text-sm text-gray-500 mb-4">{user?.designation || user?.role || 'Head of Department'}</p>
      
      <div className="flex gap-2 w-full justify-center">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
        <button 
          onClick={handleUploadClick}
          disabled={isUploading}
          className="flex items-center gap-1 bg-[#162b4a] text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#0f1d33] transition-colors disabled:opacity-50"
        >
          <Upload size={14} /> {isUploading ? 'Uploading...' : 'Upload'}
        </button>
        {user?.avatar && (
          <button 
            onClick={handleRemoveClick}
            disabled={isUploading}
            className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-sm hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            <Trash2 size={14} /> Remove
          </button>
        )}
      </div>
    </div>
  );
};

const UserPlaceholder = () => (
  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export default TeacherProfilePhoto;
