import React from "react";
import { THEME, THEME_CONFIG } from "../../../src/constants/Theme";

export default function CustomModal({ isOpen, onClose, title, children, onOk, onCancel, okDisabled, footer = true, closable = true }) {
  const currentTheme = THEME.LIGHT;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300" onClick={onClose} />

      {/* Modal Content */}
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full z-50 transform transition-all duration-300 opacity-100 scale-100">
        <div className="flex flex-row justify-between items-center mb-4">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          {closable && (
            <button onClick={onClose} className=" text-gray-500 hover:text-gray-700 text-xl">
              ✕
            </button>
          )}
        </div>

        <div>{children}</div>

        {/* Footer */}
        {footer && (
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={onCancel || onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Cancel
            </button>
            <button onClick={onOk} disabled={okDisabled} className={`px-4 py-2 rounded ${THEME_CONFIG[currentTheme].BUTTON}`}>
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
