import React, { useState } from "react";
import ProductCard from "../../../components/commonComponent/ProductCard";
import Order from "../Order";
import { X, ShoppingBag, ChefHat, Utensils, Star, Sparkles } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const MenuView = ({ products = [], categories = [], selectedCategoryID, handleCategorySelect }) => {
  const [siderOpen, setSiderOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme.BACKGROUND_GRADIENT} transition-all duration-500`}>
      {/* Top Header with Enhanced Design */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="flex justify-between items-center px-6 py-8 max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4">
            <div className={`p-4 ${theme.BG_ACCENT} rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300`}>
              <Utensils className="text-white" size={32} />
            </div>
            <div>
              <h1 className={`text-5xl font-bold ${theme.TITLE_TEXT} mb-1`}>Gourmet Menu</h1>
              <p className={`text-sm ${theme.TEXT_SECONDARY} flex items-center gap-1`}>
                <Sparkles size={14} />
                Discover culinary excellence
              </p>
            </div>
          </div>

      <button 
  onClick={() => setSiderOpen(true)} 
  className={`hidden md:flex ${theme.BUTTON} items-center gap-3 px-6 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group`}
>
  <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
  My Order
  <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
</button>

        </div>
      </div>

      {/* Enhanced Categories Section */}
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className={`text-2xl font-semibold ${theme.TITLE_TEXT} mb-2`}>Our Culinary Categories</h2>
          <p className={`text-sm ${theme.TEXT_SECONDARY} max-w-2xl mx-auto`}>
            Explore our carefully curated menu categories, each crafted with passion and expertise
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {/* All Items Category */}
          <div
            className={`px-6 py-4 rounded-2xl flex items-center gap-3 font-medium cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border ${
              selectedCategoryID === ""
                ? `${theme.BG_ACCENT} text-white border-transparent shadow-md`
                : `${theme.CARD_BG} ${theme.TEXT_COLOR} border ${theme.BORDER_COLOR}/20 hover:border-${theme.BORDER_COLOR}/40`
            }`}
            onClick={() => handleCategorySelect("")}
          >
            <div className={`p-2 rounded-lg ${selectedCategoryID === "" ? "bg-white/20" : theme.BG_ACCENT}`}>
              <Star size={18} className={selectedCategoryID === "" ? "text-yellow-300" : "text-white"} />
            </div>
            <span className="font-semibold">All Menu Items</span>
          </div>

          {/* Category Cards */}
          {categories.map((category, index) => (
            <div
              key={category._id}
              className={`px-6 py-4 rounded-2xl flex items-center gap-3 font-medium cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border ${
                selectedCategoryID === category._id
                  ? `${theme.BG_ACCENT} text-white border-transparent shadow-md`
                  : `${theme.CARD_BG} ${theme.TEXT_COLOR} border ${theme.BORDER_COLOR}/20 hover:border-${theme.BORDER_COLOR}/40`
              }`}
              onClick={() => handleCategorySelect(category._id)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`p-2 rounded-lg ${selectedCategoryID === category._id ? "bg-white/20" : theme.BG_ACCENT}`}>
                <ChefHat size={18} className={selectedCategoryID === category._id ? "text-yellow-300" : "text-white"} />
              </div>
              <span className="font-semibold">{category.categoryName}</span>
            </div>
          ))}
        </div>

        {/* Enhanced Products Grid */}
        <div className="mb-6">
          <h3 className={`text-xl font-semibold ${theme.TITLE_TEXT} mb-4 flex items-center gap-2`}>
            <Sparkles size={20} className={theme.ICON_COLOR} />
            {selectedCategoryID
              ? `Specialties from ${categories.find((c) => c._id === selectedCategoryID)?.categoryName || "Category"}`
              : "All Culinary Delights"}
          </h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={product._id}
                className="transform hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className={`${theme.CARD_BG} p-8 rounded-3xl shadow-inner max-w-md mx-auto border ${theme.BORDER_COLOR}/20`}>
                <div className={`p-4 ${theme.BG_ACCENT} rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                  <Utensils className="text-white" size={24} />
                </div>
                <p className={`text-lg ${theme.TEXT_SECONDARY} mb-2`}>No products available</p>
                <p className={`text-sm ${theme.TEXT_SECONDARY}`}>Check back soon for new additions!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Order Sider */}
      <div
        className={`fixed top-0 right-0 h-full w-96 ${theme.MODAL_BG} shadow-2xl border-l transition-all duration-500 ease-in-out z-50 ${
          siderOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sider Header */}
        <div className={`p-6 border-b ${theme.TABLE_BORDER}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${theme.BG_ACCENT} rounded-lg`}>
                <ShoppingBag size={20} className="text-white" />
              </div>
              <div>
                <h2 className={`text-xl font-semibold ${theme.TITLE_TEXT}`}>Your Order</h2>
                <p className={`text-xs ${theme.TEXT_SECONDARY}`}>Review and customize your selection</p>
              </div>
            </div>
            <button
              onClick={() => setSiderOpen(false)}
              className={`p-2 rounded-full ${theme.BUTTON_SECONDARY} hover:scale-110 transition-all duration-200`}
            >
              <X size={20} className={theme.ICON_SECONDARY} />
            </button>
          </div>
        </div>

        {/* Order Content */}
        <div className="p-6 h-[calc(100%-80px)] overflow-y-auto">
          <Order />
        </div>

        {/* Sider Footer */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${theme.TABLE_BORDER} ${theme.CARD_BG}`}>
          <button className={`w-full ${theme.BUTTON} py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}>
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Enhanced Overlay */}
      {siderOpen && (
        <div
          className={`fixed inset-0 ${theme.MODAL_OVERLAY} z-40 transition-opacity duration-500 backdrop-blur-sm`}
          onClick={() => setSiderOpen(false)}
        />
      )}

      {/* Floating Action Button for Mobile */}
      <button
        onClick={() => setSiderOpen(true)}
        className={`lg:hidden fixed bottom-6 right-6 ${theme.BG_ACCENT} text-white p-4 rounded-full shadow-2xl z-30 animate-bounce hover:scale-110 transition-transform duration-300`}
      >
        <ShoppingBag size={24} />
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-bold">
          3
        </div>
      </button>
    </div>
  );
};

export default MenuView;
