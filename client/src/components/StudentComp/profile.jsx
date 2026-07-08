import React, { useState, useEffect } from "react";
import { Mail, Edit2, Save, X } from "lucide-react";

// ============================================================
// Main Component: StudentProfile
// ============================================================
const StudentProfile = () => {
  // ---------- State ----------
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // ---------- Side Effects: Fetch user profile on mount ----------
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users/${payload.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          const data = await response.json();
          if (data.success) {
            setUserData(data.data);
            setFormData({
              firstName: data.data.firstName || "",
              lastName: data.data.lastName || "",
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

  // ---------- Event Handlers ----------
  // Update form field state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Persist edited profile fields to the backend
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );
      const data = await response.json();
      if (data.success) {
        setIsEditing(false);
        setUserData(data.data); // Update locally
        const existingUser = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem(
          "user",
          JSON.stringify({ ...existingUser, ...data.data }),
        );
      } else {
        alert(data.message || "Failed to update");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // ---------- Derived Values ----------
  // Early return: loading state
  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500">Loading profile...</div>
    );
  }

  // Early return: error state when profile could not be loaded
  if (!userData) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load profile data.
      </div>
    );
  }

  const name = userData.firstName + " " + (userData.lastName || "");
  const departmentName =
    userData.department?.name || userData.department || "N/A";

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-[#F4F5F7] p-6">
      <div className="max-w-7xl mx-auto">
        {/* ---------- Page Header ---------- */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-[34px] font-bold text-[#102B63]">
              Student Profile
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              View your academic and personal information
            </p>
          </div>

          {/* Edit / Save / Cancel action buttons */}
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-[#102B63] text-white px-4 py-2 rounded-lg hover:bg-[#0E2555]"
            >
              <Edit2 size={16} /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-1 text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-lg"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1 bg-[#102B63] text-white px-4 py-2 rounded-lg hover:bg-[#0E2555]"
              >
                <Save size={16} /> Save
              </button>
            </div>
          )}
        </div>

        {/* ---------- Profile Banner (Avatar + Identity) ---------- */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm h-[220px] flex items-center px-10 mb-8">
          <div className="flex items-center gap-8">
            {/* Avatar with online status indicator */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt="student"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-md flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                )}
              </div>

              <input
                type="file"
                id="studentPhotoUpload"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  if (file.size > 5 * 1024 * 1024) {
                    return alert("File size must be less than 5MB");
                  }

                  const reader = new FileReader();

                  reader.onloadend = async () => {
                    const token = localStorage.getItem("token");

                    try {
                      const res = await fetch(
                        `${import.meta.env.VITE_API_URL}/users/${userData._id}`,
                        {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({
                            avatar: reader.result,
                          }),
                        },
                      );

                      const data = await res.json();

                      if (data.success) {
                        setUserData((prev) => ({
                          ...prev,
                          avatar: reader.result,
                        }));
                      } else {
                        alert("Failed to update profile photo");
                      }
                    } catch (err) {
                      console.error(err);
                      alert("Server error");
                    }
                  };

                  reader.readAsDataURL(file);
                }}
              />

              <button
                onClick={() =>
                  document.getElementById("studentPhotoUpload").click()
                }
                className="mt-4 bg-[#102B63] text-white px-5 py-2 rounded-lg text-sm hover:bg-[#0E2555]"
              >
                Upload Photo
              </button>
            </div>

            {/* Identity (Name, Role, Department) */}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[30px] font-bold text-[#102B63]">{name}</h2>
              </div>
              <p className="text-[#D90429] text-lg font-semibold">Student</p>
              <p className="text-gray-600 text-sm mt-2">
                Department: {departmentName || "N/A"}
              </p>
              <p className="text-gray-500 text-sm">
                Roll No: {userData.rollNumber || "N/A"}
              </p>
              <p className="text-gray-500 text-sm">
                Semester {userData.semester || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Main Content Grid ---------- */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left column: Personal + Academic info */}
          <div className="lg:col-span-3 space-y-6">
            {/* Personal Information Card (editable) */}
            <Card title="Personal Information">
              {isEditing ? (
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm text-gray-500">First Name</span>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border rounded"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-500">Last Name</span>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full mt-1 p-2 border rounded"
                    />
                  </label>
                </div>
              ) : (
                <InfoGrid data={[["Full Name", name]]} />
              )}
            </Card>

            {/* Academic Information Card (read-only) */}
            <Card title="Academic Information">
              <InfoGrid
                data={[
                  ["Department", departmentName],
                  ["Semester", userData.semester || "N/A"],
                  ["Section", userData.section || "N/A"],
                  ["Batch", userData.batch || "N/A"],
                ]}
              />
            </Card>
          </div>

          {/* Right column: Profile Photo + Contact info */}
          <div className="space-y-6">
            {/* Profile Photo Card with upload / remove
            <Card title="Profile Photo">
              
            </Card> */}

            {/* Contact Information Card */}
            <Card title="Contact Information">
              <div className="space-y-5">
                <div className="flex gap-3 items-center">
                  <Mail size={18} className="text-[#102B63]" />
                  <div>
                    <p className="text-xs text-gray-500">Official Email</p>
                    <p className="font-semibold text-sm break-all">
                      {userData.email}
                    </p>
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

// ============================================================
// Sub-Component: Card
// Reusable white container with a title and body content
// ============================================================
const Card = ({ title, children }) => (
  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
    <h2 className="text-[20px] font-bold text-[#102B63] mb-6">{title}</h2>
    {children}
  </div>
);

// ============================================================
// Sub-Component: InfoGrid
// Renders a list of [label, value] pairs in a 2-column grid
// ============================================================
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
