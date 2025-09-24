import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "../../context/ToastContext";
import axios from "axios";
import { API_ENDPOINT } from "../../constants/ApiEndPoints";

const FeedBackModal = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const orderId = useSelector((state) => state.order.currentOrderId);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  // Get user from Redux state, fallback to guest if not available
  const user = useSelector((state) => state.auth.user || { username: "Guest", email: "" });
  const {accessToken} = useSelector((state) => state.auth);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔑 Payload for API
      const payload = {
        rating,
        comment,
        order: orderId, // 👈 you need to pass the current order id
      };

      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}v1/${API_ENDPOINT.ADD_FEEDBACK}`, payload, {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });

      console.log("✅ Feedback submitted:", res.data);
      showToast("Thank you for your feedback!", "success");

      onClose(); // close modal after success
    } catch (error) {
      console.error("❌ Feedback error:", error);
      showToast("Failed to submit feedback", "error");
    }
  };

  // Get user avatar or initial
  const getUserAvatar = () => {
    if (user.avatar) {
      return <img src={user.avatar} alt={user.username} className="w-12 h-12 rounded-full object-cover" />;
    } else if (user.username && user.username !== "Guest") {
      return (
        <div className="bg-gradient-to-r from-indigo-400 to-purple-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {user.username.charAt(0).toUpperCase()}
        </div>
      );
    } else {
      return (
        <div className="bg-gradient-to-r from-gray-400 to-gray-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
          G
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-5 text-white">
          <h2 className="text-xl font-bold">Share Your Feedback</h2>
          <p className="text-blue-100 text-sm mt-0.5">We'd love to hear your thoughts</p>
        </div>

        {/* User info section */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center">
            {getUserAvatar()}
            <div className="ml-3">
              <h3 className="font-semibold text-gray-800 text-sm">{user.username || "Guest User"}</h3>
              <p className="text-xs text-gray-500">{user.email || "guest@example.com"}</p>
            </div>
          </div>
        </div>

        {/* Feedback form */}
        <form onSubmit={handleSubmit} className="p-5">
          {/* Rating section */}
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-medium mb-2">How would you rate your experience?</label>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-2xl ${
                    star <= (hoverRating || rating) ? "text-yellow-400" : "text-gray-300"
                  } transition-transform duration-150 hover:scale-110 focus:outline-none`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`Rate ${star} stars`}
                >
                  {star <= (hoverRating || rating) ? "★" : "☆"}
                </button>
              ))}
            </div>
            <div className="text-center mt-1 text-xs text-gray-500">{rating === 0 ? "Select your rating" : `${rating} out of 5`}</div>
          </div>

          {/* Comment section */}
          <div className="mb-5">
            <label htmlFor="comment" className="block text-gray-700 text-sm font-medium mb-2">
              Your Feedback
            </label>
            <textarea
              id="comment"
              rows="3"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="What did you like or what can we improve?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={rating === 0}
              className={`px-4 py-2 text-sm rounded-lg text-white font-medium transition-all duration-200 ${
                rating === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg"
              }`}
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedBackModal;
