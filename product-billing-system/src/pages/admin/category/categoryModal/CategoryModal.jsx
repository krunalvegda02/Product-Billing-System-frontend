import React, { useEffect, useRef, useState } from "react";
import CategoryModalView from "./CategoryModalView";
import store from "../../../../redux/Store/store";
import { createCategory, deselectCategory, updateCategory } from "../../../../redux/Slices/categorySlice";
import { removeNullValues } from "../../../../helper/helperFunction";
import { useSelector } from "react-redux";
import { getAllProductsNames, fetchCategoryProducts } from "../../../../redux/Slices/productSlice"; // import your thunks

const CategoryModal = ({ isOpen, onCancel, fetchCategoryData }) => {
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);

  const { selectedCategory } = useSelector((state) => state.category);
  const { dispatch } = store;
  const fileInputRef = useRef(null);

  // 🔹 Load all products
  useEffect(() => {
    if (isOpen) {
      dispatch(getAllProductsNames())
        .unwrap()
        .then((res) => {
          console.log("res", res);

          // Correct place where products live
          const arr = Array.isArray(res?.data?.products) ? res.data.products : [];

          setProducts(arr);
        })
        .catch(() => setProducts([]));
    }
  }, [isOpen, dispatch]);

  // 🔹 Load products of selected category (edit mode)
  useEffect(() => {
    if (selectedCategory?._id) {
      dispatch(fetchCategoryProducts({ categoryId: selectedCategory._id }))
        .unwrap()
        .then((res) => setCategoryProducts(res?.data || []))
        .catch(() => setCategoryProducts([]));
    }
  }, [selectedCategory, dispatch]);

  const handleFileChange = (e) => {
    const file = e.target?.files[0];

    if (file && (file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "image/png")) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setThumbnail(file);
    } else {
      setImagePreview(null);
      setThumbnail(null);
    }
  };

  // 🔹 Handles create / update
  const handleCreateOrUpdateCategory = async (formData) => {
    let payload, action;

    if (categoryId) {
      payload = {
        id: categoryId,
        newCategoryName: formData.categoryName,
        newCategoryThumbnail: thumbnail,
        products: formData.products, // attach selected products
      };
      action = updateCategory;
    } else {
      payload = {
        categoryName: formData.categoryName,
        categoryThumbnail: thumbnail,
        products: formData.products,
      };
      action = createCategory;
    }

    await dispatch(action(removeNullValues(payload)));
    fetchCategoryData();
    dispatch(deselectCategory());
    handleCancel();
  };

  const handleCancel = () => {
    setCategoryName("");
    setThumbnail(null);
    setImagePreview(null);
    setProducts([]);
    setCategoryProducts([]);
    dispatch(deselectCategory());
    onCancel();
  };

  // 🔹 Sync category when selected
  useEffect(() => {
    setCategoryId(selectedCategory._id || null);
    setCategoryName(selectedCategory.categoryName || "");
    setImagePreview(selectedCategory.categoryThumbnail || null);
  }, [selectedCategory]);

  // 🔹 Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(deselectCategory());
    };
  }, []);

  if (!isOpen) return null;

  return (
    <CategoryModalView
      isOpen={isOpen}
      onCancel={handleCancel}
      onSubmit={handleCreateOrUpdateCategory}
      category={{
        _id: categoryId,
        categoryName,
        categoryThumbnail: imagePreview,
        products: categoryProducts,
      }}
      products={products}
      mode={categoryId ? "edit" : "add"}
    />
  );
};

export default CategoryModal;
