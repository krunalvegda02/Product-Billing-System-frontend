import React, { useState } from "react";
import ProductCard from "../../../components/commonComponent/ProductCard";
import MenuHeader from "../../../components/commonComponent/MenuHeader";
import Order from "../Order";
import { X } from "lucide-react";

const MenuView = ({ products = [], categories = [], selectedCategoryID, handleCategorySelect }) => {
  const [siderOpen, setSiderOpen] = useState(false);

  return (
    <>
      {/* Top Header */}
      <div className="flex justify-between items-center px-4 py-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold">Hotel Menu</h1>
        <button onClick={() => setSiderOpen(true)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          My Order
        </button>
      </div>

      {/* Categories */}
      <div className="p-4 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <div
            className={`px-4 py-2 rounded-full bg-gray-100 hover:bg-green-200 text-sm font-medium text-gray-700 border cursor-pointer ${
              selectedCategoryID === "" ? "bg-slate-500 text-white" : "bg-white"
            }`}
            onClick={() => handleCategorySelect("")}
          >
            All Menu Items
          </div>
          {categories.map((category) => (
            <div
              key={category._id}
              className={`px-4 py-2 rounded-full bg-gray-100 hover:bg-green-200 text-sm font-medium text-gray-700 border cursor-pointer ${
                selectedCategoryID === category._id ? "bg-slate-500 text-white" : "bg-white"
              }`}
              onClick={() => handleCategorySelect(category._id)}
            >
              {category.categoryName}
            </div>
          ))}
        </div>

        {/* Products */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product._id} product={product} />)
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products available.</p>
          )}
        </div>
      </div>

      {/* Order Sider */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg border-l transition-transform duration-300 ease-in-out z-50 ${
          siderOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Your Order</h2>
          <button onClick={() => setSiderOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="p-4 h-[calc(100%-64px)] overflow-y-auto">
          <Order />
        </div>
      </div>
    </>
  );
};

export default MenuView;
