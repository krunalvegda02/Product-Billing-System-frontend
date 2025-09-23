import React from "react";
import CustomModal from "../../../../components/helperComponent/customModal";
import { ICONS } from "../../../../constants/Icons";

const CategoryDetailModal = ({ 
  isOpen, 
  onCancel, 
  category, 
  handleEditClick, 
  handleDeleteClick,
  products 
}) => {
  const EditIcon = ICONS.EDIT_ICON;
  const DeleteIcon = ICONS.DELETE_ICON;
  
console.log(products);


  return (
    <CustomModal
      isOpen={isOpen}
      onCancel={onCancel}
      onSubmit={() => {}}
      title={<p className="font-sans font-semibold text-2xl">Category Details</p>}
      hideFooter={true}
      width="max-w-4xl"
    >
      <div className="space-y-6 my-4">
        {/* Header with thumbnail and basic info */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <img
              src={category?.categoryThumbnail || "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"}
              alt={category?.categoryName}
              className="w-full h-48 object-cover rounded-xl shadow-md"
            />
          </div>
          
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{category?.categoryName || "Unnamed Category"}</h2>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Status</p>
                <p className={`font-medium ${category?.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                  {category?.status || "Active"}
                </p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Products</p>
                <p className="font-medium text-gray-800">{products?.length || 0}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                <p className="text-sm text-gray-500">Created At</p>
                <p className="font-medium text-gray-800">
                  {category?.createdAt ? new Date(category.createdAt).toLocaleDateString() : "Not available"}
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => handleEditClick(category)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
              >
                <EditIcon size={16} />
                Edit Category
              </button>
              
              <button
                onClick={() => handleDeleteClick(category)}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
              >
                <DeleteIcon size={16} />
                Delete Category
              </button>
            </div>
          </div>
        </div>
        
        {/* Products Section */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Products in this Category</h3>
          
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-80 overflow-y-auto p-2">
              {products.map((product) => (
                <div key={product.id} className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
                  <img
                    src={product.thumbnail || "https://via.placeholder.com/50"}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">${product.price}</p>
                  </div>
                  <button className="text-red-500 hover:text-red-700 text-sm font-medium">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No products in this category yet.</p>
              <button className="text-blue-500 hover:text-blue-700 mt-2 font-medium">
                Add Products
              </button>
            </div>
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default CategoryDetailModal;