import React, { useState, useEffect } from "react";
import { CheckCircle, Phone, Mail, Edit2, Save, X } from "lucide-react";

const StudentProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${payload.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          if (data.success) {
            setUserData(data.data);
            setFormData({
              firstName: data.data.firstName || "",
              lastName: data.data.lastName || "",
              bloodGroup: data.data.bloodGroup || "",
              religion: data.data.religion || "",
              dob: data.data.dob ? new Date(data.data.dob).toISOString().split('T')[0] : "",
              category: data.data.category || "",
              address: data.data.address || "",
              phone: data.data.phone || "",
            });
          }
        } catch (error) {
          console.error("Failed to fetch profile", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userData._id}`, {
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
        setUserData(data.data); // Update locally
      } else {
        alert(data.message || "Failed to update");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
  }

  if (!userData) {
    return <div className="p-8 text-center text-red-500">Failed to load profile data.</div>;
  }

  const name = userData.firstName + " " + (userData.lastName || "");
  const departmentName = userData.department?.name || userData.department || "N/A";
  
  return (
    <div className="min-h-screen bg-[#F4F5F7] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-[34px] font-bold text-[#102B63]">Student Profile</h1>
            <p className="text-gray-500 text-sm mt-1">View your academic and personal information</p>
          </div>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-[#102B63] text-white px-4 py-2 rounded-lg hover:bg-[#0E2555]">
              <Edit2 size={16} /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(false)} className="flex items-center gap-1 text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg">
                <X size={16} /> Cancel
              </button>
              <button onClick={handleSave} className="flex items-center gap-1 bg-[#102B63] text-white px-4 py-2 rounded-lg hover:bg-[#0E2555]">
                <Save size={16} /> Save
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm h-[220px] flex items-center px-10 mb-8">
          <div className="flex items-center gap-8">
            <div className="relative">
              <img src={userData.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=500"} alt="student" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md" />
              <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[30px] font-bold text-[#102B63]">{name}</h2>
                <CheckCircle size={22} className="text-blue-500" />
              </div>
              <p className="text-[#D90429] text-lg font-semibold">Student</p>
              <p className="text-gray-600 text-sm mt-2">Department: {departmentName}</p>
              <p className="text-gray-500 text-sm">Roll No: {userData.rollNumber || "N/A"}</p>
              <p className="text-gray-500 text-sm">Semester {userData.semester || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card title="Personal Information">
              {isEditing ? (
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="block"><span className="text-sm text-gray-500">First Name</span>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
                  </label>
                  <label className="block"><span className="text-sm text-gray-500">Last Name</span>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
                  </label>
                  <label className="block"><span className="text-sm text-gray-500">Date of Birth</span>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
                  </label>
                  <label className="block"><span className="text-sm text-gray-500">Phone</span>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
                  </label>
                  <label className="block md:col-span-2"><span className="text-sm text-gray-500">Address</span>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full mt-1 p-2 border rounded" />
                  </label>
                </div>
              ) : (
                <InfoGrid data={[
                  ["Full Name", name],
                  ["Blood Group", userData.bloodGroup || "N/A"],
                  ["Religion", userData.religion || "N/A"],
                  ["Date of Birth", userData.dob ? new Date(userData.dob).toLocaleDateString() : "N/A"],
                  ["Category", userData.category || "N/A"],
                  ["Address", userData.address || "N/A"]
                ]} />
              )}
            </Card>
            <Card title="Academic Information">
              <InfoGrid data={[
                ["Program", userData.program || "N/A"],
                ["Department", departmentName],
                ["Semester", userData.semester || "N/A"],
                ["Section", userData.section || "N/A"],
                ["Batch", userData.batch || "N/A"]
              ]} />
            </Card>
          </div>
          <div className="space-y-6">
            <Card title="Profile Photo">
              <div className="flex flex-col items-center">
                <img src={userData.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=500"} alt="student" className="w-40 h-40 rounded-full object-cover border-4 border-gray-100" />
              </div>
            </Card>
            <Card title="Contact Information">
              <div className="space-y-5">
                <div className="flex gap-3 items-center">
                  <Phone size={18} className="text-[#102B63]" />
                  <div>
                    <p className="text-xs text-gray-500">Mobile Number</p>
                    <p className="font-semibold text-sm">{userData.phone || "N/A"}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <Mail size={18} className="text-[#102B63]" />
                  <div>
                    <p className="text-xs text-gray-500">Official Email</p>
                    <p className="font-semibold text-sm break-all">{userData.email}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, children }) => (
  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
    <h2 className="text-[20px] font-bold text-[#102B63] mb-6">{title}</h2>
    {children}
  </div>
);

const InfoGrid = ({ data }) => (
  <div className="grid md:grid-cols-2 gap-y-8 gap-x-16">
    {data.map(([label, value]) => (
      <div key={label}>
        <p className="text-gray-500 text-sm mb-1">{label}</p>
        <p className="text-[16px] font-semibold text-slate-900">{value}</p>
      </div>
    ))}
  </div>
);

export default StudentProfile;
