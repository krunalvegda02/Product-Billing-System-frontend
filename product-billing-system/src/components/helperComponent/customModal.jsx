import React from "react";
import { THEME, THEME_CONFIG } from "../../../src/constants/Theme";

export default function CustomModal({ isOpen, title, children, onSubmit, onCancel, okDisabled, footer = true }) {
  const currentTheme = THEME.GENERAL;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300" />

      {/* Modal Content */}
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-2xl w-full z-50 transform transition-all duration-300 opacity-100 scale-100">
        <div className="flex flex-row justify-between items-center mb-4">{title && <h2 className="text-xl font-semibold">{title}</h2>}</div>

        <div>{children}</div>

        {/* Footer */}
        {footer && (
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Cancel
            </button>
            <button onClick={onSubmit} disabled={okDisabled} className={`px-4 py-2 rounded ${THEME_CONFIG[currentTheme].BUTTON}`}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
