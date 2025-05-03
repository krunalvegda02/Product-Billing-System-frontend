import React from "react";
import CategoryView from "./CategoryView";
import { THEME } from "../../../constants/Theme";
import useModal from "../../../hooks/useModel";

const Category = () => {
  const currentTheme = THEME.GENERAL;
  const { openModal, closeModal, isOpen } = useModal();
  const categories = [
    {
      name: "Hot Beverages",
      imageUrl: "https://via.placeholder.com/300x200?text=Hot+Beverages",
    },
    {
      name: "Cold Drinks",
      imageUrl: "https://via.placeholder.com/300x200?text=Cold+Drinks",
    },
    {
      name: "Snacks",
      imageUrl: "https://via.placeholder.com/300x200?text=Snacks",
    },
    {
      name: "Desserts",
      imageUrl: "https://via.placeholder.com/300x200?text=Desserts",
    },
    {
      name: "Combo Meals",
      imageUrl: "https://via.placeholder.com/300x200?text=Combo+Meals",
    },
    {
      name: "Sandwiches",
      imageUrl: "https://via.placeholder.com/300x200?text=Sandwiches",
    },
  ];

  return <CategoryView categories={categories} openModal={openModal} closeModal={closeModal} isOpen={isOpen} currentTheme={currentTheme} />;
};

export default Category;
