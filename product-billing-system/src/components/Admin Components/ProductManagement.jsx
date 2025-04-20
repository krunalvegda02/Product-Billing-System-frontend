import React from "react";
import { THEME, THEME_CONFIG } from "../../../src/constants/Theme";
import { ICONS } from "../../constants/Icons";

const ProductManagement = () => {
  const categories = ["HEY", "hy", "hello"];
  const currentTheme = THEME.LIGHT;
  const EditIcon = ICONS.EDIT_ICON;
  const DeleteIcon = ICONS.DELETE_ICON;

  return (
    <div>
      <div className="max-w-6xl mx-5">
        <div className="flex  justify-between my-4 ">
          <h1 className="font-semibold text-2xl">Product Management</h1>
          <button className={`border-2 rounded-full px-6 py-2 ${THEME_CONFIG[currentTheme].BACKGROUND_COLOR} `}>Add Product +</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {categories.map((category, index) => (
            <div className="flex-col border-2 p-4 flex-grow  rounded-2xl" key={index}>
              <p className="flex ">{category}</p>
              <div className="flex justify-end gap-3">
                <button className={`${THEME_CONFIG[currentTheme].SUCCESS} `}>{EditIcon}</button>
                <button className={`${THEME_CONFIG[currentTheme].WARNING} `}>{DeleteIcon}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
