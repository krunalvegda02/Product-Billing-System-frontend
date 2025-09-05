import React from "react";
import { ICONS } from "../../../constants/Icons";
import { THEME_CONFIG } from "../../../constants/Theme";

const CategoryView = ({
  currentTheme,
  categories,
  openModal,
  handleDeleteClick,
  handleEditClick,
  sortOrder,
  setSortOrder,
  currentPage,
  totalPages,
  changePage,
}) => {
  const theme = THEME_CONFIG[currentTheme] || THEME_CONFIG.GENERAL;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-8 p-6 bg-white rounded-2xl shadow-lg">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Categories
            </h1>
            <p className="text-gray-500 mt-1">Manage your product categories</p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            {/* Sorting Dropdown */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              </div>
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)} 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <button 
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
              onClick={openModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Category
            </button>
          </div>
        </div>

        {/* Category Grid */}
        <div className="mb-8">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category, index) => {
              const EditIcon = ICONS.EDIT_ICON;
              const DeleteIcon = ICONS.DELETE_ICON;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={category.categoryThumbnail || "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"}
                      alt={category.categoryName}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button 
                        className="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full text-white shadow-md hover:shadow-lg transition-all"
                        title="Edit" 
                        onClick={() => handleEditClick(category)}
                      >
                        <EditIcon size={16} />
                      </button>
                      <button 
                        className="p-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full text-white shadow-md hover:shadow-lg transition-all"
                        title="Delete" 
                        onClick={() => handleDeleteClick(category)}
                      >
                        <DeleteIcon size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 flex flex-col justify-between grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.categoryName || "Unnamed Category"}</h3>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-xs text-gray-500">Products: {category.productCount || 0}</span>
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                        {category.status || "Active"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 bg-white p-4 rounded-2xl shadow-lg">
            <button 
              onClick={() => changePage(currentPage - 1)} 
              disabled={currentPage === 1} 
              className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Prev
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => changePage(i + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
                  currentPage === i + 1 
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md" 
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryView;