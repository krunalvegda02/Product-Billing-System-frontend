import React from "react";
import { useSelector } from "react-redux";
import OrderView from "./OrderView";

const Order = () => {
  const { order } = useSelector((state) => state.order);

  return <OrderView orderItems={order} onPlaceOrder={() => console.log("Order placed!")} />;
};

export default Order;
