import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
  const pages = [];
  const maxVisible = 3; // change this to whatever total-pages threshold you want

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  const siblingCount = 1; // how many pages to show around currentPage
  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  pages.push(1);
  if (showLeftEllipsis) pages.push("...");

  for (let i = Math.max(leftSibling, 2); i <= Math.min(rightSibling, totalPages - 1); i++) {
    pages.push(i);
  }

  if (showRightEllipsis) pages.push("...");
  if (totalPages > 1) pages.push(totalPages);

  return pages;
};

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-gray-500">
        Showing <span className="font-semibold text-gray-700">{startItem}</span> to{" "}
        <span className="font-semibold text-gray-700">{endItem}</span> of{" "}
        <span className="font-semibold text-gray-700">{totalItems}</span> results
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? "bg-[#1d4ed8] text-white"
                  : "border border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;