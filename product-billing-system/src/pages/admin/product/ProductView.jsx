import React, { useState } from "react";
import { ICONS } from "../../../constants/Icons";
import { THEME_CONFIG, THEME } from "../../../constants/Theme";
import { Plus, ArrowUpDown, Utensils, ChevronLeft, ChevronRight, Search, Filter, Edit3, Trash2, IndianRupee, Menu, X } from "lucide-react";

const ProductView = ({
  currentTheme = THEME.GENERAL,
  products,
  openModal,
  handleDeleteClick,
  handleEditClick,
  sortOrder,
  setSortOrder,
  currentPage,
  totalPages,
  changePage,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  totalProducts
}) => {
  const theme = THEME_CONFIG[currentTheme] || THEME_CONFIG[THEME.GENERAL];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen ${theme.BACKGROUND_GRADIENT} p-4 sm:p-6 mx-auto`}>
      <div className="max-w-7xl mx-auto">
        {/* Header - Redesigned for better spacing */}
        <div className={`flex flex-col lg:flex-row justify-between lg:items-center mb-6 sm:mb-8 p-4 sm:p-6 ${theme.CARD_BG} rounded-2xl ${theme.SHADOW}`}>
          {/* Left Section: Title + Mobile Toggle */}
          <div className="flex justify-between items-center w-full lg:w-auto mb-4 lg:mb-0">
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${theme.TITLE_TEXT}`}>
                Product Management
              </h1>
              <p className={`${theme.TEXT_SECONDARY} mt-1 text-sm sm:text-base`}>
                {totalProducts} products found
              </p>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg bg-gray-100 ml-3"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Desktop Controls */}
          <div className="hidden lg:flex flex-wrap gap-3 w-full lg:w-auto justify-end">
            {/* Search */}
            <div className="relative flex-1 sm:flex-initial min-w-[200px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className={theme.ICON_SECONDARY} />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 w-full ${theme.INPUT} rounded-lg transition`}
              />
            </div>

            {/* Filter */}
            <div className="relative flex-1 sm:flex-initial min-w-[180px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className={theme.ICON_SECONDARY} />
              </div>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`pl-10 pr-8 py-2 w-full ${theme.INPUT} rounded-lg transition`}
              >
                <option value="all">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sorting */}
            <div className="relative flex-1 sm:flex-initial min-w-[180px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ArrowUpDown size={18} className={theme.ICON_SECONDARY} />
              </div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={`pl-10 pr-8 py-2 w-full ${theme.INPUT} rounded-lg transition`}
              >
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Add Product Button */}
            <button
              className={`flex items-center justify-center gap-2 ${theme.BUTTON} px-4 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex-1 sm:flex-initial`}
              onClick={openModal}
            >
              <Plus size={20} />
              <span className="hidden sm:block">Add Product</span>
            </button>
          </div>

          {/* Mobile Controls */}
          {isMobileMenuOpen && (
            <div className="lg:hidden w-full mt-4 space-y-3">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className={theme.ICON_SECONDARY} />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 w-full ${theme.INPUT} rounded-lg transition`}
                />
              </div>

              {/* Filter + Sorting */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter size={18} className={theme.ICON_SECONDARY} />
                  </div>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`pl-10 pr-8 py-2 w-full ${theme.INPUT} rounded-lg transition`}
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ArrowUpDown size={18} className={theme.ICON_SECONDARY} />
                  </div>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className={`pl-10 pr-8 py-2 w-full ${theme.INPUT} rounded-lg transition`}
                  >
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Add Button */}
              <button
                className={`flex items-center justify-center gap-2 ${theme.BUTTON} px-4 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg w-full`}
                onClick={openModal}
              >
                <Plus size={20} />
                Add Product
              </button>
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className="mb-6 sm:mb-8">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, index) => (
              <div
                key={index}
                className={`${theme.CARD_BG} rounded-2xl overflow-hidden ${theme.SHADOW} ${theme.CARD_HOVER} transition-all duration-300 transform hover:-translate-y-1 flex flex-col border ${theme.TABLE_BORDER}`}
              >
                {/* Thumbnail with overlay */}
                <div className="relative">
                  <img
                    src={
                      product.thumbnail ||
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                    }
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button
                      className={`p-2 ${theme.BG_ACCENT} rounded-full text-white ${theme.SHADOW} hover:shadow-lg transition-all`}
                      title="Edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(product);
                      }}
                    >
                      <ICONS.EDIT_ICON className="size-4" />
                    </button>
                    <button
                      className={`p-2 ${theme.ERROR_BG} rounded-full text-white ${theme.SHADOW} hover:shadow-lg transition-all`}
                      title="Delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(product);
                      }}
                    >
                      <ICONS.DELETE_ICON className="size-4" />
                    </button>
                  </div>
                  {product.isPopular && (
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 ${theme.BADGE_WARNING} text-white text-xs font-medium rounded-full shadow-sm`}>
                        Popular
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col justify-between grow">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className={`text-lg font-semibold ${theme.TEXT_COLOR} line-clamp-1`}>{product.name || "Unnamed Product"}</h3>
                      <div className={`flex items-center ${theme.BG_ACCENT} text-white px-2 py-1 rounded-lg min-w-[70px] justify-center`}>
                        <IndianRupee size={14} />
                        <span className="font-bold ml-1">{product.price || "0"}</span>
                      </div>
                    </div>

                    <p className={`text-sm ${theme.TEXT_SECONDARY} mb-4 line-clamp-2`}>{product.description || "No description available"}</p>
                  </div>

                  {/* Category and Status */}
                  <div className={`flex justify-between items-center pt-3 border-t ${theme.TABLE_BORDER}`}>
                    <span className={`text-xs px-2 py-1 ${theme.INFO_BG} ${theme.INFO} rounded-full`}>{product.category || "Uncategorized"}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        product.status === "available" 
                          ? `${theme.SUCCESS_BG} ${theme.SUCCESS}` 
                          : `${theme.ERROR_BG} ${theme.ERROR}`
                      }`}
                    >
                      {product.status || "unknown"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className={`flex flex-col sm:flex-row justify-center items-center gap-3 ${theme.CARD_BG} p-4 rounded-2xl ${theme.SHADOW}`}>
            <div className="flex items-center gap-2">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg border ${theme.TABLE_BORDER} hover:${theme.BACKGROUND_COLOR} disabled:opacity-50 disabled:cursor-not-allowed transition`}
              >
                <ChevronLeft size={16} className={theme.ICON_SECONDARY} />
                <span className="hidden sm:block">Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={i}
                      onClick={() => changePage(pageNum)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition ${
                        currentPage === pageNum
                          ? `${theme.BUTTON} ${theme.SHADOW}`
                          : `border ${theme.TABLE_BORDER} hover:${theme.BACKGROUND_COLOR}`
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 5 && <span className={`px-2 ${theme.TEXT_SECONDARY}`}>...</span>}
              </div>

              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg border ${theme.TABLE_BORDER} hover:${theme.BACKGROUND_COLOR} disabled:opacity-50 disabled:cursor-not-allowed transition`}
              >
                <span className="hidden sm:block">Next</span>
                <ChevronRight size={16} className={theme.ICON_SECONDARY} />
              </button>
            </div>

            <div className={`text-sm ${theme.TEXT_SECONDARY}`}>
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 && (
          <div className={`text-center py-8 sm:py-12 ${theme.CARD_BG} rounded-2xl ${theme.SHADOW}`}>
            <div className={`mx-auto w-16 h-16 sm:w-24 sm:h-24 ${theme.BACKGROUND_COLOR} rounded-full flex items-center justify-center mb-4`}>
              <Utensils size={30} className={theme.ICON_COLOR} />
            </div>
            <h3 className={`text-xl font-semibold ${theme.TEXT_COLOR} mb-2`}>No products found</h3>
            <p className={`${theme.TEXT_SECONDARY} mb-4 px-4`}>Try adjusting your search or filter to find what you're looking for</p>
            <button
              className={`flex items-center justify-center gap-2 ${theme.BUTTON} px-4 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg mx-auto`}
              onClick={openModal}
            >
              <Plus size={20} />
              Add Your First Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductView;