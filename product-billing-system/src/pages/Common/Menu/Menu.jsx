import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../redux/Slices/categorySlice";
import { fetchCategoryProducts, getAllProducts } from "../../../redux/Slices/productSlice";
import { useToast } from "../../../context/ToastContext";
import MenuView from "./MenuView";


const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategoryID, setSelectedCategoryID] = useState("");

  const order = useSelector((state) => state.order); // 🔁 Replace 'order' with your actual slice name if different

  useEffect(() => {
    console.log("🧾 Current Order:" ,order);
  }, [order]);

  const dispatch = useDispatch();
  const { showToast } = useToast();

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryID(categoryId);
  };

  const loadAllCategories = async () => {
    try {
      const res = await dispatch(getAllCategories()).unwrap();
      const allCategories = res.data.categories;
      setCategories(allCategories);
      if (allCategories.length > 0) {
        setSelectedCategoryID(""); // Default to showing all products
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      showToast("Failed to load categories", err.message);
    }
  };

  const loadProducts = async () => {
    try {
      if (selectedCategoryID) {
        const res = await dispatch(fetchCategoryProducts({ categoryId: selectedCategoryID })).unwrap();
        setProducts(res.data.products);
      } else {
        const res = await dispatch(getAllProducts()).unwrap();
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error("Error loading products:", err);
      showToast("Failed to load products", err.message);
    }
  };

  useEffect(() => {
    loadAllCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [selectedCategoryID]);

  return <MenuView categories={categories} products={products} selectedCategoryID={selectedCategoryID} handleCategorySelect={handleCategorySelect} />;
};

export default Menu;
