import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import DeleteConfirmationModal from '../Common/DeleteConfirmationModal';

const AddStudentForm = ({ onCancel, onSave, initialData, departments = [], batches = [], groups = [], isSaving }) => {
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

  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_URL}/semesters`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => { if (d.success) setSemesters(d.data); })
      .catch(console.error);
  }, []);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (initialData) {
      let mappedSemester = '';
      if (initialData.semester) {
        if (typeof initialData.semester === 'object') {
          mappedSemester = initialData.semester._id;
        } else {
          // If legacy number or string like "Semester 5", match to semesters array if loaded
          const parsed = Number(String(initialData.semester).replace(/\D/g, ""));
          if (!isNaN(parsed) && semesters.length > 0) {
            const matched = semesters.find(s => s.number === parsed || s.name === String(initialData.semester));
            mappedSemester = matched ? matched._id : initialData.semester;
          } else {
            mappedSemester = initialData.semester;
          }
        }
      }

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
        semester: mappedSemester
      });
    } else if (departments.length > 0) {
      setFormData(prev => ({ ...prev, department: departments[0]._id }));
    }
  }, [initialData, departments, semesters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'firstName' || name === 'lastName') && /\d/.test(value)) {
      toast.error('Please enter string only', { id: 'name-val' });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const processSave = () => {
    const finalData = { ...formData };
    if (!finalData.password) {
      delete finalData.password;
    }
    onSave(finalData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      setShowConfirmModal(true);
    } else {
      processSave();
    }
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
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} 
                  required={!initialData}
                  placeholder={initialData ? "Leave blank to keep" : "Enter password"} 
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#162b4a] pr-10" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
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
                {batches.map(b => (
                  <option key={b._id} value={b.name}>{b.name}</option>
                ))}
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
                {groups.map(g => (
                  <option key={g._id} value={g.name}>{g.name}</option>
                ))}
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
                {semesters.map((sem) => (
                  <option key={sem._id} value={sem._id}>{sem.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center gap-4 mt-8">
          <button 
            type="button" onClick={onCancel}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={isSaving}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-colors ${
              isSaving ? 'bg-red-400 cursor-not-allowed' : 'bg-[#c00021] hover:bg-red-800'
            }`}
          >
            {isSaving ? (initialData ? 'Updating...' : 'Saving...') : (initialData ? 'Save Changes' : 'Save Student')}
          </button>
        </div>
      </form>

      <DeleteConfirmationModal 
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          setShowConfirmModal(false);
          processSave();
        }}
        isDeleting={isSaving}
        title="Update Student"
        message={`Are you sure you want to update the details for ${formData.firstName}?`}
      />
    </div>
  );
};

export default AddStudentForm;
