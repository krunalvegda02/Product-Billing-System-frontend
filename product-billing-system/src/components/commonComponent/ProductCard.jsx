import React from "react";
import { useDispatch } from "react-redux";
import { addItemToOrder, decreaseItemQuantity } from "../../redux/Slices/orderManagementSlice";
import { Heart, HeartOff, Plus, Minus } from "lucide-react";

const ProductCard = ({ product = {} }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = React.useState(false);

  const handleLikeToggle = () => {
    setLiked((prev) => !prev);
  };

  const increment = () => {
    dispatch(addItemToOrder(product));
  };

  const decrement = () => {
    dispatch(decreaseItemQuantity(product._id));
  };

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition duration-300">
      <img src={product.thumbnail || "https://via.placeholder.com/300x200?text=No+Image"} alt={product.name} className="w-full h-48 object-cover" />

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <button onClick={handleLikeToggle} className="text-red-500">
            {liked ? <HeartOff size={20} /> : <Heart size={20} />}
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-green-600 font-semibold text-lg">₹ {product.price}</p>
          <div className="flex items-center gap-2">
            <button onClick={decrement} className="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300">
              <Minus size={10} />
            </button>
            <span className="text-lg font-semibold text-gray-600">1</span>
            <button onClick={increment} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
              <Plus size={10} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
