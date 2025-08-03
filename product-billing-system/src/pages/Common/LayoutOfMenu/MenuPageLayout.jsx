import React from "react";
import MenuPageLayout_view from "./MenuPageLayout_view";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../constants/RouteNames";

const MenuPageLayout = () => {
  const navigate = useNavigate();

  const onAvatarClickHandler = () => {
    navigate(PATHS.CUST_PROFILE);
  };

  const onCartClickHandler = () => {
    navigate(PATHS.CART);
  };

  const onFavoritesClickHandler = () => {
    navigate(PATHS.FAV_PROD);
  };

  const hotelName = "Orely Cafe";

  return (
    <MenuPageLayout_view
      hotelName={hotelName}
      onAvatarClick={onAvatarClickHandler}
      onCartClick={onCartClickHandler}
      onFavoritesClick={onFavoritesClickHandler}
    />
  );
};

export default MenuPageLayout;
