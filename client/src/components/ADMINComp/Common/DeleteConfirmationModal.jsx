import React from "react";
import { AlertTriangle, X } from "lucide-react";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, isDeleting }) => {
  if (!isOpen) return null;

  const buttonText = title?.toLowerCase().includes('update') ? 'Update' : 'Delete';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[90%] max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-gray-900">
          {title || "Confirm Deletion"}
        </h2>

        <p className="mt-3 text-gray-600">
          {message || "Are you sure you want to delete this item? This action cannot be undone."}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className={`rounded-lg px-4 py-2 text-white transition ${
              isDeleting ? 'bg-red-400 cursor-not-allowed' : 'bg-[#c00021] hover:bg-[#a0001a]'
            }`}
          >
            {isDeleting ? (title?.toLowerCase().includes('update') ? 'Updating...' : 'Deleting...') : buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

