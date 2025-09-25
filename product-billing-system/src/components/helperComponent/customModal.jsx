import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { THEME } from "../../constants/Theme";
const CustomModal = ({ isOpen, title, children, onSubmit, onCancel, okDisabled, footer = true, currentTheme = THEME.GENERAL }) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className={`absolute inset-0 ${theme.MODAL_OVERLAY}`} onClick={onCancel}></div>

      {/* Modal */}
      <div className={`relative ${theme.MODAL_BG} rounded-2xl ${theme.SHADOW} w-full max-w-2xl max-h-[90vh] flex flex-col z-50 overflow-hidden`}>
        {/* Header */}
        {title && (
          <div className={`px-6 py-4 border-b ${theme.TABLE_BORDER} flex-shrink-0`}>
            <div className={theme.TEXT_COLOR}>{title}</div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className={`px-6 py-4 border-t ${theme.TABLE_BORDER} ${theme.TABLE_HEADER} flex-shrink-0`}>
            <div className="flex justify-end space-x-3">
              <button
                onClick={onCancel}
                className={`px-5 py-2.5 ${theme.BUTTON_SECONDARY} rounded-xl font-medium transition-all duration-200 hover:shadow-md`}
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                disabled={okDisabled}
                className={`px-5 py-2.5 ${theme.BUTTON} rounded-xl font-medium transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none`}
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
