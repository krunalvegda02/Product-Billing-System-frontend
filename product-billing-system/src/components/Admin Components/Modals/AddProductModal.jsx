import React, { useState, useRef } from "react";
import useToast from "../../../hooks/useToast"; // Assuming this is your hook
import CustomModal from "../../helperComponent/customModal";

const AddProductModal = ({ isOpen, onCancel }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const fileInputRef = useRef(null);
  const { showToast } = useToast(); // Toast hook

  const handleFileChange = (e) => {
    const file = e.target?.files[0];

    if (!file) return;

    const fileSizeKB = file.size / 1024;

    if (fileSizeKB > 10) {
      showToast("Image size must be less than or equal to 10KB.", "error");
      e.target.value = "";
      return;
    }

    if (
      file &&
      (file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png")
    ) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setThumbnail(file);
    } else {
      setImagePreview(null);
      setThumbnail(null);
    }
  };

  const onOkClick = () => {
    // TODO: Handle form submission, API FOR ADDING Product
    console.log({
      name: productName,
      price: productPrice,
      thumbnail,
    });

    setProductName("");
    setProductPrice("");
    setImagePreview(null);
    setThumbnail(null);
    onCancel();
  };

  const handleCancel = () => {
    setProductName("");
    setProductPrice("");
    setImagePreview(null);
    setThumbnail(null);
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onCancel={onCancel}
      onCancel={handleCancel}
      onSubmit={onOkClick}
      okDisabled={!productName || !productPrice || !thumbnail}
      title={<p className="font-sans font-semibold text-2xl">Add New Product</p>}
    >
      <div className="space-y-4 my-4">
        {/* Name Input */}
        <div>
          <label
            htmlFor="productName"
            className="block text-left text-lg font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            id="productName"
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-2 block w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder:text-base py-1 hover:border-blue-400"
          />
        </div>

        {/* Price Input */}
        <div>
          <label
            htmlFor="productPrice"
            className="block text-left text-lg font-medium text-gray-700"
          >
            Price:
          </label>
          <input
            id="productPrice"
            type="number"
            placeholder="Enter product price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="mt-2 block w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder:text-base py-1 hover:border-blue-400"
          />
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label
            htmlFor="productThumbnail"
            className="block text-left text-lg font-medium text-gray-700"
          >
            Thumbnail:
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="w-full cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                {imagePreview ? (
                  <div className="bg-gray-200">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto h-32 w-32 object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="text-gray-500">
                    <p>Click to upload image</p>
                    <p className="text-sm">PNG, JPG, JPEG up to 10KB</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default AddProductModal;
