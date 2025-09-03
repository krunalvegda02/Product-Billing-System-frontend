import React from "react";
import { Star, Calendar, User } from "lucide-react";

const FeedbackView = ({
  feedbackData,
  filterRating,
  setFilterRating,
  formatDate,
  totalReviews,
  averageRating,
  fiveStarReviews
}) => {
  // Function to render star ratings
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star 
          key={i} 
          size={16} 
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
        />
      ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Customer Feedback</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read what our valued customers have to say about their experience at our café.
          </p>
        </div>

        {/* Rating Filter */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-gray-700 font-medium mr-2">Filter by rating:</span>
            {[0, 5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => setFilterRating(rating)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  filterRating === rating ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {rating === 0 ? "All" : `${rating} Star${rating > 1 ? "s" : ""}`}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-sm p-5 text-center">
            <div className="text-3xl font-bold text-gray-800">{totalReviews}</div>
            <div className="text-gray-600">Total Reviews</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 text-center">
            <div className="text-3xl font-bold text-gray-800">{averageRating}</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 text-center">
            <div className="text-3xl font-bold text-gray-800">{fiveStarReviews}</div>
            <div className="text-gray-600">5-Star Reviews</div>
          </div>
        </div>

        {/* Feedback Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbackData.map((feedback) => (
            <div 
              key={feedback.id} 
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-5">
                {/* User Info and Rating */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${feedback.avatarColor}`}>
                      <User size={20} />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-800">{feedback.username}</h3>
                      <div className="flex items-center mt-1">
                        {renderStars(feedback.rating)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    {formatDate(feedback.date)}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-gray-600">{feedback.comment}</p>
              </div>
            </div>
          ))}
        </div>

        {feedbackData.length === 0 && (
          <div className="text-center py-12 w-full">
            <div className="text-gray-400 mb-2 w-full">No reviews found with selected rating</div>
            <button 
              onClick={() => setFilterRating(0)} 
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Show all reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackView;