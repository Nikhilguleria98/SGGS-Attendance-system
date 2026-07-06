import React, { useState, useEffect } from 'react';

const AddStudentForm = ({ onCancel, onSave, initialData, departments = [] }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    email: '',
    password: '',
    gender: '',
    department: '',
    batch: '',
    group: '',
    semester: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        rollNo: initialData.rollNo || initialData.rollNumber || '',
        email: initialData.email || '',
        password: '', // Blank on edit
        gender: initialData.gender || '',
        department: typeof initialData.department === 'object' ? initialData.department?._id : initialData.department || '',
        batch: initialData.batch || initialData.batches?.[0] || '',
        group: initialData.group || initialData.section || initialData.groups?.[0] || '',
        semester: initialData.semester || ''
      });
    } else if (departments.length > 0) {
      setFormData(prev => ({ ...prev, department: departments[0]._id }));
    }
  }, [initialData, departments]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = { ...formData };
    
    if (!finalData.password) {
      delete finalData.password;
    }
    
    // Convert batch and group to arrays if backend expects them, else leave as strings based on how user's model is structured.
    // For students, the backend might just accept string fields, or we might need to send them as arrays. We will send as is and the controller should handle it.
    
    onSave(finalData);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#162b4a] mb-2">{initialData ? 'Edit Student' : 'Add Student'}</h2>
        <p className="text-gray-500 text-sm">Enter student details.</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-lg font-semibold text-[#162b4a] whitespace-nowrap">Personal Information</h3>
            <div className="h-px bg-gray-200 w-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" name="firstName" value={formData.firstName} onChange={handleChange} required
                placeholder="First name" 
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#162b4a]" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" name="lastName" value={formData.lastName} onChange={handleChange} required
                placeholder="Last name" 
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#162b4a]" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Roll No. <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} required
                placeholder="Enter roll number" 
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#162b4a]" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" name="email" value={formData.email} onChange={handleChange} required
                placeholder="Enter email" 
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#162b4a]" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password {!initialData && <span className="text-red-500">*</span>}
              </label>
              <input 
                type="password" name="password" value={formData.password} onChange={handleChange} 
                required={!initialData}
                placeholder={initialData ? "Leave blank to keep" : "Enter password"} 
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#162b4a]" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select name="gender" value={formData.gender} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#162b4a]"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Academic Information Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-lg font-semibold text-[#162b4a] whitespace-nowrap">Academic Information</h3>
            <div className="h-px bg-gray-200 w-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <select name="department" value={formData.department} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#162b4a]"
              >
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>{dept.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batch <span className="text-red-500">*</span>
              </label>
              <select name="batch" value={formData.batch} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#162b4a]"
              >
                <option value="">Select batch</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Group <span className="text-red-500">*</span>
              </label>
              <select name="group" value={formData.group} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#162b4a]"
              >
                <option value="">Select group</option>
                <option value="A">Group A</option>
                <option value="B">Group B</option>
                <option value="C">Group C</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester / Year <span className="text-red-500">*</span>
              </label>
              <select name="semester" value={formData.semester} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-[#162b4a]"
              >
                <option value="">Select semester / year</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center gap-4 mt-8">
          <button 
            type="button" onClick={onCancel}
            className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-[#c00021] text-sm font-medium text-white hover:bg-red-800 transition-colors"
          >
            {initialData ? 'Save Changes' : 'Save Student'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;
