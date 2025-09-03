import React from "react";
import CustomModal from "./customModal";
import { AlertTriangle, Trash2 } from "lucide-react";
import CircularLoading from "../commonComponent/CircularLoading";

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
  return (
    <CustomModal
      isOpen={isOpen}
      onCancel={onCancel}
      onSubmit={onDelete}
      title={
        <div className="flex items-center gap-2 text-red-600">
          <Trash2 size={24} className="text-red-600" />
          <p className="font-sans font-semibold text-xl">{title}</p>
        </div>
      }
      okDisabled={false}
      footer={
        <div className="flex justify-end space-x-3 ">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium flex items-center gap-2"
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
    >
      <div>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
          </div>

          <div className="text-left">
            <p className="text-gray-800 mb-2">
              {message} {itemName && <strong className="text-red-600">"{itemName}"</strong>}?
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1">
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
