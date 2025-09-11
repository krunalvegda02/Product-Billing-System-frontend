import React, { useState } from "react";
import { Star, Calendar, User, MessageCircle, Filter, TrendingUp, Award, ThumbsUp, ChevronDown, ChevronUp, X } from "lucide-react";

const FeedbackView = ({ feedbackData, filterRating, setFilterRating, formatDate, totalReviews, fiveStarReviews }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Function to render star ratings
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star 
          key={i} 
          size={18} 
          className={i < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"} 
        />
      ));
  };

  // Function to render rating bars for visual distribution
  const renderRatingDistribution = () => {
    const ratings = [5, 4, 3, 2, 1];
    
    return ratings.map((rating) => {
      const count = feedbackData.filter((f) => f.rating === rating).length;
      const percentage = feedbackData.length > 0 ? (count / feedbackData.length) * 100 : 0;
      
      return (
        <div key={rating} className="flex items-center justify-between mb-2 ">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 w-4">{rating}</span>
            <Star size={16} className="text-amber-500 ml-1" />
          </div>
          <div className="flex-1 mx-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
          <span className="text-sm text-gray-600 w-10 text-right">{count}</span>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-8 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg mb-3 sm:mb-4">
            <MessageCircle size={24} className="text-white" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-2 sm:mb-3">
            Customer Feedback
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-lg">
            Discover what our valued customers are saying about their experience at our café
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-between bg-white rounded-xl shadow-md p-4 font-medium text-gray-700"
          >
            <span className="flex items-center">
              <Filter size={18} className="mr-2 text-purple-500" />
              {filterRating === 0 ? "All Ratings" : `${filterRating} Star${filterRating > 1 ? "s" : ""}`}
            </span>
            {isFilterOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar with Stats and Filters */}
          <div className={`lg:col-span-1 space-y-6 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            {/* Rating Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <TrendingUp size={18} className="mr-2 text-blue-500" />
                Rating Summary
              </h2>

              {/* Average Rating */}
              <div className="text-center mb-6">
                {/* <div className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">{averageRating.toFixed(1)}</div> */}
                {/* <div className="flex justify-center mb-2">{renderStars(Math.round(averageRating))}</div> */}
                <p className="text-gray-600 text-sm">{totalReviews} reviews</p>
              </div>

              {/* Rating Distribution */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Rating Distribution</h3>
                {renderRatingDistribution()}
              </div>

              {/* Filter by Rating */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Filter size={16} className="mr-2 text-purple-500" />
                  Filter Reviews
                </h3>
                <div className="space-y-2">
                  {[0, 5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => {
                        setFilterRating(rating);
                        if (window.innerWidth < 1024) setIsFilterOpen(false);
                      }}
                      className={`w-full px-4 py-2 rounded-xl text-left transition-all duration-200 ${
                        filterRating === rating
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {rating === 0 ? "⭐ All Ratings" : `${"⭐".repeat(rating)} ${rating} Star${rating > 1 ? "s" : ""}`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Highlights */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-5 sm:p-6 text-white">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
                <Award size={18} className="mr-2" />
                Highlights
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                  <div>
                    <p className="text-sm opacity-90">Total Reviews</p>
                    <p className="text-xl sm:text-2xl font-bold">{totalReviews}</p>
                  </div>
                  <MessageCircle size={20} className="opacity-80" />
                </div>

                <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                  <div>
                    <p className="text-sm opacity-90">5-Star Reviews</p>
                    <p className="text-xl sm:text-2xl font-bold">{fiveStarReviews}</p>
                  </div>
                  <ThumbsUp size={20} className="opacity-80" />
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Cards Grid */}
          <div className="lg:col-span-3">
            {/* Active Filter Indicator */}
            {filterRating !== 0 && (
              <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-xl shadow-sm">
                <span className="text-sm text-gray-700">
                  Showing {filterRating}-star reviews only
                </span>
                <button 
                  onClick={() => setFilterRating(0)}
                  className="flex items-center text-sm text-purple-600 hover:text-purple-800"
                >
                  Clear filter
                  <X size={16} className="ml-1" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {feedbackData.map((feedback) => (
                <div
                  key={feedback.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="p-5 sm:p-6">
                    {/* Header with User Info and Rating */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold ${
                            feedback.avatarColor || "bg-gradient-to-r from-blue-500 to-purple-600"
                          }`}
                        >
                          {feedback.user?.Avatar ? (
                            <img 
                              src={feedback.user.Avatar} 
                              alt={feedback.user.username} 
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" 
                            />
                          ) : (
                            <User size={16} />
                          )}
                        </div>
                        <div className="ml-3">
                          <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-1">
                            {feedback.user.username}
                          </h3>
                          <div className="flex items-center mt-1">
                            {renderStars(feedback.rating)}
                            <span className="text-xs sm:text-sm text-gray-500 ml-2">{feedback.rating}.0</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full ml-2">
                        <Calendar size={12} className="mr-1" />
                        {formatDate(feedback.createdAt)}
                      </div>
                    </div>

                    {/* Comment */}
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mt-4">
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed line-clamp-4">
                        {feedback.comment}
                      </p>
                    </div>

                    {/* Review Meta */}
                    {feedback.orderDetails && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">
                          Ordered: {feedback.orderDetails.items} • {feedback.orderDetails.date}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {feedbackData.length === 0 && (
              <div className="text-center py-12 sm:py-16 bg-white rounded-2xl shadow-lg mt-4">
                <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  No reviews found
                </h3>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                  {filterRating === 0 ? "No reviews yet" : `No ${filterRating}-star reviews found`}
                </p>
                {filterRating !== 0 && (
                  <button
                    onClick={() => setFilterRating(0)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
                  >
                    Show all reviews
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackView;