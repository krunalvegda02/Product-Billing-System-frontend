import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { THEME } from "../../../constants/Theme";
import { useToast } from "../../../context/ToastContext";
import useModal from "../../../hooks/useModel";
import { usePagination } from "../../../hooks/usePagination";
import { getAllProducts, setProduct } from "../../../redux/Slices/productSlice";
import store from "../../../redux/Store/store";
import ProductView from "./ProductView";
import DeleteModalView from "../../../components/helperComponent/DeleteModal";
import AddProductModal from "../../../components/Admin Components/Modals/AddProductModal";

const ITEMS_PER_PAGE = 8;

const Product = () => {
  const currentTheme = THEME.GENERAL;
  const { openModal, closeModal, isOpen } = useModal();
  const {
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
    isOpen: isDeleteOpen,
  } = useModal();
  const { showToast } = useToast();
  const { products, selectedProduct } = useSelector((state) => state.product); // ✅ pull selected product from redux
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
    return [...products].sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
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

  const handleDelete = () => {
    if (!selectedProduct) return;
    // TODO: call delete API here
    showToast(`${selectedProduct.name} deleted successfully`, "success");
    closeDeleteModal();
    fetchData();
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

      {/* ✅ Add Product Modal */}
      <AddProductModal
        isOpen={isOpen}
        onCancel={closeModal}
        fetchCategoryData={fetchData}
      />

      {/* ✅ Delete Product Modal */}
      <DeleteModalView
        isOpen={isDeleteOpen}
        onCancel={closeDeleteModal}
        onDelete={handleDelete}
        itemName={selectedProduct?.name || "this product"}
        fetchCategoryData={fetchData}
      />
    </>
  );
};

export default Product;
