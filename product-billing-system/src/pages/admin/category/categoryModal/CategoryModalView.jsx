import React, { useState, useRef } from "react";
import CustomModal from "../../../../components/helperComponent/customModal";
import { ICONS } from "../../../../constants/Icons";

const CategoryModalView = ({ 
  isOpen, 
  onCancel, 
  onSubmit, 
  category, 
  products,
  mode = "add" // "add" or "edit"
}) => {
  const [categoryName, setCategoryName] = useState(category?.categoryName || "");
  const [imagePreview, setImagePreview] = useState(category?.categoryThumbnail || "");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSave = () => {
    onSubmit({
      categoryName,
      categoryThumbnail: imagePreview,
      products: selectedProducts
    });
  };
  
  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onCancel={onCancel}
      onSubmit={handleSave}
      title={
        <p className="font-sans font-semibold text-2xl">
          {mode === "add" ? "Add New Category" : "Edit Category"}
        </p>
      }
      okText={mode === "add" ? "Add Category" : "Save Changes"}
      width="max-w-3xl"
    >
      <div className="space-y-6 my-4 max-h-96 overflow-y-auto p-2">
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
          <div className="flex items-center justify-center w-full mt-2">
            <label className="w-full cursor-pointer">
              <div
                className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors ${imagePreview ? "bg-white" : "bg-gray-100"}`}
              >
                {imagePreview ? (
                  <div className="flex flex-col items-center">
                    <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
                    <p className="text-sm text-blue-500 mt-2">Click to change image</p>
                  </div>
                ) : (
                  <div className="text-gray-500">
                    <p>Click to upload image</p>
                    <p className="text-sm">PNG, JPG, JPEG up to 10MB</p>
                  </div>
                )}
              </div>
              <input 
                ref={fileInputRef} 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </label>
          </div>
        </div>
        
        {/* Products Selection (only in edit mode) */}
        {mode === "edit" && (
          <div>
            <label className="block text-left text-lg font-medium text-gray-700 mb-2">
              Products in this category:
            </label>
            <div className="border rounded-lg p-3 max-h-40 overflow-y-auto">
              {products && products.length > 0 ? (
                products.map(product => (
                  <div key={product.id} className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                      className="rounded text-blue-500"
                    />
                    <img
                      src={product.thumbnail || "https://via.placeholder.com/40"}
                      alt={product.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <span className="text-sm flex-1">{product.name}</span>
                    <span className="text-sm text-gray-500">${product.price}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No products available</p>
              )}
            </div>
          </div>
        )}
      </div>
    </CustomModal>
  );
};

export default CategoryModalView;