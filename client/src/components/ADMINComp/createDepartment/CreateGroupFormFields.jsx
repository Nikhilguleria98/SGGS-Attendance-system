import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateGroupFormFields = ({ onSubmitSuccess, initialData }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: initialData ? initialData.name : "",
    description: initialData && initialData.description ? initialData.description : "",
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const maxDescLength = 500;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) setErrors((prev) => ({ ...prev, [name] : "" }));

    if (name === "description") {
      if (value.length <= maxDescLength) {
        setFormData((prev) => ({ ...prev, description: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Group Name is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const url = initialData ? `${import.meta.env.VITE_API_URL}/groups/${initialData._id}` : `${import.meta.env.VITE_API_URL}/groups`;
      const method = initialData ? "PATCH" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to create group");
      }
      
      setIsLoading(false);
      setIsSuccess(true);

      if (onSubmitSuccess) {
        onSubmitSuccess(data.data);
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setErrors({ form: err.message || "Failed to create group. Please try again." });
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4"
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{initialData ? "Group Updated!" : "Group Created!"}</h3>
            <p className="text-gray-500 text-sm">
              {initialData ? "The group has been updated successfully." : "The group has been added successfully."}
            </p>

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({ name: "", description: "" });
                }}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl text-sm transition-all cursor-pointer"
              >
                {initialData ? "Edit Again" : "Create Another"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-5 py-2.5 bg-[#00529b] hover:bg-[#003d73] text-white font-semibold rounded-xl text-sm transition-all cursor-pointer"
              >
                Go to Home
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isSuccess && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.form && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errors.form}</span>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-gray-800 tracking-wide">
              Group Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                disabled={isLoading}
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Group Name (e.g., A)"
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-4 transition-all duration-200 outline-none ${
                  errors.name
                    ? "border-red-300 focus:ring-red-500/10 focus:border-red-500"
                    : "border-gray-200 focus:ring-[#00529b]/10 focus:border-[#00529b]"
                }`}
              />
            </div>
            {errors.name && (
              <motion.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 flex items-center gap-1 mt-0.5"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.name}
              </motion.span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label htmlFor="description" className="text-sm font-semibold text-gray-800 tracking-wide">
                Description
              </label>
              <span className="text-xs text-gray-400 font-medium">
                {formData.description.length}/{maxDescLength} characters
              </span>
            </div>
            <div className="relative">
              <textarea
                id="description"
                name="description"
                rows="4"
                disabled={isLoading}
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter Description"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-4 focus:ring-[#00529b]/10 focus:border-[#00529b] transition-all duration-200 outline-none resize-none"
              />
            </div>
          </div>

          <motion.button
            whileHover={!isLoading ? { scale: 1.01, translateY: -1 } : {}}
            whileTap={!isLoading ? { scale: 0.99 } : {}}
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-xl text-white font-bold tracking-wide shadow-md transition-all duration-200 flex items-center justify-center gap-2 outline-none focus:ring-4 focus:ring-[#00529b]/20 ${
              isLoading
                ? "bg-[#00529b]/70 cursor-not-allowed"
                : "bg-gradient-to-r from-[#00529b] to-[#003d73] hover:from-[#003d73] hover:to-[#002b52] shadow-[#00529b]/15 cursor-pointer"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{initialData ? "Updating Group..." : "Creating Group..."}</span>
              </>
            ) : (
              <span>{initialData ? "Update Group" : "Create Group"}</span>
            )}
          </motion.button>
        </form>
      )}
    </div>
  );
};

export default CreateGroupFormFields;
