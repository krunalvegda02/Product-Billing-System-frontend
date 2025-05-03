import React from "react";
import { ICONS } from "../../../constants/Icons";
import { THEME_CONFIG } from "../../../constants/Theme";

const CategoryView = ({ currentTheme, categories, openModal, handleDeleteClick, handleEditClick }) => {
  const theme = THEME_CONFIG[currentTheme] || THEME_CONFIG.GENERAL;
  return (
    <div className={`w-full rounded-2xl mx-4 flex flex-col h-full  ${theme.BACKGROUND_COLOR}`}>
      <div className="flex flex-wrap justify-between items-center my-2 shrink-0">
        <h1 className={`${theme.TEXT_COLOR} ${theme.HEADER_TEXT_SIZE} font-bold text-2xl`}>Menu Categories</h1>
        <button className={`rounded-full px-6 py-2 ${theme.BUTTON} transition duration-200`} onClick={openModal}>
          + Add Category
        </button>
      </div>
      <div className="flex-1 overflow-y-scroll hide-scrollbar mb-3">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 over ">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${theme.CARD_BG} ${theme.SHADOW} ${theme.BORDER_COLOR} rounded-2xl overflow-hidden flex flex-col justify-between`}
            >
              <img
                src={category.categoryThumbnail || "https://via.placeholder.com/300x180?text=Category"}
                alt={category.categoryName}
                className="w-full h-32 object-cover"
              />
              <div className="pt-1 flex flex-col justify-between grow">
                <h3 className={`text-lg font-semibold mb-2 ${theme.TEXT_COLOR}`}>{category.categoryName || "Unnamed"}</h3>
                <div className="flex justify-end gap-3 mt-auto">
                  <button className={`${theme.SUCCESS} text-xl`} title="Edit" onClick={() => handleEditClick(category)}>
                    {ICONS.EDIT_ICON}
                  </button>
                  <button className={`${theme.ERROR} text-xl`} title="Delete" onClick={() => handleDeleteClick(category)}>
                    {ICONS.DELETE_ICON}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryView;
