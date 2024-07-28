import "../styles/Header.css";
import { BiLeaf } from "react-icons/bi";
import { FaPersonRunning } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const nav = useNavigate();

  return (
    <div className="Header">
      <div className="route-choice">
        <div className="plogging-choice">
          <BiLeaf />
        </div>
        <div className="short-choice">
          <FaPersonRunning />
        </div>
        <div className="target-choice">
          <TbTargetArrow />
        </div>
      </div>
      <div className="route-explain">
        <p>홍대입구역 -&gt; 연신내역</p>
      </div>
    </div>
  );
};

export default Header;
