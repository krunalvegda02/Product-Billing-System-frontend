import React from "react";

// Modal Component with proper overlay, centering & z-index
const CustomModal = ({
  isOpen,
  title,
  children,
  onSubmit,
  onCancel,
  okDisabled,
  footer = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel} // closes when clicking outside
      ></div>

      {/* Modal */}
<div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col z-50 overflow-hidden">
  {/* Header */}
  {title && (
    <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
      {title}
    </div>
  )}

  {/* Scrollable Content */}
  <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

  {/* Footer */}
  {footer && (
    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={okDisabled}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  )}
</div>

    </div>
  );
};

export default CustomModal;
