import React from "react";
import MenuHeader from "../../../components/commonComponent/MenuHeader";
import { Outlet } from "react-router-dom";

const MenuPageLayout_view = ({ onAvatarClick, onCartClick, onFavoritesClick, hotelName }) => {
  return (
    <>
      <MenuHeader
        onAvatarClick={onAvatarClick}
        onCartClick={onCartClick}
        onFavoritesClick={onFavoritesClick}
        hotelName={hotelName}
      />
      {/* Render the nested route/component here */}
      <Outlet />
    </>
  );
};

export default MenuPageLayout_view;
