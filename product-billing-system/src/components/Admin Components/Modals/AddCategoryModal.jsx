import React, { useState, useRef } from "react";
import useToast from "../../../hooks/useToast";
import CustomModal from "../../helperComponent/customModal";

const AddCategoryModal = ({ isOpen, onCancel }) => {
  const [categoryName, setCategoryName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { showToast } = useToast();

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);

    const file = e.target?.files[0];
    const fileSizeKB = file.size / 1024; // Convert bytes to kilobytes
    console.log("filesize", fileSizeKB);

    if (fileSizeKB > 10) {
      showToast("Image size must be less than or equal to 10KB.", "error");
      // showToast((message = "Image size must be less than or equal to 10KB."), (type = "error"));
      e.target.value = "";
      return;
    }

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
    onSave({ name: categoryName, thumbnail });
    setCategoryName("");
    setThumbnail(null);
    setImagePreview(null);
    onCancel();
  };

  const handleCancel = () => {
    setCategoryName("");
    setThumbnail(null);
    setImagePreview(null);
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onCancel={onCancel}
      onCancel={handleCancel}
      onSubmit={handleSave}
      title={<p className="font-sans font-semibold text-2xl">Add New Category</p>}
      okDisabled={!categoryName || !thumbnail}
    >
      <div className="space-y-4 my-4">
        {/* Name Input */}
        <div>
          <label htmlFor="categoryName" className="block text-left text-lg font-medium text-gray-700">
            Name:
          </label>
          <input
            id="categoryName"
            type="text"
            placeholder="Enter category name"
            onChange={(e) => setCategoryName(e.target.value)}
            className="mt-2 block w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder:text-base py-1 hover:border-blue-400"
          />
        </div>

        {/* Thumbnail Input */}
        <div>
          <label htmlFor="categoryThumbnail" className="block text-left text-lg font-medium text-gray-700">
            Thumbnail:
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="w-full cursor-pointer">
              <div
                className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors ${"bg-gray-200"}`}
              >
                {imagePreview ? (
                  <div className="bg-gray-200">
                    <img src={imagePreview} alt="Preview" className="mx-auto  h-32 w-32 object-cover rounded-lg" />
                  </div>
                ) : (
                  <div className="text-gray-500">
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
