import React, { useState } from 'react';
import { Eye, EyeOff, Save, CheckCircle } from 'lucide-react';

const AccountSecurity = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (passwords.new && passwords.new === passwords.confirm) {
      setShowSuccess(true);
      setPasswords({ current: '', new: '', confirm: '' });
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      alert("Passwords don't match or are empty!");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-[#162b4a] mb-6">Account & Security</h3>
      
      {showSuccess && (
        <div className="mb-6 bg-green-50 text-green-700 p-3 rounded-lg flex items-center gap-2 border border-green-100 text-sm">
          <CheckCircle size={16} /> Password changed successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
          <div className="relative">
            <input 
              type={showCurrent ? "text" : "password"} 
              name="current"
              value={passwords.current}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 pr-10 outline-none focus:border-[#162b4a]" 
              placeholder="••••••••"
            />
            <button 
              type="button" 
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <div className="relative">
            <input 
              type={showNew ? "text" : "password"} 
              name="new"
              value={passwords.new}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 pr-10 outline-none focus:border-[#162b4a]" 
              placeholder="••••••••"
            />
            <button 
              type="button" 
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
          <div className="relative">
            <input 
              type={showConfirm ? "text" : "password"} 
              name="confirm"
              value={passwords.confirm}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 pr-10 outline-none focus:border-[#162b4a]" 
              placeholder="••••••••"
            />
            <button 
              type="button" 
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <button 
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#c00021] text-white px-4 py-2 rounded-lg hover:bg-[#a0001a] transition-colors font-medium w-full sm:w-auto"
          >
            <Save size={18} />
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSecurity;
