import React, { useState, useRef } from "react";
import { useToast } from "../../../context/ToastContext";
import CustomModal from "../../helperComponent/customModal";
import { THEME, THEME_CONFIG } from "../../../constants/Theme"; 
import { useTheme } from "../../../context/ThemeContext";

const AddCategoryModal = ({ isOpen, onCancel, onSave, currentTheme = THEME.GENERAL }) => {
  const [categoryName, setCategoryName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();
  const fileInputRef = useRef(null);

  // Get the current theme configuration
  const { theme } = useTheme();

  const handleFileChange = (e) => {
    const file = e.target?.files[0];
    if (!file) return;

    const fileSizeKB = file.size / 1024; // Convert bytes to KB
    if (fileSizeKB > 10240) {
      // 10MB = 10240KB
      showToast("Image size must be less than or equal to 10MB.", "error");
      e.target.value = "";
      return;
    }

    if (["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setThumbnail(file);
    } else {
      setImagePreview(null);
      setThumbnail(null);
      showToast("Only JPG, JPEG, PNG allowed.", "error");
    }
  };

  const handleSubmitCategory = async () => {
    if (!categoryName || !thumbnail) return;

    try {
      setLoading(true);
      // Simulate API call

      showToast("Category added successfully!", "success");

      // Reset fields after success
      setCategoryName("");
      setThumbnail(null);
      setImagePreview(null);
      onCancel();
    } catch (err) {
      showToast("Something went wrong while saving category.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseCategory = () => {
    setCategoryName("");
    setThumbnail(null);
    setImagePreview(null);
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onCancel={handleCloseCategory}
      onSubmit={handleSubmitCategory}
      title={<p className={`font-sans font-semibold text-2xl ${theme.TEXT_COLOR}`}>Add New Category</p>}
      okDisabled={!categoryName || !thumbnail || loading}
      okText={
        loading ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"></path>
            </svg>
            Saving...
          </div>
        ) : (
          "Save"
        )
      }
      modalClassName={theme.MODAL_BG}
      overlayClassName={theme.MODAL_OVERLAY}
      buttonPrimaryClassName={theme.BUTTON}
      buttonSecondaryClassName={theme.BUTTON_SECONDARY}
    >
      <div className="space-y-4 my-4">
        {/* Name Input */}
        <div>
          <label htmlFor="categoryName" className={`block text-left text-lg font-medium ${theme.TEXT_COLOR}`}>
            Name:
          </label>
          <input
            id="categoryName"
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className={`mt-2 block w-full border-b-2 ${theme.INPUT} placeholder:${theme.TEXT_SECONDARY} py-1 transition-colors`}
          />
        </div>

        {/* Thumbnail Input */}
        <div>
          <label htmlFor="categoryThumbnail" className={`block text-left text-lg font-medium ${theme.TEXT_COLOR}`}>
            Thumbnail:
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="w-full cursor-pointer">
              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                  imagePreview ? theme.BG_SECONDARY_ACCENT : `${theme.BORDER_COLOR} hover:${theme.BG_ACCENT} hover:bg-opacity-10`
                }`}
              >
                {imagePreview ? (
                  <div className={theme.BG_SECONDARY_ACCENT}>
                    <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
                  </div>
                ) : (
                  <div className={theme.TEXT_SECONDARY}>
                    <p>Click to upload image</p>
                    <p className="text-sm">PNG, JPG, JPEG up to 10MB</p>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default AddCategoryModal;
