import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { THEME } from "../../../constants/Theme";
import { useToast } from "../../../context/ToastContext";
import useModal from "../../../hooks/useModel";
import { usePagination } from "../../../hooks/usePagination";
import { getAllProducts, setProduct } from "../../../redux/Slices/productSlice";
import store from "../../../redux/Store/store";
import ProductView from "./ProductView";
import ProductModal from "./productModal";

const ITEMS_PER_PAGE = 8;

const Product = () => {
  const currentTheme = THEME.GENERAL;
  const { openModal, closeModal, isOpen } = useModal();
  const { openModal: openDeleteModal, closeModal: closeDeleteModal, isOpen: isDeleteOpen } = useModal();
  const { showToast } = useToast();
  const { products } = useSelector((state) => state.product);
  const { dispatch } = store;

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");

  const { fetchData } = usePagination(
    getAllProducts,
    {},
    () => {},
    (err) => showToast(err, "error")
  );

  const handleEditClick = (product) => {
    dispatch(setProduct(product));
    openModal();
  };
  const handleDeleteClick = (product) => {
    dispatch(setProduct(product));
    openDeleteModal();
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [products, sortOrder]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <ProductView
        products={paginatedProducts}
        openModal={openModal}
        currentTheme={currentTheme}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
       
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        currentPage={currentPage}
        totalPages={totalPages}
        changePage={changePage}
      />
      <ProductModal isOpen={isOpen} onCancel={closeModal} fetchCategoryData={fetchData} />
      {/* <DeleteCategory isOpen={isDeleteOpen} onCancel={closeDeleteModal} fetchCategoryData={fetchData} /> */}
    </>
  );
};

export default Product;
