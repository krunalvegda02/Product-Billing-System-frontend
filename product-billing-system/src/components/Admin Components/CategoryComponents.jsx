import React from "react";
import { THEME, THEME_CONFIG } from "../../../src/constants/Theme";
import { ICONS } from "../../constants/Icons";
import useModal from "../../hooks/useModel";
import AddCategoryModal from "./Modals/AddCategoryModal";

const CategoryComponents = () => {
  const currentTheme = THEME.LIGHT;

  const EditIcon = ICONS.EDIT_ICON;
  const DeleteIcon = ICONS.DELETE_ICON;

  const { openModal, closeModal, isOpen } = useModal();

  const categories = ["Vegeterain", "non-vegiterian", "PAneer", "salad"];

  return (
    <div className="max-w-6xl w-full mx-auto px-4">
      <div className="flex flex-wrap justify-between items-center my-4">
        <h1 className="font-semibold text-2xl">Categories</h1>
        <button className={`border-2 rounded-full px-6 py-2 ${THEME_CONFIG[currentTheme].BACKGROUND_COLOR}`} onClick={openModal}>
          <span className="text-base">Add Category</span> +
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <div className="border-2 p-4 rounded-2xl min-w-0" key={index}>
            <p className="mb-2 font-medium">{category}</p>
            <div className="flex justify-end gap-3">
              <button className={`${THEME_CONFIG[currentTheme].SUCCESS}`}>{EditIcon}</button>
              <button className={`${THEME_CONFIG[currentTheme].WARNING}`}>{DeleteIcon}</button>
            </div>
          </div>
        ))}
      </div>
      <AddCategoryModal isOpen={isOpen} onClose={closeModal}/>
    </div>
  );
};

export default CategoryComponents;
