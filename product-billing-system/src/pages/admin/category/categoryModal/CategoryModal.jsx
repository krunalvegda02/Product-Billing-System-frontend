import React, { useEffect, useRef, useState } from "react";
import CategoryModalView from "./CategoryModalView";
import store from "../../../../redux/Store/store";
import { createCategory, deselectCategory, updateCategory } from "../../../../redux/Slices/categorySlice";
import { removeNullValues } from "../../../../helper/helperFunction";
import { useSelector } from "react-redux";

const CategoryModal = ({ isOpen, onCancel, fetchCategoryData }) => {
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { selectedCategory } = useSelector((state) => state.category);
  const { dispatch } = store;
  const fileInputRef = useRef(null);

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

  const handleSave = () => {
    handleCreateOrUpdateCategory();
    handleCancel();
  };

  const handleCreateOrUpdateCategory = async () => {
    let payload, action;
    if (categoryId) {
      payload = {
        id: categoryId,
        newCategoryName: categoryName,
        newCategoryThumbnail: thumbnail,
      };
      action = updateCategory;
    } else {
      payload = {
        categoryName: categoryName,
        categoryThumbnail: thumbnail,
      };
      action = createCategory;
    }
    await dispatch(action(removeNullValues(payload)));
    fetchCategoryData();
    dispatch(deselectCategory());
  };

  const handleCancel = () => {
    setCategoryName("");
    setThumbnail(null);
    setImagePreview(null);
    dispatch(deselectCategory());
    onCancel();
  };

  useEffect(() => {
    setCategoryId(selectedCategory._id);
    setCategoryName(selectedCategory.categoryName);
    setImagePreview(selectedCategory.categoryThumbnail);
  }, [selectedCategory]);

  useEffect(() => {
    return () => {
      dispatch(deselectCategory());
    };
  }, []);

  if (!isOpen) return null;

  return (
    <CategoryModalView
      isOpen={isOpen}
      fileInputRef={fileInputRef}
      handleCancel={handleCancel}
      handleFileChange={handleFileChange}
      handleSave={handleSave}
      imagePreview={imagePreview}
      categoryName={categoryName}
      setCategoryName={setCategoryName}
    />
  );
};

export default CategoryModal;
