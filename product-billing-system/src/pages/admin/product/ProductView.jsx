import React from "react";
import { ICONS } from "../../../constants/Icons";
import { THEME_CONFIG } from "../../../constants/Theme";




const ProductView = ({
  currentTheme,
  products,
  openModal,
  handleDeleteClick,
  handleEditClick,
  // New props for sorting and pagination
  sortOrder,
  setSortOrder,
  currentPage,
  totalPages,
  changePage,
}) => {
  const theme = THEME_CONFIG[currentTheme] || THEME_CONFIG.GENERAL;

  return (
    <div className={`w-full rounded-2xl mx-4 flex flex-col h-full ${theme.BACKGROUND_COLOR}`}>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center my-2 shrink-0">
        <h1 className={`${theme.TEXT_COLOR} ${theme.HEADER_TEXT_SIZE} font-bold text-2xl`}>Products</h1>
        <div className="flex items-center gap-3">
          {/* Sorting Dropdown */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button
            className={`rounded-full px-6 py-2 ${theme.BUTTON} transition duration-200`}
            onClick={openModal}
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="flex-1 overflow-y-scroll hide-scrollbar mb-3">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={index}
              className={`${theme.CARD_BG} ${theme.SHADOW} ${theme.BORDER_COLOR} rounded-2xl overflow-hidden flex flex-col justify-between`}
            >
              {/* Thumbnail */}
              <img
                src={product.thumbnail || "https://via.placeholder.com/300x180?text=Category"}
                alt={product.name}
                className="w-full h-32 object-cover"
              />

              {/* Content */}
              <div className="pt-1 flex flex-col justify-between grow">
                <div className="flex justify-between">
                  <h3 className={`text-md font-semibold mb-2 ${theme.TEXT_COLOR}`}>
                    {product.name || "Unnamed"}
                  </h3>
                  <p className={`text-md font-semibold mb-2 ${theme.BG_ACCENT} px-2 py-1 rounded-xl text-white`}>
                    {product.price || "N/A"}
                  </p>
                </div>

                <p className={`text-sm mb-2 ${theme.TEXT_COLOR}`}>
                  {product.description || "No description available"}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-auto">
                  <button
                    className={`${theme.SUCCESS} text-xl`}
                    title="Edit"
                    onClick={() => handleEditClick(product)}
                  >
                    <ICONS.EDIT_ICON className="size-5" />
                  </button>
                  <button
                    className={`${theme.ERROR} text-xl`}
                    title="Delete"
                    onClick={() => handleDeleteClick(product)}
                  >
                    <ICONS.DELETE_ICON className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 py-3">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => changePage(i + 1)}
            className={`px-3 py-1 border rounded-md ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductView;
