import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToOrder, decreaseItemQuantity } from "../../redux/Slices/orderManagementSlice";
import { toggleProductLiked } from "../../redux/Slices/productSlice";
import { Heart, Plus, Minus } from "lucide-react";
import { useToast } from "../../context/ToastContext"; // <-- your toast hook

const ProductCard = ({ product = {} }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const userId = useSelector((state) => state.auth.user._id);

  // Local state to refresh icon immediately
  const [liked, setLiked] = useState(product?.likedBy?.includes(userId));

  const quantity = useSelector((state) => {
    const item = state.order.orderItems.find((i) => i._id === product._id);
    return item ? item.quantity : 0;
  });

  const handleLikeToggle = async () => {
    if (!product?._id) {
      console.warn("No product id found", product);
      return;
    }

    // Optimistic update
    setLiked((prev) => !prev);

    try {
      await dispatch(toggleProductLiked({ id: product._id })).unwrap();
      showToast(liked ? "Removed from favorites" : "Added to favorites", "success");
    } catch (err) {
      // rollback if failed
      setLiked((prev) => !prev);
      showToast(err?.message, "error");
    }
  };

  const increment = () => {
    dispatch(addItemToOrder(product));
    showToast("Added to cart", "success");
  };

  const decrement = () => {
    if (quantity > 0) {
      dispatch(decreaseItemQuantity(product._id));
      showToast("Removed from cart", "info");
    }
  };
  if (!product || !product._id) {
    return <div className="p-4 border rounded-lg bg-red-50 text-red-700">Invalid Product Data</div>;
  } 

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden border hover:shadow-lg transition duration-300">
      <img src={product.thumbnail || "https://via.placeholder.com/300x200?text=No+Image"} alt={product.name} className="w-full h-48 object-cover" />

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <button onClick={handleLikeToggle} className="text-red-500 hover:scale-110 transition">
            <Heart size={22} fill={liked ? "red" : "none"} stroke={liked ? "red" : "currentColor"} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-green-600 font-semibold text-lg">₹ {product.price}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={decrement}
              className={`px-2 py-1 rounded transition ${
                quantity === 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              disabled={quantity === 0}
            >
              <Minus size={14} />
            </button>
            <span className="text-lg font-semibold text-gray-600 min-w-[24px] text-center">{quantity}</span>
            <button onClick={increment} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition">
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
