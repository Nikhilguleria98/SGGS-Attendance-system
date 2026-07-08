import React from "react";
import { AlertTriangle, X } from "lucide-react";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 text-[#c00021]">
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{title || "Confirm Deletion"}</h3>
            </div>
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-gray-600 mb-6">
            {message || "Are you sure you want to delete this item? This action cannot be undone."}
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                isDeleting ? 'bg-red-400 cursor-not-allowed' : 'bg-[#c00021] hover:bg-red-800'
              }`}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

