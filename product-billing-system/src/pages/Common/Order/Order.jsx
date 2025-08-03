import React from "react";
import OrderView from "./OrderView";


const Order = () => {

  
  return (
    <OrderView
      orderItems={[
        {
          id: 1,
          name: "Veg Burger",
          quantity: 2,
          price: 120,
          thumbnail: "https://via.placeholder.com/60",
        },
        {
          id: 2,
          name: "Fries",
          quantity: 1,
          price: 60,
          thumbnail: "https://via.placeholder.com/60",
        },
      ]}
      onPlaceOrder={() => console.log("Order placed!")}
    />
  );
};

export default Order;
