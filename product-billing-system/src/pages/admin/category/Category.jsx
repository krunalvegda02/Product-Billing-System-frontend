import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { THEME } from "../../../constants/Theme";
import { useToast } from "../../../context/ToastContext";
import useModal from "../../../hooks/useModel";
import { usePagination } from "../../../hooks/usePagination";
import { getAllCategories, setCategory } from "../../../redux/Slices/categorySlice";
import CategoryView from "./CategoryView";
import store from "../../../redux/Store/store";
import CategoryModal from "./categoryModal";
import DeleteCategory from "./DeleteCategory";

const Category = () => {
  const currentTheme = THEME.GENERAL;
  const { openModal, closeModal, isOpen } = useModal();
  const { openModal: openDeleteModal, closeModal: closeDeleteModal, isOpen: isDeleteOpen } = useModal();
  const { showToast } = useToast();
  const { categories } = useSelector((state) => state.category);
  const { dispatch } = store;

  const { fetchData } = usePagination(
    getAllCategories,
    {},
    () => {},
    (err) => showToast(err, "error")
  );

  const handleEditClick = (category) => {
    dispatch(setCategory(category));
    openModal();
  };
  const handleDeleteClick = (category) => {
    dispatch(setCategory(category));
    openDeleteModal();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <CategoryView
        categories={categories}
        openModal={openModal}
        currentTheme={currentTheme}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
      <CategoryModal isOpen={isOpen} onCancel={closeModal} fetchCategoryData={fetchData} />
      <DeleteCategory isOpen={isDeleteOpen} onCancel={closeDeleteModal} fetchCategoryData={fetchData} />
    </>
  );
};

export default Category;
