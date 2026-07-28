import React from 'react';
import { useNavigate } from 'react-router-dom';

const actions = [
  { label: 'Add Teachers', color: 'bg-[#c00021] hover:bg-[#a0001a]', path: '/hod/teachers' },
  { label: 'Create Department', color: 'bg-[#162b4a] hover:bg-[#0f1d33]', path: '/hod/departments' },
  { label: 'Add Students', color: 'bg-[#c00021] hover:bg-[#a0001a]', path: '/hod/manage-students' },
  // { label: 'View Report', color: 'bg-[#c00021] hover:bg-[#a0001a]', path: '/teacher/reports' },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-8 mb-8">
      <h3 className="text-2xl font-bold text-[#1a2332] mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => navigate(action.path)}
            className={`${action.color} text-white font-medium py-3 px-4 rounded-xl shadow-sm transition-colors text-lg cursor-pointer`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
