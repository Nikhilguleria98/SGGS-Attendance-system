import React from 'react';
import { Calendar } from 'lucide-react';

const AttendanceFilters = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
          <select className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700">
            <option>BCA</option>
            <option>MCA</option>
            <option>CSE</option>
          </select>
        </div>
       
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
          <select className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700">
            <option>Section A</option>
            <option>Section B</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <select className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700">
            <option>Data Structures</option>
            <option>Algorithms</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <div className="relative">
            <input 
              type="date" 
              className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700" 
              defaultValue="2025-07-03"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-1">
           <label className="block text-sm font-medium text-gray-700 mb-1">Lecture No.</label>
           <select className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700">
            <option>Lecture 1</option>
            <option>Lecture 2</option>
            <option>Lecture 3</option>
          </select>
        </div>
        <div className="lg:col-span-2">
           <label className="block text-sm font-medium text-gray-700 mb-1">Lecture Time (1 Hour)</label>
           <select className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:border-[#162b4a] text-sm text-gray-700">
            <option>9:00 AM - 10:00 AM</option>
            <option>10:00 AM - 11:00 AM</option>
            <option>11:00 AM - 12:00 PM</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AttendanceFilters;
