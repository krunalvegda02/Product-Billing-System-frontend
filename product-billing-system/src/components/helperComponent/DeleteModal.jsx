import React from "react";
import CustomModal from "./customModal";
import { AlertTriangle, Trash2 } from "lucide-react";
import CircularLoading from "../commonComponent/CircularLoading";
import { THEME_CONFIG, THEME } from "../../constants/Theme"; // Import the theme config

const DeleteModalView = ({
  isOpen,
  onCancel,
  onDelete,
  isLoading,
  title = "Delete Confirmation",
  message = "Are you sure you want to delete this item?",
  itemName,
  warningText = "This action cannot be undone.",
  theme = THEME.GENERAL, // Add theme prop with default
}) => {
  // Get the current theme configuration
  const currentTheme = THEME_CONFIG[theme] || THEME_CONFIG[THEME.GENERAL];

  return (
    <CustomModal
      isOpen={isOpen}
      onCancel={onCancel}
      onSubmit={onDelete}
      title={
        <div className={`flex items-center gap-2 ${currentTheme.ERROR}`}>
          <Trash2 size={24} className={currentTheme.ERROR} />
          <p className={`font-sans font-semibold text-xl ${currentTheme.TEXT_COLOR}`}>{title}</p>
        </div>
      }
      okDisabled={false}
      footer={
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className={`px-4 py-2 ${currentTheme.BUTTON_SECONDARY} rounded-lg transition-colors duration-200 font-medium`}
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className={`px-4 py-2 ${currentTheme.ERROR_BG} ${currentTheme.ERROR} rounded-lg hover:${currentTheme.ERROR_BG.replace('bg-', 'hover:bg-')} transition-colors duration-200 font-medium flex items-center gap-2`}
          >
            {isLoading ? (
              <CircularLoading />
            ) : (
              <>
                <Trash2 size={16} /> Delete
              </>
            )}
          </button>
        </div>
      }
      className={currentTheme.MODAL_BG}
    >
      <div>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <div className={`w-10 h-10 rounded-full ${currentTheme.ERROR_BG} flex items-center justify-center`}>
              <AlertTriangle className={`w-5 h-5 ${currentTheme.ERROR}`} />
            </div>
          </div>

          <div className="text-left">
            <p className={`${currentTheme.TEXT_COLOR} mb-2`}>
              {message} {itemName && <strong className={currentTheme.ERROR}>"{itemName}"</strong>}?
            </p>
            <p className={`text-sm ${currentTheme.TEXT_SECONDARY} flex items-center gap-1`}>
              <AlertTriangle className="w-4 h-4" />
              {warningText}
            </p>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default DeleteModalView;