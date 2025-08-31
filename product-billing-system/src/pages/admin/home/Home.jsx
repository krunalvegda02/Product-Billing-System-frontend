import React, { useState } from "react";
import HomeView from "./HomeView";
import { THEME } from "../../../constants/Theme";

const Home = () => {
  const [showAllFeedback, setShowAllFeedback] = useState(false);
  
  // Sample data - this would typically come from an API or state management
  const popularDishes = [
    {
      name: "Butter Chicken",
      emoji: "🍛",
      price: "₹400",
      description: "Tender chicken in a rich, creamy tomato gravy with aromatic spices."
    },
    {
      name: "Aloo Gobi",
      emoji: "🥦",
      price: "₹200",
      description: "A classic vegetarian dish with potatoes, cauliflower, and Indian spices."
    },
    {
      name: "Paneer Tikka",
      emoji: "🧀",
      price: "₹280",
      description: "Grilled cottage cheese cubes marinated in spices and yogurt."
    },
    {
      name: "Biryani",
      emoji: "🍚",
      price: "₹350",
      description: "Fragrant rice dish with layers of spiced meat or vegetables."
    }
  ];

  const customerFeedback = [
    {
      customerName: "Rahul Sharma",
      initials: "RS",
      comment: "The Butter Chicken here is absolutely divine! The flavors are authentic and the service is exceptional. Will definitely be coming back!"
    },
    {
      customerName: "Priya Kapoor",
      initials: "PK",
      comment: "The ambiance is perfect for a relaxing evening. The Masala Chai is the best I've had outside of India. Highly recommended!"
    },
    {
      customerName: "Amit Patel",
      initials: "AP",
      comment: "Excellent food quality and prompt service. The staff is very courteous and the place is hygienic."
    },
    {
      customerName: "Neha Singh",
      initials: "NS",
      comment: "Loved the authentic flavors! Felt like I was back in my grandmother's kitchen. Will visit again soon."
    }
  ];

  const handleShowMoreFeedback = () => {
    setShowAllFeedback(!showAllFeedback);
  };

  // Props to pass to the view component
  const viewProps = {
    theme: THEME.GENERAL,
    popularDishes,
    customerFeedback,
    showAllFeedback,
    onShowMoreFeedback: handleShowMoreFeedback
  };

  return <HomeView {...viewProps} />;
};

export default Home;