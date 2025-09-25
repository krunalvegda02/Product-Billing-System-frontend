import React from "react";
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Folder } from "lucide-react"; // Lucide icons
import { THEME_CONFIG } from "../../../constants/Theme";
import { useTheme } from "../../../context/ThemeContext";

const CategoryView = ({
  categories,
  openModal,
  handleDeleteClick,
  handleEditClick,
  sortOrder,
  setSortOrder,
  currentPage,
  totalPages,
  changePage,
  handleCategoryClick,
}) => {
  const {theme} = useTheme();

  return (
    <div className={`min-h-screen p-6 ${theme.BACKGROUND_COLOR}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`flex flex-wrap justify-between items-center mb-8 p-6 rounded-2xl ${theme.CARD_BG} ${theme.CARD_HOVER}`}>
          <div>
            <h1 className={`text-3xl font-bold ${theme.TITLE_TEXT} flex items-center gap-3`}>
              <Folder size={32} className={theme.ICON_COLOR} />
              Categories
            </h1>
            <p className={`mt-1 ${theme.TEXT_SECONDARY}`}>Manage your product categories</p>
          </div>

          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            {/* Sorting Dropdown */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ChevronRight size={20} className={theme.ICON_SECONDARY} />
              </div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={`pl-10 pr-4 py-2 ${theme.INPUT} rounded-lg transition`}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <button
              className={`flex items-center gap-2 ${theme.BUTTON} px-6 py-2.5 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg`}
              onClick={openModal}
            >
              <Plus size={20} />
              Add Category
            </button>
          </div>
        </div>

        {/* Category Grid */}
        <div className="mb-8">
          {categories.length === 0 ? (
            <div className={`text-center py-16 rounded-2xl ${theme.CARD_BG}`}>
              <Folder size={64} className={`mx-auto mb-4 ${theme.ICON_SECONDARY}`} />
              <h3 className={`text-xl font-semibold mb-2 ${theme.TEXT_COLOR}`}>No categories found</h3>
              <p className={`mb-6 ${theme.TEXT_SECONDARY}`}>Get started by creating your first category</p>
              <button onClick={openModal} className={`${theme.BUTTON} px-6 py-3 rounded-lg font-medium`}>
                Create First Category
              </button>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((category) => (
                <div
                  onClick={() => handleCategoryClick(category)}
                  key={category._id}
                  className={`rounded-2xl overflow-hidden ${theme.CARD_BG} ${theme.CARD_HOVER} transition-all duration-300 transform hover:-translate-y-2 flex flex-col cursor-pointer`}
                >
                  <div className="relative">
                    <img
                      src={
                        category.categoryThumbnail ||
                        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      }
                      alt={category.categoryName}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        className={`p-2 rounded-full text-white shadow-md hover:shadow-lg transition-all ${theme.INFO_BG}`}
                        title="Edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(category);
                        }}
                      >
                        <Edit2 size={16} className={theme.INFO} />
                      </button>
                      <button
                        className={`p-2 rounded-full text-white shadow-md hover:shadow-lg transition-all ${theme.ERROR_BG}`}
                        title="Delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(category);
                        }}
                      >
                        <Trash2 size={16} className={theme.ERROR} />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col justify-between grow">
                    <h3 className={`text-lg font-semibold mb-2 ${theme.TEXT_COLOR}`}>{category.categoryName || "Unnamed Category"}</h3>
                    <div className={`mt-4 pt-3 border-t flex justify-between items-center ${theme.TABLE_BORDER}`}>
                      <span className={`text-xs ${theme.TEXT_SECONDARY}`}>Products: {category.productCount || 0}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${theme.BADGE}`}>{category.status || "Active"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className={`flex justify-center items-center gap-2 p-4 rounded-2xl ${theme.CARD_BG}`}>
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition ${
                currentPage === 1 ? `${theme.BUTTON_SECONDARY} opacity-50 cursor-not-allowed` : `${theme.BUTTON_SECONDARY} hover:bg-gray-50`
              }`}
            >
              <ChevronLeft size={16} />
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => changePage(i + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
                  currentPage === i + 1 ? `${theme.BG_ACCENT} text-white shadow-md` : `${theme.BUTTON_SECONDARY} hover:bg-gray-50`
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg border transition ${
                currentPage === totalPages ? `${theme.BUTTON_SECONDARY} opacity-50 cursor-not-allowed` : `${theme.BUTTON_SECONDARY} hover:bg-gray-50`
              }`}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryView;
