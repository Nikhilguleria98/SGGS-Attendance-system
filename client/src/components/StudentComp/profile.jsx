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
        const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({ ...existingUser, ...data.data }));
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
              {userData.avatar ? (
                <img src={userData.avatar} alt="student" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md" />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-md flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
              )}
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
                <div className="w-40 h-40 rounded-full border-4 border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center mb-6">
                  {userData.avatar ? (
                    <img src={userData.avatar} alt="student" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-20 h-20 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="file" 
                    id="studentPhotoUpload" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > 5 * 1024 * 1024) return alert("File size must be less than 5MB");
                      const reader = new FileReader();
                      reader.onloadend = async () => {
                        const token = localStorage.getItem("token");
                        try {
                          const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userData._id}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                            body: JSON.stringify({ avatar: reader.result })
                          });
                          const data = await res.json();
                          if (data.success) {
                            const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
                            localStorage.setItem("user", JSON.stringify({ ...existingUser, avatar: reader.result }));
                            window.location.reload();
                          } else { alert("Failed to update"); }
                        } catch (err) { console.error(err); alert("Server error"); }
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                  <button 
                    onClick={() => document.getElementById('studentPhotoUpload').click()}
                    className="bg-[#102B63] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#0E2555]"
                  >
                    Upload Photo
                  </button>
                  {userData.avatar && (
                    <button 
                      onClick={async () => {
                        if (confirm("Remove profile picture?")) {
                          const token = localStorage.getItem("token");
                          const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userData._id}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                            body: JSON.stringify({ avatar: "" })
                          });
                          if (res.ok) {
                            const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
                            localStorage.setItem("user", JSON.stringify({ ...existingUser, avatar: "" }));
                            window.location.reload();
                          }
                        }
                      }}
                      className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-100"
                    >
                      Remove
                    </button>
                  )}
                </div>
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
