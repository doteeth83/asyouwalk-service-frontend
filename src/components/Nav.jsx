import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Nav.css";
import { GoGift } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { BiLeaf } from "react-icons/bi";

const Nav = () => {
  const nav = useNavigate();
  const location = useLocation();

  const goHome = () => {
    nav("/tmap");
  };
  const goShop = () => {
    nav("/shop");
  };
  const goRoute = () => {
    nav("/route/:routeId");
  };
  const goPlogging = () => {
    nav("/plogging");
  };
  const goMyPage = () => {
    nav("/mypage");
  };

  return (
    <div className="Nav">
      <div
        onClick={goHome}
        className={`home ${location.pathname === "/tmap" ? "active" : ""}`}
      >
        <IoHomeOutline className="nav-icon" />홈
      </div>
      <div
        onClick={goShop}
        className={`giftshop ${location.pathname === "/shop" ? "active" : ""}`}
      >
        <GoGift className="nav-icon" />
        상점
      </div>
      <div
        onClick={goRoute}
        className={`route ${
          location.pathname.startsWith("/route/") ? "active" : ""
        }`}
      >
        <LuMapPin className="nav-icon" />
        경로
      </div>
      <div
        onClick={goPlogging}
        className={`plogging ${
          location.pathname === "/plogging" ? "active" : ""
        }`}
      >
        <BiLeaf className="nav-icon" />
        플로깅
      </div>
      <div
        onClick={goMyPage}
        className={`mypage ${location.pathname === "/mypage" ? "active" : ""}`}
      >
        <FiUser className="nav-icon" />
        마이
      </div>
    </div>
  );
};

export default Nav;
