import React from "react";
import CustomModal from "./customModal";

const DeleteModalView = ({ isOpen, onCancel, onDelete, title = "Delete Confirmation", message = "Are you sure you want to delete this item?" }) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onCancel={onCancel}
      onSubmit={onDelete}
      title={<p className="font-sans font-semibold text-xl text-red-600">{title}</p>}
      okDisabled={false}
    >
      <div className="text-gray-700 text-center py-4">
        <p>{message}</p>
      </div>
    </CustomModal>
  );
};

export default DeleteModalView;
