import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "../../context/ToastContext";
import axios from "axios";
import { API_ENDPOINT } from "../../constants/ApiEndPoints";
import { useTheme } from "../../context/ThemeContext"; 

const FeedBackModal = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const { theme } = useTheme(); // Get current theme
  const orderId = useSelector((state) => state.order.currentOrderId);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  // Get user from Redux state, fallback to guest if not available
  const user = useSelector((state) => state.auth.user || { username: "Guest", email: "" });
  const { accessToken } = useSelector((state) => state.auth);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        rating,
        comment,
        order: orderId,
      };

      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}v1/${API_ENDPOINT.ADD_FEEDBACK}`, payload, {
        headers: { Authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      });

      console.log("✅ Feedback submitted:", res.data);
      showToast("Thank you for your feedback!", "success");
      onClose();
    } catch (error) {
      console.error("❌ Feedback error:", error);
      showToast("Failed to submit feedback", "error");
    }
  };

  // Get user avatar or initial with theme colors
  const getUserAvatar = () => {
    if (user.avatar) {
      return <img src={user.avatar} alt={user.username} className="w-12 h-12 rounded-full object-cover" />;
    } else if (user.username && user.username !== "Guest") {
      return (
        <div className={`${theme.BG_ACCENT} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg`}>
          {user.username.charAt(0).toUpperCase()}
        </div>
      );
    } else {
      return (
        <div className={`${theme.BG_SECONDARY_ACCENT} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg`}>
          G
        </div>
      );
    }
  };

  return (
    <div className={`fixed inset-0 ${theme.MODAL_OVERLAY} flex items-center justify-center z-50 p-4`}>
      <div className={`${theme.MODAL_BG} w-full max-w-md overflow-hidden`}>
        {/* Header with theme gradient */}
        <div className={`${theme.BG_ACCENT} p-5 text-white`}>
          <h2 className="text-xl font-bold">Share Your Feedback</h2>
          <p className={`${theme.TEXT_SECONDARY} text-sm mt-0.5`}>We'd love to hear your thoughts</p>
        </div>

        {/* User info section */}
        <div className={`p-5 border-b ${theme.BORDER_COLOR}`}>
          <div className="flex items-center">
            {getUserAvatar()}
            <div className="ml-3">
              <h3 className={`font-semibold ${theme.TEXT_COLOR} text-sm`}>{user.username || "Guest User"}</h3>
              <p className={`text-xs ${theme.TEXT_SECONDARY}`}>{user.email || "guest@example.com"}</p>
            </div>
          </div>
        </div>

        {/* Feedback form */}
        <form onSubmit={handleSubmit} className="p-5">
          {/* Rating section */}
          <div className="mb-5">
            <label className={`block ${theme.TEXT_COLOR} text-sm font-medium mb-2`}>
              How would you rate your experience?
            </label>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-2xl ${
                    star <= (hoverRating || rating) ? `${theme.ICON_COLOR}` : `${theme.ICON_SECONDARY}`
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
            <div className={`text-center mt-1 text-xs ${theme.TEXT_SECONDARY}`}>
              {rating === 0 ? "Select your rating" : `${rating} out of 5`}
            </div>
          </div>

          {/* Comment section */}
          <div className="mb-5">
            <label htmlFor="comment" className={`block ${theme.TEXT_COLOR} text-sm font-medium mb-2`}>
              Your Feedback
            </label>
            <textarea
              id="comment"
              rows="3"
              className={`w-full px-3 py-2 text-sm ${theme.INPUT} rounded-lg transition-all duration-200`}
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
              className={`px-4 py-2 text-sm rounded-lg border ${theme.BORDER_COLOR} ${theme.TEXT_COLOR} ${theme.BUTTON_SECONDARY} transition-colors duration-200`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={rating === 0}
              className={`px-4 py-2 text-sm rounded-lg text-white font-medium transition-all duration-200 ${
                rating === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : `${theme.BUTTON} ${theme.SHADOW} hover:${theme.HOVER_SECONDARY_ACCENT}`
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