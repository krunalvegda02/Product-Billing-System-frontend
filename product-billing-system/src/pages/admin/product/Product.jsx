import { useEffect } from "react";
import { useSelector } from "react-redux";
import { THEME } from "../../../constants/Theme";
import { useToast } from "../../../context/ToastContext";
import useModal from "../../../hooks/useModel";
import { usePagination } from "../../../hooks/usePagination";
import { setCategory } from "../../../redux/Slices/categorySlice";
import { getAllProducts } from "../../../redux/Slices/productSlice";
import store from "../../../redux/Store/store";
import ProductView from "./ProductView";
import ProductModal from "./productModal";

const Product = () => {
  console.log("getAllProducts",getAllProducts);
  
  const currentTheme = THEME.GENERAL;
  const { openModal, closeModal, isOpen } = useModal();
  const { openModal: openDeleteModal, closeModal: closeDeleteModal, isOpen: isDeleteOpen } = useModal();
  const { showToast } = useToast();
  const { products } = useSelector((state) => state.product);
  const { dispatch } = store;

  const { fetchData } = usePagination(
    getAllProducts,
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
      <ProductView
        products={products}
        openModal={openModal}
        currentTh-eme={currentTheme}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
      <ProductModal isOpen={isOpen} onCancel={closeModal} fetchCategoryData={fetchData} />
      {/* <DeleteCategory isOpen={isDeleteOpen} onCancel={closeDeleteModal} fetchCategoryData={fetchData} /> */}
    </>
  );
};

export default Product;
