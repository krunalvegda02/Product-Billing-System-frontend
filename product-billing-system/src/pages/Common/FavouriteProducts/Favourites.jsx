import React, { useEffect } from "react";
import FavouritesView from "./FavouritesView";
import { useDispatch, useSelector } from "react-redux";
import { getLikedProducts } from "../../../redux/Slices/productSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/commonComponent/Loading";

const Favourites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likedProducts, setLikedProducts] = React.useState([]);

  // ✅ Get data from redux (use product slice, not tableorder)
  const isLoading = useSelector((state) => state.product.loading);

  useEffect(() => {
    dispatch(getLikedProducts())
      .unwrap()
      .then((res) => {
        console.log("✅ API Response:", res);
        setLikedProducts(res.data || []);
      })
      .catch((err) => {
        console.error("❌ Error fetching liked products:", err);
      });
  }, [dispatch]);

  useEffect(() => {
    console.log(likedProducts);
  }, [likedProducts]);

  const dummyProducts = [
    {
      _id: "1",
      image: "https://images.unsplash.com/photo-1606813907297-4b95c0f28a03?auto=format&fit=crop&w=600&q=80",
      title: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation and 20 hours battery life.",
      price: 2999,
      discountPrice: 1999,
      category: "Electronics",
    },
    {
      _id: "2",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
      title: "Running Shoes",
      description: "Lightweight and breathable running shoes designed for comfort and speed.",
      price: 3499,
      discountPrice: 2799,
      category: "Sportswear",
    },
    {
      _id: "3",
      image: "https://images.unsplash.com/photo-1585238342028-4bc8d1d9a0a6?auto=format&fit=crop&w=600&q=80",
      title: "Smart Watch",
      description: "Stay connected and track your fitness with this sleek smartwatch.",
      price: 4999,
      discountPrice: null,
      category: "Gadgets",
    },
    {
      _id: "4",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
      title: "Classic Leather Jacket",
      description: "Stylish leather jacket that never goes out of fashion.",
      price: 7999,
      discountPrice: 5999,
      category: "Fashion",
    },
    {
      _id: "5",
      image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80",
      title: "Coffee Maker",
      description: "Brew your perfect cup with this compact and easy-to-use coffee maker.",
      price: 2499,
      discountPrice: 1999,
      category: "Home Appliances",
    },
  ];

  return (
    <div className="flex justify-center items-center h-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loading />
        </div>
      ) : likedProducts.length === 0 ? (
        <div className="text-center mt-10">
          <h2 className="text-lg font-semibold mb-4">No favourite products yet</h2>
          <button onClick={() => navigate("/products")} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Explore Products
          </button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid gap-6">
            <FavouritesView product={likedProducts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourites;
