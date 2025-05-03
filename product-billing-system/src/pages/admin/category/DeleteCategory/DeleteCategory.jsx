import React from "react";
import DeleteModalView from "../../../../components/helperComponent/DeleteModal";
import { deleteCategory, deselectCategory } from "../../../../redux/Slices/categorySlice";
import { useSelector } from "react-redux";
import store from "../../../../redux/Store/store";

const DeleteCategory = ({ isOpen, onCancel, fetchCategoryData }) => {
  const { selectedCategory } = useSelector((state) => state.category);
  const { dispatch } = store;

  const handleDelete = async () => {
    await dispatch(deleteCategory({ id: selectedCategory._id }));
    fetchCategoryData();
    handleClose();
  };
  const handleClose = () => {
    dispatch(deselectCategory());
    onCancel();
  };

  if (!isOpen) return null;

  return <DeleteModalView isOpen={isOpen} onDelete={handleDelete} onCancel={handleClose} />;
};

export default DeleteCategory;
