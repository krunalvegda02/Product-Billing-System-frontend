import React, { useState } from "react";
import ProductCard from "../../../components/commonComponent/ProductCard";
import Order from "../Order";
import { X, ShoppingBag, ChefHat, Utensils, Star } from "lucide-react";

const MenuView = ({ products = [], categories = [], selectedCategoryID, handleCategorySelect }) => {
  const [siderOpen, setSiderOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Top Header */}
      <div className="flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl shadow-md">
            <Utensils className="text-white" size={28} />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gourmet Menu
          </h1>
        </div>
        <button 
          onClick={() => setSiderOpen(true)} 
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-5 py-3 rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <ShoppingBag size={20} />
          My Order
        </button>
      </div>

      {/* Categories */}
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <div
            className={`px-5 py-3 rounded-xl flex items-center gap-2 text-sm font-medium border-0 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg ${
              selectedCategoryID === "" 
                ? "bg-gradient-to-r from-slate-700 to-slate-800 text-white" 
                : "bg-gradient-to-r from-white to-blue-50 text-slate-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100"
            }`}
            onClick={() => handleCategorySelect("")}
          >
            <Star size={16} className={selectedCategoryID === "" ? "text-yellow-300" : "text-blue-400"} />
            All Menu Items
          </div>
          {categories.map((category) => (
            <div
              key={category._id}
              className={`px-5 py-3 rounded-xl flex items-center gap-2 text-sm font-medium border-0 cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg ${
                selectedCategoryID === category._id 
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" 
                  : "bg-gradient-to-r from-white to-indigo-50 text-slate-700 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100"
              }`}
              onClick={() => handleCategorySelect(category._id)}
            >
              <ChefHat size={16} className={selectedCategoryID === category._id ? "text-yellow-300" : "text-purple-400"} />
              {category.categoryName}
            </div>
          ))}
        </div>

        {/* Products */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product._id} product={product} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-2xl shadow-inner max-w-md mx-auto">
                <p className="text-gray-500 text-lg">No products available in this category.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Sider */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-gradient-to-b from-white to-blue-50 shadow-2xl border-l transition-transform duration-500 ease-in-out z-50 ${
          siderOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Your Order
          </h2>
          <button 
            onClick={() => setSiderOpen(false)}
            className="p-2 bg-gradient-to-r from-red-100 to-pink-100 rounded-full hover:from-red-200 hover:to-pink-200 transition-all duration-300"
          >
            <X size={20} className="text-red-500" />
          </button>
        </div>
        <div className="p-6 h-[calc(100%-80px)] overflow-y-auto">
          <Order />
        </div>
      </div>

      {/* Overlay when sider is open */}
      {siderOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-500"
          onClick={() => setSiderOpen(false)}
        />
      )}
    </div>
  );
};

export default MenuView;