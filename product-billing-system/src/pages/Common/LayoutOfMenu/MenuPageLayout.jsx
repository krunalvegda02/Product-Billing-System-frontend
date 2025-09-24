import React from "react";
import MenuPageLayout_view from "./MenuPageLayout_view";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../constants/RouteNames";

const MenuPageLayout = () => {
  const navigate = useNavigate();

  const hotelName = "Orely Cafe";

  return (
    <MenuPageLayout_view
      hotelName={hotelName}
      onAvatarClick={() => navigate(PATHS.CUST_PROFILE)}
      onCartClick={() => navigate(PATHS.CART)}
      onFavoritesClick={() => navigate(PATHS.FAV_PROD)}
    />
  );
};

export default MenuPageLayout;
