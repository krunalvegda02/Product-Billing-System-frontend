import React, { useState } from "react";
import { ICONS } from "../../../constants/Icons";
import { THEME_CONFIG } from "../../../constants/Theme";
import { Plus, ArrowUpDown, Utensils, ChevronLeft, ChevronRight, Search, Filter, Edit3, Trash2, IndianRupee, Menu, X } from "lucide-react";

const ProductView = ({
  currentTheme,
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
  const theme = THEME_CONFIG[currentTheme] || THEME_CONFIG.GENERAL;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 mx-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header - Redesigned for better spacing */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-6 sm:mb-8 p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
          {/* Left Section: Title + Mobile Toggle */}
          <div className="flex justify-between items-center w-full lg:w-auto mb-4 lg:mb-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Product Management
              </h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">
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
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Filter */}
            <div className="relative flex-1 sm:flex-initial min-w-[180px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                <ArrowUpDown size={18} className="text-gray-400" />
              </div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="pl-10 pr-8 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              >
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Add Product Button */}
            <button
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex-1 sm:flex-initial"
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
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Filter + Sorting */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter size={18} className="text-gray-400" />
                  </div>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ArrowUpDown size={18} className="text-gray-400" />
                  </div>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="pl-10 pr-8 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg w-full"
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
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col border border-gray-100"
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
                      className="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full text-white shadow-md hover:shadow-lg transition-all"
                      title="Edit"
                      onClick={() => handleEditClick(product)}
                    >
                      <ICONS.EDIT_ICON className="size-4" />
                    </button>
                    <button
                      className="p-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full text-white shadow-md hover:shadow-lg transition-all"
                      title="Delete"
                      onClick={() => handleDeleteClick(product)}
                    >
                      <ICONS.DELETE_ICON className="size-4" />
                    </button>
                  </div>
                  {product.isPopular && (
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-medium rounded-full shadow-sm">
                        Popular
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col justify-between grow">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name || "Unnamed Product"}</h3>
                      <div className="flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-lg min-w-[70px] justify-center">
                        <IndianRupee size={14} />
                        <span className="font-bold ml-1">{product.price || "0"}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description || "No description available"}</p>
                  </div>

                  {/* Category and Status */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{product.category || "Uncategorized"}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        product.status === "available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
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
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 bg-white p-4 rounded-2xl shadow-lg">
            <div className="flex items-center gap-2">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={16} />
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
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                          : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 5 && <span className="px-2 text-gray-500">...</span>}
              </div>

              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <span className="hidden sm:block">Next</span>
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-8 sm:py-12 bg-white rounded-2xl shadow-lg">
            <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
              <Utensils size={30} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4 px-4">Try adjusting your search or filter to find what you're looking for</p>
            <button
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg mx-auto"
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