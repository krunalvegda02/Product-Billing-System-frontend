import React, { useEffect, useState, useMemo } from "react";
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

const ITEMS_PER_PAGE = 8; // Moved to the container component

const Category = () => {
  const currentTheme = THEME.GENERAL;
  const { openModal, closeModal, isOpen } = useModal();
  const { openModal: openDeleteModal, closeModal: closeDeleteModal, isOpen: isDeleteOpen } = useModal();
  const { showToast } = useToast();
  const { categories } = useSelector((state) => state.category);
  const { dispatch } = store;

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");

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

  // --- Sorting and Pagination Logic (Moved Here) ---

  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.categoryName.localeCompare(b.categoryName);
      } else {
        return b.categoryName.localeCompare(a.categoryName);
      }
    });
  }, [categories, sortOrder]);

  const totalPages = Math.ceil(sortedCategories.length / ITEMS_PER_PAGE);
  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedCategories, currentPage]);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <CategoryView
        categories={paginatedCategories} // Pass only the paginated, sorted data
        openModal={openModal}
        currentTheme={currentTheme}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        // New props for sorting and pagination controls
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        currentPage={currentPage}
        totalPages={totalPages}
        changePage={changePage}
      />
      <CategoryModal isOpen={isOpen} onCancel={closeModal} fetchCategoryData={fetchData} />
      <DeleteCategory isOpen={isDeleteOpen} onCancel={closeDeleteModal} fetchCategoryData={fetchData} />
    </>
  );
};

export default Category;
