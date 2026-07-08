import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus } from 'lucide-react';
import MultiSelect from '../Common/MultiSelect';

export default function TeacherModal({ isOpen, onClose, initialData, onSave, departments = [], batches = [], groups = [], isSaving }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    departments: [],
  });

  const [subjectsOptions, setSubjectsOptions] = useState([]);

  // State for the dynamic subject assignment rows
  const [assignments, setAssignments] = useState([
    { id: Date.now(), batches: [], groups: [], subjects: [] }
  ]);

  useEffect(() => {
    if (isOpen) {
      // Fetch dynamic subjects
      const fetchSubjects = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await fetch(`${import.meta.env.VITE_API_URL}/subjects`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
            setSubjectsOptions(data.data.map(sub => ({
              label: sub.name,
              value: sub.name
            })));
          }
        } catch (error) {
          console.error("Failed to fetch subjects", error);
        }
      };
      
      fetchSubjects();

      if (initialData) {
        setFormData({
          firstName: initialData.firstName || '',
          lastName: initialData.lastName || '',
          email: initialData.email || '',
          password: '', // blank password on edit
          departments: initialData.departments || (initialData.department ? [typeof initialData.department === 'object' ? initialData.department._id : initialData.department] : [])
        });
        
        // Mock assignments based on initialData for demo purposes, if stored
        setAssignments([{ 
          id: Date.now(), 
          batches: initialData.batches || [], 
          groups: initialData.groups || [], 
          subjects: initialData.subjects || [] 
        }]);
      } else {
        setFormData({ firstName: '', lastName: '', email: '', password: '', departments: [] });
        setAssignments([{ id: Date.now(), batches: [], groups: [], subjects: [] }]);
      }
    }
  }, [isOpen, initialData, departments]);

  if (!isOpen) return null;

  const handleAddAssignment = () => {
    setAssignments([...assignments, { id: Date.now(), batches: [], groups: [], subjects: [] }]);
  };

  const handleRemoveAssignment = (id) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  const updateAssignment = (id, field, value) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const handleNameChange = (field, value) => {
    if (/\d/.test(value)) return;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    const allSubjects = [...new Set(assignments.flatMap(a => a.subjects))];
    const allBatches = [...new Set(assignments.flatMap(a => a.batches).filter(Boolean))];
    const allGroups = [...new Set(assignments.flatMap(a => a.groups).filter(Boolean))];

    const finalData = { ...formData, subjects: allSubjects, batches: allBatches, groups: allGroups, assignments };
    
    // Remove password if blank (for edits)
    if (!finalData.password) {
      delete finalData.password;
    }

    onSave(finalData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#162b4a]">
            {initialData ? 'Edit Teacher' : 'Add Teacher'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 pb-48 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={formData.firstName}
                onChange={e => handleNameChange('firstName', e.target.value)}
                placeholder="First name" 
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#162b4a]" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={formData.lastName}
                onChange={e => handleNameChange('lastName', e.target.value)}
                placeholder="Last name" 
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#162b4a]" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="Enter email" 
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#162b4a]" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password {!initialData && <span className="text-red-500">*</span>}
              </label>
              <input 
                type="password" 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                placeholder={initialData ? "Leave blank to keep" : "Enter password"} 
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#162b4a]" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <MultiSelect 
                options={departments.map(dept => ({ label: dept.name, value: dept._id }))}
                selected={formData.departments}
                onChange={val => setFormData({...formData, departments: val})}
                placeholder="Select departments"
              />
            </div>
          </div>

          {/* Dynamic Assignments Row */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Assign Subjects (Batch - Group wise)</h3>
            
            <div className="bg-white rounded-lg border border-gray-100 overflow-visible mb-4">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="py-3 px-4 font-semibold text-gray-700 w-12 text-center">#</th>
                    <th className="py-3 px-4 font-semibold text-gray-700 w-1/5">Batch <span className="text-red-500">*</span></th>
                    <th className="py-3 px-4 font-semibold text-gray-700 w-1/5">Group <span className="text-red-500">*</span></th>
                    <th className="py-3 px-4 font-semibold text-gray-700 w-2/5">Subjects <span className="text-red-500">*</span></th>
                    <th className="py-3 px-4 font-semibold text-gray-700 w-16 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((assignment, index) => (
                    <tr key={assignment.id} className="border-b border-gray-50 last:border-none">
                      <td className="py-3 px-4 text-center font-medium text-gray-500">{index + 1}</td>
                      <td className="py-3 px-2">
                        <MultiSelect 
                          options={batches.map(b => ({ label: b.name, value: b.name }))}
                          selected={assignment.batches}
                          onChange={(val) => updateAssignment(assignment.id, 'batches', val)}
                          placeholder="Select batches"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <MultiSelect 
                          options={groups.map(g => ({ label: g.name, value: g.name }))}
                          selected={assignment.groups}
                          onChange={(val) => updateAssignment(assignment.id, 'groups', val)}
                          placeholder="Select groups"
                        />
                      </td>

                      <td className="py-3 px-2">
                        <MultiSelect 
                          options={subjectsOptions.length ? subjectsOptions : [{label: 'Loading...', value: ''}]}
                          selected={assignment.subjects}
                          onChange={(val) => updateAssignment(assignment.id, 'subjects', val)}
                          placeholder="Select subjects"
                        />
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button 
                          onClick={() => handleRemoveAssignment(assignment.id)}
                          disabled={assignments.length === 1}
                          className="text-[#c00021] hover:bg-red-50 p-2 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button 
              onClick={handleAddAssignment}
              className="flex items-center gap-2 text-blue-600 border border-blue-200 border-dashed rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              <Plus size={16} /> Add Another Assignment
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex items-center gap-3">
          <button 
            onClick={onClose}
            disabled={isSaving}
            className="px-6 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isSaving}
            className={`px-6 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
              isSaving ? 'bg-red-400 cursor-not-allowed' : 'bg-[#c00021] hover:bg-red-800'
            }`}
          >
            {isSaving ? 'Saving...' : (initialData ? 'Save Changes' : 'Save Teacher')}
          </button>
        </div>
      </div>
    </div>
  );
}
