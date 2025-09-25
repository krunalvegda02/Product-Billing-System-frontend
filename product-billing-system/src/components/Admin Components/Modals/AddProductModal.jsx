import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { removeNullValues } from "../../../helper/helperFunction";
import { createProduct, updateProduct, deselectProduct } from "../../../redux/Slices/productSlice";
import { getAllCategories, resetCategorySlice } from "../../../redux/Slices/categorySlice";
import store from "../../../redux/Store/store";
import CustomModal from "../../helperComponent/customModal";
import { useToast } from "../../../context/ToastContext";
import { useTheme } from "../../../context/ThemeContext";
import { Upload, Image, Package, DollarSign, Tag, FileText, Grid, CheckCircle, Percent } from "lucide-react";

const AddProductModal = ({ isOpen, onCancel, onSave }) => {
  const [formValue, setFormValue] = useState({
    id: null,
    name: "",
    description: "",
    price: 0,
    inStock: true,
    thumbnail: null,
    thumbnailPreview: null,
    categoryOfProduct: "",
    isDiscountActive: false,
    ActiveDiscount: null,
  });

  const { selectedProduct } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);
  const { dispatch } = store;
  const { showToast } = useToast();
  const fileInputRef = useRef(null);
  const { theme } = useTheme();

  const handleFileChange = (e) => {
    const file = e.target?.files[0];
    if (file && ["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
      if (file.size > 10 * 1024 * 1024) {
        showToast("File size exceeds 10MB limit", "error");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setFormValue((prev) => ({
        ...prev,
        thumbnailPreview: imageUrl,
        thumbnail: file,
      }));
    } else {
      setFormValue((prev) => ({
        ...prev,
        thumbnailPreview: null,
        thumbnail: null,
      }));
      if (file) {
        showToast("Please upload a valid image file (JPG, JPEG, PNG)", "error");
      }
    }
  };

  const handleSaveModal = async () => {
    if (!formValue.name.trim()) {
      showToast("Product name is required", "error");
      return;
    }
    if (!formValue.categoryOfProduct) {
      showToast("Please select a category", "error");
      return;
    }
    if (formValue.price <= 0) {
      showToast("Price must be greater than 0", "error");
      return;
    }

    const payload = formValue;
    const action = formValue.id ? updateProduct : createProduct;
    try {
      await dispatch(action(removeNullValues(payload)));
      dispatch(deselectProduct());
      showToast(`Product ${formValue.id ? 'updated' : 'created'} successfully!`, "success");
      onSave?.();
      onCancel?.();
    } catch (error) {
      showToast(error.message || "Failed to save product", "error");
    }
  };

  const handleCancelModal = () => {
    setFormValue({
      id: null,
      name: "",
      description: "",
      price: 0,
      inStock: true,
      thumbnail: null,
      thumbnailPreview: null,
      categoryOfProduct: "",
      isDiscountActive: false,
      ActiveDiscount: null,
    });
    dispatch(deselectProduct());
    onCancel?.();
  };

  const removeImage = () => {
    setFormValue((prev) => ({
      ...prev,
      thumbnailPreview: null,
      thumbnail: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (selectedProduct?._id) {
      setFormValue((prev) => ({
        ...prev,
        id: selectedProduct._id,
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        price: selectedProduct.price || 0,
        inStock: selectedProduct.inStock ?? true,
        thumbnail: null,
        thumbnailPreview: selectedProduct.thumbnail || null,
        categoryOfProduct: selectedProduct.categoryOfProduct?._id || "",
        isDiscountActive: selectedProduct.isDiscountActive ?? false,
        ActiveDiscount: selectedProduct.ActiveDiscount || null,
      }));
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (isOpen) {
      dispatch(resetCategorySlice());
      (async () => {
        try {
          await dispatch(getAllCategories()).unwrap();
        } catch (err) {
          showToast(err.message, "error");
          console.error("Error fetching categories:", err);
        }
      })();
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(deselectProduct());
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;

    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "number") {
      const num = Number(value);
      newValue = name === "ActiveDiscount" ? Math.min(100, Math.max(0, num)) : Math.max(0, num);
    } else {
      newValue = value;
    }

    setFormValue((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  if (!isOpen) return null;

  return (
    <CustomModal
      isOpen={isOpen}
      onCancel={handleCancelModal}
      onSubmit={handleSaveModal}
      title={
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${theme.BG_ACCENT} bg-opacity-10`}>
            <Package className={`w-6 h-6 ${theme.ICON_COLOR}`} />
          </div>
          <div>
            <p className={`font-semibold text-2xl ${theme.TEXT_COLOR}`}>
              {formValue.id ? 'Edit Product' : 'Add New Product'}
            </p>
            <p className={`text-sm ${theme.TEXT_SECONDARY}`}>
              {formValue.id ? 'Update product details' : 'Create a new product for your menu'}
            </p>
          </div>
        </div>
      }
      okDisabled={false}
      modalClassName={`${theme.MODAL_BG} max-w-2xl`}
      overlayClassName={theme.MODAL_OVERLAY}
      buttonPrimaryClassName={theme.BUTTON}
      buttonSecondaryClassName={theme.BUTTON_SECONDARY}
    >
      <div className="space-y-6 my-4">
        {/* Product Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className={`flex items-center gap-2 text-lg font-medium ${theme.TEXT_COLOR}`}>
              <Tag className="w-4 h-4" />
              Product Name *
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter product name"
                value={formValue.name}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-xl ${theme.INPUT} ${theme.SHADOW} transition-all duration-200 focus:scale-[1.02]`}
              />
              <Tag className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme.ICON_SECONDARY}`} />
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label htmlFor="price" className={`flex items-center gap-2 text-lg font-medium ${theme.TEXT_COLOR}`}>
              <DollarSign className="w-4 h-4" />
              Price *
            </label>
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                min={0}
                step={0.01}
                placeholder="0.00"
                value={formValue.price}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 rounded-xl ${theme.INPUT} ${theme.SHADOW} transition-all duration-200 focus:scale-[1.02]`}
              />
              <DollarSign className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme.ICON_SECONDARY}`} />
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label htmlFor="categoryOfProduct" className={`flex items-center gap-2 text-lg font-medium ${theme.TEXT_COLOR}`}>
            <Grid className="w-4 h-4" />
            Category *
          </label>
          <div className="relative">
            <select
              id="categoryOfProduct"
              name="categoryOfProduct"
              value={formValue.categoryOfProduct}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 rounded-xl ${theme.INPUT} ${theme.SHADOW} appearance-none transition-all duration-200 focus:scale-[1.02]`}
            >
              <option value="">-- Select Category --</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
            <Grid className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme.ICON_SECONDARY}`} />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className={`flex items-center gap-2 text-lg font-medium ${theme.TEXT_COLOR}`}>
            <FileText className="w-4 h-4" />
            Description
          </label>
          <div className="relative">
            <textarea
              id="description"
              name="description"
              placeholder="Enter product description..."
              value={formValue.description}
              onChange={handleInputChange}
              rows={3}
              className={`w-full pl-10 pr-4 py-3 rounded-xl ${theme.INPUT} ${theme.SHADOW} transition-all duration-200 focus:scale-[1.02] resize-none`}
            />
            <FileText className={`absolute left-3 top-3 w-4 h-4 ${theme.ICON_SECONDARY}`} />
          </div>
        </div>

        {/* Checkboxes & Discount */}
        <div className={`p-4 rounded-xl ${theme.CARD_BG} ${theme.SHADOW}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* In Stock Toggle */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  id="inStock"
                  name="inStock"
                  type="checkbox"
                  checked={formValue.inStock}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors duration-200 ${
                  formValue.inStock ? theme.BG_ACCENT : 'bg-gray-300'
                }`}></div>
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                  formValue.inStock ? 'transform translate-x-4' : ''
                }`}></div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-4 h-4 ${formValue.inStock ? theme.ICON_COLOR : theme.ICON_SECONDARY}`} />
                <span className={`font-medium ${theme.TEXT_COLOR}`}>In Stock</span>
              </div>
            </label>

            {/* Discount Toggle */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  id="isDiscountActive"
                  name="isDiscountActive"
                  type="checkbox"
                  checked={formValue.isDiscountActive}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className={`w-10 h-6 rounded-full transition-colors duration-200 ${
                  formValue.isDiscountActive ? theme.BG_ACCENT : 'bg-gray-300'
                }`}></div>
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                  formValue.isDiscountActive ? 'transform translate-x-4' : ''
                }`}></div>
              </div>
              <div className="flex items-center gap-2">
                <Percent className={`w-4 h-4 ${formValue.isDiscountActive ? theme.ICON_COLOR : theme.ICON_SECONDARY}`} />
                <span className={`font-medium ${theme.TEXT_COLOR}`}>Discount</span>
              </div>
            </label>

            {/* Discount Percentage */}
            {formValue.isDiscountActive && (
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <input
                    id="ActiveDiscount"
                    name="ActiveDiscount"
                    type="number"
                    min={1}
                    max={100}
                    placeholder="0"
                    value={formValue.ActiveDiscount || ""}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg ${theme.INPUT} ${theme.SHADOW}`}
                  />
                  <Percent className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme.ICON_SECONDARY}`} />
                </div>
                <span className={`text-sm font-medium ${theme.TEXT_COLOR}`}>%</span>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div className="space-y-3">
          <label className={`flex items-center gap-2 text-lg font-medium ${theme.TEXT_COLOR}`}>
            <Image className="w-4 h-4" />
            Product Image
          </label>
          
          <div className="flex flex-col items-center justify-center">
            <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            
            {formValue.thumbnailPreview ? (
              <div className="relative group">
                <img 
                  src={formValue.thumbnailPreview} 
                  alt="Product preview" 
                  className="w-48 h-48 object-cover rounded-2xl shadow-lg border-2 border-white"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-2xl transition-all duration-200 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={removeImage}
                    className={`opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 ${theme.BUTTON} px-4 py-2 rounded-lg transition-all duration-200`}
                  >
                    Change Image
                  </button>
                </div>
              </div>
            ) : (
              <label className="cursor-pointer">
                <div className={`w-48 h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-200 hover:scale-105 ${theme.BORDER_COLOR} hover:${theme.BG_ACCENT} hover:bg-opacity-5`}>
                  <Upload className={`w-12 h-12 mb-3 ${theme.ICON_SECONDARY}`} />
                  <p className={`font-medium ${theme.TEXT_COLOR}`}>Upload Image</p>
                  <p className={`text-xs mt-1 ${theme.TEXT_SECONDARY}`}>PNG, JPG, JPEG (max 10MB)</p>
                </div>
              </label>
            )}
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default AddProductModal;