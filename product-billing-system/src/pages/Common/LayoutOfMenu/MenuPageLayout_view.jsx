import React from "react";
import MenuHeader from "../../../components/commonComponent/MenuHeader";
import Menu from "../Menu/Menu";
import { Outlet } from "react-router-dom";

const MenuPageLayout_view = ({ onAvatarClick, onCartClick, onFavoritesClick, hotelName }) => {
  return (
    <>
      <MenuHeader onAvatarClick={onAvatarClick} onCartClick={onCartClick} onFavoritesClick={onFavoritesClick} hotelName={hotelName} />
      <Outlet />
      {/* <Menu /> */}
    </>
  );
};

export default MenuPageLayout_view;
