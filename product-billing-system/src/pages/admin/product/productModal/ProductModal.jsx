import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { removeNullValues } from "../../../../helper/helperFunction";
import { createCategory, deselectCategory, updateCategory } from "../../../../redux/Slices/categorySlice";
import store from "../../../../redux/Store/store";
import ProductModalView from "./ProductModalView";

const ProductModal = ({ isOpen, onCancel, fetchCategoryData }) => {
  const [initialValue, setInitialValue] = useState({
    id: null,
    name: null,
    description: null,
    price: 0,
    inStock: true,
    thumbnail: null,
    thumbnailPreview: null,
    categoryOfProduct: [],
    isDiscountActive: false,
    ActiveDiscount: null,
  });

  const { selectedProduct } = useSelector((state) => state.product);
  const { dispatch } = store;
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target?.files[0];

    if (file && (file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "image/png")) {
      const imageUrl = URL.createObjectURL(file);
      setInitialValue((prev) => ({
        ...prev,
        thumbnailPreview: imageUrl,
        thumbnail: file,
      }));
    } else {
      setInitialValue((prev) => ({
        ...prev,
        thumbnailPreview: null,
        thumbnail: null,
      }));
    }
  };

  const handleSave = () => {
    handleCreateOrUpdateCategory();
    handleCancel();
  };

  const handleCreateOrUpdateCategory = async () => {
    let payload, action;
    payload = initialValue;
    if (initialValue.id) {
      action = updateCategory;
    } else {
      action = createCategory;
    }
    await dispatch(action(removeNullValues(payload)));
    fetchCategoryData();
    dispatch(deselectCategory());
  };

  const handleCancel = () => {
    setInitialValue({
      id: null,
      name: null,
      description: null,
      price: 0,
      inStock: true,
      thumbnail: null,
      thumbnailPreview: null,
      categoryOfProduct: [],
      isDiscountActive: false,
      ActiveDiscount: null,
    });
    dispatch(deselectCategory());
    onCancel();
  };

  useEffect(() => {
    setInitialValue({
      id: selectedProduct._id,
      name: null,
      description: null,
      price: 0,
      inStock: true,
      thumbnail: null,
      thumbnailPreview: null,
      categoryOfProduct: [],
      isDiscountActive: false,
      ActiveDiscount: null,
    });
  }, [selectedProduct]);

  useEffect(() => {
    return () => {
      dispatch(deselectCategory());
    };
  }, []);

  const setFormValue = (e) => {
    const { name, value, type, checked } = e.target;

    let newValue;

    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "number") {
      const num = Number(value);
      if (name === "ActiveDiscount") {
        newValue = Math.min(100, Math.max(1, num));
      } else {
        newValue = num;
      }
    } else {
      newValue = value;
    }

    setInitialValue((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    console.log(initialValue);
  }, [initialValue]);
  if (!isOpen) return null;

  return (
    <ProductModalView
      isOpen={isOpen}
      fileInputRef={fileInputRef}
      handleCancel={handleCancel}
      handleFileChange={handleFileChange}
      handleSave={handleSave}
      initialValue={initialValue}
      setInitialValue={setInitialValue}
      setFormValue={setFormValue}
    />
  );
};

export default ProductModal;
