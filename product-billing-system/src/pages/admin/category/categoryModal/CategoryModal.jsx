/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import CategoryModalView from "./CategoryModalView";

const CategoryModal = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
    // TODO: Handle form submission, API FOR ADDING CATEGORY
    // onSave({ name: categoryName, thumbnail });
    setCategoryName("");
    setThumbnail(null);
    setImagePreview(null);
    onClose();
  };

  const handleCancel = () => {
    setCategoryName("");
    setThumbnail(null);
    setImagePreview(null);
    onClose();
  };

  useEffect(() => {
    console.log(imagePreview);
  }, [imagePreview]);
  if (!isOpen) return null;
  return (
    <CategoryModalView
      isOpen={isOpen}
      fileInputRef={fileInputRef}
      handleCancel={handleCancel}
      handleFileChange={handleFileChange}
      handleSave={handleSave}
      imagePreview={imagePreview}
      onClose={onClose}
      setCategoryName={setCategoryName}
    />
  );
};

export default CategoryModal;
