import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { removeNullValues } from "../../../helper/helperFunction";
import { createProduct, updateProduct, deselectProduct } from "../../../redux/Slices/productSlice";
import { getAllCategories, resetCategorySlice } from "../../../redux/Slices/categorySlice";
import store from "../../../redux/Store/store";
import CustomModal from "../../helperComponent/customModal";
import { useToast } from "../../../context/ToastContext";
import { THEME, THEME_CONFIG } from "../../../constants/Theme";
import { useTheme } from "../../../context/ThemeContext";

const AddProductModal = ({ isOpen, onCancel, onSave, currentTheme = THEME.GENERAL }) => {
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

  // Get the current theme configuration
  const { theme } = useTheme();

  const handleFileChange = (e) => {
    const file = e.target?.files[0];
    if (file && ["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
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
    }
  };

  const handleSaveModal = async () => {
    const payload = formValue;
    const action = formValue.id ? updateProduct : createProduct;
    await dispatch(action(removeNullValues(payload)));
    dispatch(deselectProduct());
    onSave?.();
    onCancel?.();
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

  // When product is selected, load it into form
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

  // Fetch categories when modal opens
  useEffect(() => {
    if (isOpen) {
      dispatch(resetCategorySlice());

      (async () => {
        try {
          const categories = await dispatch(getAllCategories()).unwrap();
        } catch (err) {
          showToast(err.message, "error");
          console.error("Error fetching categories:", err);
        }
      })();
    }
  }, [isOpen, dispatch]);

  // Cleanup
  useEffect(() => {
    return () => {
      dispatch(deselectProduct());
    };
  }, []);

  // Controlled input handler
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;

    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "number") {
      const num = Number(value);
      newValue = name === "ActiveDiscount" ? Math.min(100, Math.max(1, num)) : num;
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
      title={<p className={`font-sans font-semibold text-2xl ${theme.TEXT_COLOR}`}>Add New Product</p>}
      okDisabled={false}
      modalClassName={theme.MODAL_BG}
      overlayClassName={theme.MODAL_OVERLAY}
      buttonPrimaryClassName={theme.BUTTON}
      buttonSecondaryClassName={theme.BUTTON_SECONDARY}
    >
      <div className="space-y-6 my-4">
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className={`block text-left text-lg font-medium ${theme.TEXT_COLOR}`}>
              Name:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formValue.name}
              onChange={handleInputChange}
              className={`mt-2 block w-full border-b-2 ${theme.INPUT} placeholder:${theme.TEXT_SECONDARY} py-1 transition-colors`}
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className={`block text-left text-lg font-medium ${theme.TEXT_COLOR}`}>
              Price:
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min={0}
              step={0.1}
              placeholder="Enter price"
              value={formValue.price}
              onChange={handleInputChange}
              className={`mt-2 block w-full border-b-2 ${theme.INPUT} placeholder:${theme.TEXT_SECONDARY} py-1 transition-colors`}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="categoryOfProduct" className={`block text-left text-lg font-medium ${theme.TEXT_COLOR}`}>
            Category:
          </label>
          <select
            id="categoryOfProduct"
            name="categoryOfProduct"
            value={formValue.categoryOfProduct}
            onChange={handleInputChange}
            className={`mt-2 block w-full border-b-2 ${theme.INPUT} placeholder:${theme.TEXT_SECONDARY} py-1 transition-colors`}
          >
            <option value="">-- Select Category --</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className={`block text-left text-lg font-medium ${theme.TEXT_COLOR}`}>
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            value={formValue.description}
            onChange={handleInputChange}
            className={`mt-2 block w-full border-b-2 ${theme.INPUT} placeholder:${theme.TEXT_SECONDARY} py-1 transition-colors`}
          />
        </div>

        {/* Checkboxes & Discount */}
        <div className="flex flex-wrap gap-8 items-center">
          <div className="flex items-center space-x-2">
            <input
              id="inStock"
              name="inStock"
              type="checkbox"
              checked={formValue.inStock}
              onChange={handleInputChange}
              className={`w-5 h-5 ${theme.ICON_COLOR} border-gray-300 rounded focus:ring-2 focus:ring-${theme.ICON_COLOR.split("text-")[1]}`}
            />
            <label htmlFor="inStock" className={`text-lg font-medium ${theme.TEXT_COLOR}`}>
              In Stock
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="isDiscountActive"
              name="isDiscountActive"
              type="checkbox"
              checked={formValue.isDiscountActive}
              onChange={handleInputChange}
              className={`w-5 h-5 ${theme.ICON_COLOR} border-gray-300 rounded focus:ring-2 focus:ring-${theme.ICON_COLOR.split("text-")[1]}`}
            />
            <label htmlFor="isDiscountActive" className={`text-lg font-medium ${theme.TEXT_COLOR}`}>
              Discount Active
            </label>
          </div>

          {formValue.isDiscountActive && (
            <div className="flex items-center space-x-2">
              <label htmlFor="ActiveDiscount" className={`text-lg font-medium ${theme.TEXT_COLOR}`}>
                Discount (%):
              </label>
              <input
                id="ActiveDiscount"
                name="ActiveDiscount"
                type="number"
                min={1}
                max={100}
                placeholder="Discount"
                value={formValue.ActiveDiscount || ""}
                onChange={handleInputChange}
                className={`block w-24 border-b-2 ${theme.INPUT} placeholder:${theme.TEXT_SECONDARY} py-1 transition-colors`}
              />
            </div>
          )}
        </div>

        {/* Thumbnail */}
        <div>
          <label htmlFor="thumbnail" className={`block text-left text-lg font-medium ${theme.TEXT_COLOR}`}>
            Thumbnail:
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="w-full cursor-pointer">
              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                  formValue?.thumbnailPreview ? theme.BG_SECONDARY_ACCENT : `${theme.BORDER_COLOR} hover:${theme.BG_ACCENT} hover:bg-opacity-10`
                }`}
              >
                {formValue?.thumbnailPreview ? (
                  <img src={formValue.thumbnailPreview} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
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

export default AddProductModal;
