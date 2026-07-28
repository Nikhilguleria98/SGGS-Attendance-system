import React, { useState, useEffect } from "react";
import { Mail, Edit2, Save, X } from "lucide-react";

// ============================================================
// Main Component: StudentProfile
// ============================================================
const decodeJwtPayload = (token) => {
  if (!token) return null;

  const payloadPart = token.split(".")[1];
  if (!payloadPart) return null;

  const normalized = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const decoded = atob(padded);

  return JSON.parse(decoded);
};

const normalizeDisplayValue = (value) => {
  if (value === null || value === undefined || value === "") return "N/A";

  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  if (typeof value === "object") {
    if (typeof value.name === "string") return value.name;
    if (typeof value.number === "string" || typeof value.number === "number") {
      return String(value.number);
    }
    if (typeof value._id === "string") return value._id;
    return "N/A";
  }

  return String(value);
};

const StudentProfile = () => {
  // ---------- State ----------
  const [userData, setUserData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // ---------- Side Effects: Fetch user profile on mount ----------
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

      if (token) {
        try {
          const payload = decodeJwtPayload(token);
          const userId = payload?.id || storedUser._id;

          if (!userId) {
            throw new Error("User ID not found in token or local storage");
          }

          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          if (!response.ok) {
            throw new Error(`Profile fetch failed with status ${response.status}`);
          }

          const data = await response.json();
          if (data.success) {
            setUserData(data.data);
            setFormData({
              firstName: data.data.firstName || "",
              lastName: data.data.lastName || "",
            });
            localStorage.setItem("user", JSON.stringify(data.data));
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

  const name =
    [userData?.firstName, userData?.lastName].filter(Boolean).join(" ") ||
    userData?.name ||
    "Student";

  const departmentName = normalizeDisplayValue(userData.department);
  const semesterDisplay = normalizeDisplayValue(userData.semester);
  const sectionDisplay = normalizeDisplayValue(userData.section);
  const batchDisplay = normalizeDisplayValue(userData.batch);

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#f8fafc_0%,#eef4ff_55%,#fff7f8_100%)] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-red">Student</p>
            <h1 className="text-[32px] font-bold text-slate-900">Student Profile</h1>
            <p className="mt-1 text-sm text-slate-500">View your academic and personal information in a refined dashboard view.</p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5 text-white transition hover:bg-[#0f1d33]"
            >
              <Edit2 size={16} /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-1 rounded-lg border border-slate-200 px-4 py-2 text-slate-600 transition hover:bg-slate-100"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1 rounded-lg bg-brand-blue px-4 py-2 text-white transition hover:bg-[#0f1d33]"
              >
                <Save size={16} /> Save
              </button>
            </div>
          )}
        </div>

        <div className="mb-8 flex items-center rounded-[30px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_20px_60px_rgba(22,43,74,0.08)] backdrop-blur md:px-8 md:py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex flex-col items-center">
              <div className="relative">
                {userData.avatar ? (
                  <img src={userData.avatar} alt="student" className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg" />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-slate-100 shadow-lg">
                    <svg className="h-16 w-16 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
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
                      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userData._id}`, {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ avatar: reader.result }),
                      });

                      const data = await res.json();

                      if (data.success) {
                        setUserData((prev) => ({ ...prev, avatar: reader.result }));
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
                onClick={() => document.getElementById("studentPhotoUpload").click()}
                className="mt-4 rounded-lg bg-brand-blue px-5 py-2 text-sm text-white transition hover:bg-[#0f1d33]"
              >
                Upload Photo
              </button>
            </div>

            <div>
              <h2 className="text-[30px] font-bold text-brand-blue">{name}</h2>
              <p className="mt-1 text-lg font-semibold text-brand-red">Student</p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-1">Department: {departmentName || "N/A"}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">Roll No: {userData.rollNumber || "N/A"}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">Semester {semesterDisplay}</span>
              </div>
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
                  ["Semester", semesterDisplay],
                  ["Section", sectionDisplay],
                  ["Batch", batchDisplay],
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
  <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(22,43,74,0.06)] md:p-8">
    <h2 className="mb-6 text-[20px] font-bold text-brand-blue">{title}</h2>
    {children}
  </div>
);

// ============================================================
// Sub-Component: InfoGrid
// Renders a list of [label, value] pairs in a 2-column grid
// ============================================================
const InfoGrid = ({ data }) => (
  <div className="grid gap-y-6 gap-x-8 md:grid-cols-2">
    {data.map(([label, value]) => (
      <div key={label} className="rounded-2xl bg-slate-50 p-4">
        <p className="mb-1 text-sm text-slate-500">{label}</p>
        <p className="text-[16px] font-semibold text-slate-900">{normalizeDisplayValue(value)}</p>
      </div>
    ))}
  </div>
);

export default StudentProfile;
