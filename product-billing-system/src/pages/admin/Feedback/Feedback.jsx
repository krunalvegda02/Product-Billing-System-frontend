import React, { useEffect, useState } from "react";
import FeedbackView from "./FeedbackView";
import axios from "axios";
import { API_ENDPOINT } from "../../../constants/ApiEndPoints";
import { useSelector } from "react-redux";

const Feedback = () => {
  const APIURL = import.meta.env.VITE_BASE_URL;
  const token = useSelector((state) => state.auth.accessToken);
  const [feedbackData, setFeedbackData] = useState([]);

  const [filterRating, setFilterRating] = useState(0);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(`${APIURL}v1/${API_ENDPOINT.GET_FEEDBACKS}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeedbackData(res.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Filter feedback by rating
  const filteredFeedback = filterRating === 0 ? feedbackData : feedbackData.filter((feedback) => feedback.rating === filterRating);

  // Calculate statistics
  const totalReviews = feedbackData.length;
  const averageRating = (feedbackData?.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1);
  const fiveStarReviews = feedbackData.filter((f) => f.rating === 5).length;

  return (
    <FeedbackView
      feedbackData={filteredFeedback}
      filterRating={filterRating}
      setFilterRating={setFilterRating}
      formatDate={formatDate}
      totalReviews={totalReviews}
      averageRating={averageRating}
      fiveStarReviews={fiveStarReviews}
    />
  );
};

export default Feedback;
