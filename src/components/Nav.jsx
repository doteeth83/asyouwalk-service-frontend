import "../styles/Nav.css";
//아이콘 import
import { GoGift } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { BiLeaf } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const nav = useNavigate();
  const goHome = () => {
    nav("/home");
  };
  const goRoute = () => {
    nav("/road");
  };
  const goPlogging = () => {
    nav("/plogging");
  };
  const goMyPage = () => {
    nav("/mypage");
  };

  return (
    <div className="Nav">
      <div onClick={goHome} className="home">
        <IoHomeOutline className="nav-icon" />홈
      </div>
      <div className="giftshop">
        <GoGift className="nav-icon" />
        상점
      </div>
      <div onClick={goRoute} className="route">
        <LuMapPin className="nav-icon" />
        경로
      </div>
      <div className="plogging">
        <BiLeaf className="nav-icon" />
        플로깅
      </div>
      <div onClick={goMyPage} className="mypage">
        <FiUser className="nav-icon" />
        마이
      </div>
    </div>
  );
};

export default Nav;
