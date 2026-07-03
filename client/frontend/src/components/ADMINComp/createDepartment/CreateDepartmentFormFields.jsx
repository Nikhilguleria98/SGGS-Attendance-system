import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * CreateDepartmentFormFields component
 * Handles form validation, interactive inputs, and simulated submit states.
 * 
 * @param {Object} props
 * @param {Function} props.onSubmitSuccess - Callback function triggered on a successful submission.
 */
const CreateDepartmentFormFields = ({ onSubmitSuccess }) => {
  const navigate = useNavigate();

  // Form values state
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
  });

  // Validation/UI states
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const maxDescLength = 500;

  // Handle value inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clear validation error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name] : "" }));
    }

    if (name === "code") {
      // Force uppercase and remove spaces/special characters
      const formattedCode = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
      setFormData((prev) => ({ ...prev, code: formattedCode }));
    } else if (name === "description") {
      if (value.length <= maxDescLength) {
        setFormData((prev) => ({ ...prev, description: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Form validations
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Department Name is required.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    if (!formData.code.trim()) {
      newErrors.code = "Department Code is required.";
    } else if (formData.code.trim().length < 2) {
      newErrors.code = "Code must be at least 2 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API response time
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsLoading(false);
      setIsSuccess(true);

      // Trigger success callback
      if (onSubmitSuccess) {
        onSubmitSuccess(formData);
      }

    } catch (err) {
      setIsLoading(false);
      setErrors({ form: "Failed to create department. Please try again." });
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
      {/* Form Submission Success Overlay / Message */}
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
            <h3 className="text-xl font-bold text-gray-900 mb-1">Department Created!</h3>
            <p className="text-gray-500 text-sm">
              The department has been added successfully.
            </p>

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({ name: "", code: "", description: "" });
                }}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl text-sm transition-all cursor-pointer"
              >
                Create Another
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

      {/* Main Form Fields */}
      {!isSuccess && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.form && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errors.form}</span>
            </div>
          )}

          {/* Department Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold text-gray-800 tracking-wide">
              Department Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                disabled={isLoading}
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Department Name"
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

          {/* Department Code */}
          <div className="flex flex-col gap-2">
            <label htmlFor="code" className="text-sm font-semibold text-gray-800 tracking-wide">
              Department Code
            </label>
            <div className="relative">
              <input
                type="text"
                id="code"
                name="code"
                disabled={isLoading}
                value={formData.code}
                onChange={handleChange}
                placeholder="Enter Department Code (e.g., CSE)"
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-4 transition-all duration-200 outline-none ${
                  errors.code
                    ? "border-red-300 focus:ring-red-500/10 focus:border-red-500"
                    : "border-gray-200 focus:ring-[#00529b]/10 focus:border-[#00529b]"
                }`}
              />
            </div>
            {errors.code && (
              <motion.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 flex items-center gap-1 mt-0.5"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.code}
              </motion.span>
            )}
          </div>

          {/* Description */}
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

          {/* Submit Button */}
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
                <span>Creating Department...</span>
              </>
            ) : (
              <span>Create Department</span>
            )}
          </motion.button>
        </form>
      )}
    </div>
  );
};

export default CreateDepartmentFormFields;
