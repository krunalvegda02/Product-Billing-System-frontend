import React, { useState, useRef, useEffect } from "react";
import CustomModal from "../../../../components/helperComponent/customModal";
import { THEME_CONFIG } from "../../../../constants/Theme"; // Import theme config

const CategoryModalView = ({ 
  isOpen, 
  onCancel, 
  onSubmit, 
  category, 
  products,
  mode = "add",
  theme = "GENERAL" // Add theme prop with default value
}) => {
  const [categoryName, setCategoryName] = useState(category?.categoryName || "");
  const [imagePreview, setImagePreview] = useState(category?.categoryThumbnail || "");
  const [selectedProducts, setSelectedProducts] = useState(category?.products || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fileInputRef = useRef(null);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Get the current theme configuration
  const currentTheme = THEME_CONFIG[theme] || THEME_CONFIG.GENERAL;

  // Reset form when modal opens/closes or category changes
  useEffect(() => {
    if (isOpen) {
      setCategoryName(category?.categoryName || "");
      setImagePreview(category?.categoryThumbnail || "");
      setSelectedProducts(category?.products || []);
      setSearchTerm("");
      setIsDropdownOpen(false);
    }
  }, [isOpen, category, mode]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) && 
        !searchRef.current?.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("File size should be less than 10MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!categoryName.trim()) {
      alert("Please enter a category name");
      return;
    }

    onSubmit({
      categoryName: categoryName.trim(),
      categoryThumbnail: imagePreview,
      products: selectedProducts,
    });
  };

  const handleCancel = () => {
    // reset before closing
    setCategoryName("");
    setImagePreview("");
    setSelectedProducts([]);
    setSearchTerm("");
    setIsDropdownOpen(false);

    if (onCancel) onCancel(); // call parent cancel handler
  };

  // Filter available products (not already selected)
  const availableProducts = products?.filter(
    (product) => !selectedProducts.some((selected) => selected.id === product.id)
  ) || [];

  const filteredAvailableProducts = availableProducts.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addProduct = (product) => {
    setSelectedProducts((prev) => [...prev, product]);
    setSearchTerm("");
    setIsDropdownOpen(false);
    searchRef.current?.focus();
  };

  const removeProduct = (productId) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <CustomModal
      isOpen={isOpen}
      onCancel={handleCancel}
      onSubmit={handleSave}
      title={
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${mode === "add" ? currentTheme.INFO_BG : currentTheme.WARNING_BG}`}>
            {mode === "add" ? (
              <span className={`text-2xl ${currentTheme.INFO}`}>📁</span>
            ) : (
              <span className={`text-2xl ${currentTheme.WARNING}`}>✏️</span>
            )}
          </div>
          <div>
            <h2 className={`font-bold text-2xl ${currentTheme.TITLE_TEXT}`}>
              {mode === "add" ? "Create New Category" : "Edit Category"}
            </h2>
            <p className={`mt-1 ${currentTheme.TEXT_SECONDARY}`}>
              {mode === "add"
                ? "Add a new product category"
                : "Update category details and products"}
            </p>
          </div>
        </div>
      }
      okText={mode === "add" ? "Create Category" : "Save Changes"}
      width="max-w-2xl"
      theme={theme} // Pass theme to CustomModal if it supports theming
    >
      <div className="my-6 space-y-6">
        {/* Category Name */}
        <div className="space-y-3">
          <label className={`block text-sm font-semibold flex items-center gap-2 ${currentTheme.TEXT_COLOR}`}>
            <span className={currentTheme.ICON_COLOR}>🏷️</span>
            Category Name
          </label>
          <input
            type="text"
            placeholder="e.g., Electronics, Clothing, Home Decor..."
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className={`w-full px-4 py-3 ${currentTheme.INPUT} rounded-xl transition-all placeholder-gray-400`}
          />
        </div>

        {/* Thumbnail Upload */}
        <div className="space-y-3">
          <label className={`block text-sm font-semibold flex items-center gap-2 ${currentTheme.TEXT_COLOR}`}>
            <span className={currentTheme.ICON_COLOR}>🖼️</span>
            Category Thumbnail
          </label>
          <div
            onClick={triggerFileInput}
            className="cursor-pointer transition-all hover:scale-[1.01]"
          >
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                imagePreview
                  ? `${currentTheme.SUCCESS_BG} border-green-300`
                  : `${currentTheme.CARD_BG} border-gray-300 hover:border-blue-400`
              }`}
            >
              {imagePreview ? (
                <div className="flex flex-col items-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto h-24 w-24 object-cover rounded-lg shadow-md border-4 border-white"
                  />
                  <p className={`text-sm mt-3 font-medium ${currentTheme.SUCCESS}`}>
                    ✅ Image uploaded successfully
                  </p>
                  <p className={`text-xs mt-1 ${currentTheme.LINK}`}>
                    Click to change image
                  </p>
                </div>
              ) : (
                <div className={`py-4 ${currentTheme.TEXT_SECONDARY}`}>
                  <div className="text-4xl mb-2">📤</div>
                  <p className="font-medium">Click to upload thumbnail</p>
                  <p className="text-sm mt-1">PNG, JPG, JPEG (Max 10MB)</p>
                </div>
              )}
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Products Selection */}
        <div className="space-y-3">
          <label className={`block text-sm font-semibold flex items-center gap-2 ${currentTheme.TEXT_COLOR}`}>
            <span className={currentTheme.ICON_COLOR}>🎯</span>
            Products in this Category
            <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${currentTheme.BADGE}`}>
              {selectedProducts.length} products
            </span>
          </label>

          {/* Search and Add Products */}
          <div className="relative" ref={dropdownRef}>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search products to add..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                  className={`w-full pl-10 pr-4 py-3 ${currentTheme.INPUT} rounded-xl transition-all`}
                />
                <span className={`absolute left-3 top-3.5 text-lg ${currentTheme.ICON_SECONDARY}`}>🔍</span>
              </div>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`px-4 py-3 ${currentTheme.BUTTON} rounded-xl font-medium transition-colors`}
              >
                Add +
              </button>
            </div>

            {/* Dropdown Results */}
            {isDropdownOpen && (
              <div className={`absolute top-full left-0 right-0 mt-2 border rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto ${currentTheme.MODAL_BG} ${currentTheme.TABLE_BORDER}`}>
                {filteredAvailableProducts.length > 0 ? (
                  <div className="py-2">
                    {filteredAvailableProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => addProduct(product)}
                        className={`flex items-center gap-3 p-3 cursor-pointer transition-all border-b last:border-b-0 ${currentTheme.TABLE_ROW} ${currentTheme.TABLE_ROW_HOVER}`}
                      >
                        <img
                          src={product.thumbnail || "https://via.placeholder.com/40"}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-lg border"
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${currentTheme.TEXT_COLOR}`}>{product.name}</p>
                          <p className={`text-xs ${currentTheme.TEXT_SECONDARY}`}>SKU: {product.sku || "N/A"}</p>
                        </div>
                        <div className="text-right">
                          <span className={`font-semibold ${currentTheme.TEXT_COLOR}`}>${product.price}</span>
                          <p
                            className={`text-xs ${
                              product.stock > 0 ? currentTheme.SUCCESS : currentTheme.ERROR
                            }`}
                          >
                            {product.stock > 0 ? `In stock` : "Out of stock"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`text-center py-6 ${currentTheme.TEXT_SECONDARY}`}>
                    <div className="text-3xl mb-2">📦</div>
                    <p className="font-medium">
                      {searchTerm ? "No products found" : "No products available"}
                    </p>
                    <p className="text-sm mt-1">
                      {searchTerm
                        ? "Try different search terms"
                        : "All products are already added"}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Selected Products List */}
          <div className={`border rounded-xl p-4 ${currentTheme.CARD_BG} ${currentTheme.TABLE_BORDER}`}>
            <h4 className={`font-medium mb-3 flex items-center gap-2 ${currentTheme.TEXT_COLOR}`}>
              <span className={currentTheme.ICON_COLOR}>✅</span>
              Added Products ({selectedProducts.length})
            </h4>

            {selectedProducts.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${currentTheme.TABLE_ROW} ${currentTheme.TABLE_ROW_HOVER}`}
                  >
                    <img
                      src={product.thumbnail || "https://via.placeholder.com/40"}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg border"
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${currentTheme.TEXT_COLOR}`}>{product.name}</p>
                      <p className={`text-xs ${currentTheme.TEXT_SECONDARY}`}>SKU: {product.sku || "N/A"}</p>
                    </div>
                    <div className="text-right mr-2">
                      <span className={`font-semibold ${currentTheme.TEXT_COLOR}`}>${product.price}</span>
                      <p
                        className={`text-xs ${
                          product.stock > 0 ? currentTheme.SUCCESS : currentTheme.ERROR
                        }`}
                      >
                        {product.stock > 0 ? `In stock` : "Out of stock"}
                      </p>
                    </div>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className={`p-2 rounded-lg transition-colors ${currentTheme.ERROR} hover:${currentTheme.ERROR_BG}`}
                      title="Remove product"
                    >
                      <span className="text-lg">×</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-8 ${currentTheme.TEXT_SECONDARY}`}>
                <div className="text-4xl mb-2">📭</div>
                <p className="font-medium">No products added yet</p>
                <p className="text-sm mt-1">Search and add products above</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default CategoryModalView;