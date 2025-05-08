import React from "react";
import CustomModal from "../../../../components/helperComponent/customModal";

const ProductModalView = ({ isOpen, handleCancel, handleSave, initialValue, setInitialValue, setFormValue, fileInputRef, handleFileChange }) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onCancel={handleCancel}
      onSubmit={handleSave}
      title={<p className="font-sans font-semibold text-2xl">Add New Product</p>}
      okDisabled={false}
    >
      <div className="space-y-6 my-4">
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-left text-lg font-medium text-gray-700">
              Name:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter product name"
              value={initialValue.name}
              onChange={setFormValue}
              className="mt-2 block w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder:text-base py-1 hover:border-blue-400"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-left text-lg font-medium text-gray-700">
              Price:
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min={0}
              step={0.1}
              placeholder="Enter price"
              value={initialValue.price}
              onChange={setFormValue}
              className="mt-2 block w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder:text-base py-1 hover:border-blue-400"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-left text-lg font-medium text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            value={initialValue.description}
            onChange={setFormValue}
            className="mt-2 block w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder:text-base py-1 hover:border-blue-400"
          />
        </div>

        {/* Checkboxes & Discount */}
        <div className="flex flex-wrap gap-8 items-center">
          {/* In Stock */}
          <div className="flex items-center space-x-2">
            <input
              id="inStock"
              name="inStock"
              type="checkbox"
              checked={initialValue.inStock}
              onChange={setFormValue}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="inStock" className="text-lg font-medium text-gray-700">
              In Stock
            </label>
          </div>

          {/* Discount Toggle */}
          <div className="flex items-center space-x-2">
            <input
              id="isDiscountActive"
              name="isDiscountActive"
              type="checkbox"
              checked={initialValue.isDiscountActive}
              onChange={setFormValue}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isDiscountActive" className="text-lg font-medium text-gray-700">
              Discount Active
            </label>
          </div>

          {/* Discount Input (only if active) */}
          {initialValue.isDiscountActive && (
            <div className="flex items-center space-x-2">
              <label htmlFor="ActiveDiscount" className="text-lg font-medium text-gray-700">
                Discount (%):
              </label>
              <input
                id="ActiveDiscount"
                name="ActiveDiscount"
                type="number"
                min={1}
                max={100}
                placeholder="Discount"
                value={initialValue.ActiveDiscount}
                onChange={setFormValue}
                className="block w-24 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder:text-base py-1 hover:border-blue-400"
              />
            </div>
          )}
        </div>

        {/* Thumbnail */}
        <div>
          <label htmlFor="thumbnail" className="block text-left text-lg font-medium text-gray-700">
            Thumbnail:
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="w-full cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors bg-gray-200">
                {initialValue?.thumbnailPreview ? (
                  <img src={initialValue.thumbnailPreview} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
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

export default ProductModalView;
