import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { THEME } from "../../../constants/Theme";
import { useToast } from "../../../context/ToastContext";
import useModal from "../../../hooks/useModel";
import { usePagination } from "../../../hooks/usePagination";
import { getAllCategories, setCategory, getCategoryProducts } from "../../../redux/Slices/categorySlice";
import CategoryView from "./CategoryView";
import store from "../../../redux/Store/store";
import CategoryModal from "./categoryModal";
import DeleteCategory from "./DeleteCategory";
import CategoryDetailModal from "./CategoryDetails/CategoryDetailsModal";

const ITEMS_PER_PAGE = 8;

const Category = () => {
  const currentTheme = THEME.GENERAL;
  const { openModal, closeModal, isOpen } = useModal();

  const { openModal: openAddModal, closeModal: closeAddModal, isOpen: isAddOpen } = useModal();
  const { openModal: openDeleteModal, closeModal: closeDeleteModal, isOpen: isDeleteOpen } = useModal();
  const { openModal: openDetailModal, closeModal: closeDetailModal, isOpen: isDetailOpen } = useModal();

  const { showToast } = useToast();
  const { categories } = useSelector((state) => state.category);
  const { dispatch } = store;

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);

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

  const handleCategoryClick = async (category) => {
    console.log(category);

    setSelectedCategory(category);
    try {
      // Fetch products for this category
      const products = await dispatch(getCategoryProducts({ id: category._id })).unwrap();
      // console.log(products);

      setCategoryProducts(products.data.products);
      openDetailModal();
    } catch (error) {
      showToast("Error loading category details", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        categories={paginatedCategories}
        openModal={openModal}
        currentTheme={currentTheme}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleCategoryClick={handleCategoryClick} // New prop
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        currentPage={currentPage}
        totalPages={totalPages}
        changePage={changePage}
      />

      <CategoryModal isOpen={isOpen} onCancel={closeModal} fetchCategoryData={fetchData} mode={selectedCategory ? "edit" : "add"} />
      <DeleteCategory isOpen={isDeleteOpen} onCancel={closeDeleteModal} fetchCategoryData={fetchData} />
      <CategoryDetailModal
        isOpen={isDetailOpen}
        onCancel={closeDetailModal}
        category={selectedCategory}
        products={categoryProducts}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
    </>
  );
};

export default Category;
