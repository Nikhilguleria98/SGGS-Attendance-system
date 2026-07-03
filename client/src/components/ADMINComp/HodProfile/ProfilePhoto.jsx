import React, { useState } from 'react';
import { Camera, Trash2, Upload } from 'lucide-react';

const ProfilePhoto= () => {
  const [photo, setPhoto] = useState("https://randomuser.me/api/portraits/men/32.jpg");

  const handlePhotoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newPhotoURL = URL.createObjectURL(e.target.files[0]);
      setPhoto(newPhotoURL);
    }
  };

  const handleRemovePhoto = () => {
    setPhoto("https://via.placeholder.com/150");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-[#162b4a] mb-6">  Profile Photo </h3>
      
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <img 
            src={photo} 
            alt="Profile Preview" 
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
          />
          <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-[#c00021] text-white p-2 rounded-full cursor-pointer hover:bg-[#a0001a] transition-colors border-2 border-white shadow-sm">
            <Camera size={16} />
          </label>
          <input 
            type="file" 
            id="photo-upload" 
            accept="image/*" 
            className="hidden" 
            onChange={handlePhotoUpload}
          />
        </div>
        
        <div className="flex flex-col w-full gap-3">
          <label htmlFor="photo-upload" className="flex items-center justify-center gap-2 bg-[#162b4a] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#0f1d33] transition-colors font-medium">
            <Upload size={18} />
            Upload New Photo
          </label>
          <button 
            onClick={handleRemovePhoto}
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <Trash2 size={18} className="text-[#c00021]" />
            Remove Photo
          </button>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Allowed formats: JPG, PNG, GIF. Max file size: 2MB.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhoto;
