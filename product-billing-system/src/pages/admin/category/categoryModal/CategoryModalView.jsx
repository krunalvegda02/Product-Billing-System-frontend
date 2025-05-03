import React from "react";
import CustomModal from "../../../../components/helperComponent/customModal";

const CategoryModalView = ({ isOpen, handleCancel, handleSave, categoryName, setCategoryName, imagePreview, fileInputRef, handleFileChange }) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onCancel={handleCancel}
      onSubmit={handleSave}
      title={<p className="font-sans font-semibold text-2xl">Add New Category</p>}
      okDisabled={false}
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
            value={categoryName}
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

export default CategoryModalView;
