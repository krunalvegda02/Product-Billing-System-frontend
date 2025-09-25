import React from "react";
import CustomModal from "./customModal";
import { AlertTriangle, Trash2 } from "lucide-react";
import CircularLoading from "../commonComponent/CircularLoading";
import { useTheme } from "../../context/ThemeContext";

const DeleteModalView = ({
  isOpen,
  onCancel,
  onDelete,
  isLoading,
  title = "Delete Confirmation",
  message = "Are you sure you want to delete this item?",
  itemName,
  warningText = "This action cannot be undone.",
}) => {
  const { theme } = useTheme();
  return (
    <CustomModal
      isOpen={isOpen}
      onCancel={onCancel}
      onSubmit={onDelete}
      title={
        <div className={`flex items-center gap-2 ${theme.ERROR}`}>
          <Trash2 size={24} className={theme.ERROR} />
          <p className={`${theme.FONT_PRIMARY} font-semibold ${theme.HEADER_TEXT_SIZE} ${theme.TEXT_COLOR}`}>{title}</p>
        </div>
      }
      okDisabled={false}
      footer={
        <div className="flex justify-end space-x-3">
          <button onClick={onCancel} className={`px-4 py-2 ${theme.BUTTON_SECONDARY} rounded-lg transition-colors duration-200 font-medium`}>
            Cancel
          </button>
          <button
            onClick={onDelete}
            disabled={isLoading}
            className={`px-4 py-2 ${theme.BUTTON} rounded-lg transition-colors duration-200 font-medium flex items-center gap-2 ${theme.ERROR} ${theme.ERROR_BG} hover:${theme.ERROR.replace("text-", "hover:text-")} hover:${theme.ERROR_BG.replace("bg-", "hover:bg-")}`}
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
      className={`${theme.MODAL_BG} ${theme.SHADOW}`}
      overlayClassName={theme.MODAL_OVERLAY}
    >
      <div>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-full ${theme.ERROR_BG} flex items-center justify-center`}>
              <AlertTriangle className={`w-5 h-5 ${theme.ERROR}`} />
            </div>
          </div>

          <div className="text-left">
            <p className={`${theme.BODY_TEXT_SIZE} ${theme.TEXT_COLOR} mb-2 ${theme.FONT_PRIMARY}`}>
              {message} {itemName && <strong className={theme.ERROR}>"{itemName}"</strong>}?
            </p>
            <p className={`${theme.BODY_TEXT_SIZE} ${theme.TEXT_SECONDARY} flex items-center gap-1 ${theme.FONT_PRIMARY}`}>
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
