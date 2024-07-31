import "../styles/Header.css";
import { useState } from "react";
import { BiLeaf } from "react-icons/bi";
import { FaPersonRunning } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();
  const [activeChoice, setActiveChoice] = useState(null);

  const handleClick = (choice) => {
    setActiveChoice(choice);
  };

  return (
    <div className="Header">
      <div className="route-choice">
        <div
          className={`plogging-choice ${
            activeChoice === "plogging" ? "active" : ""
          }`}
          onClick={() => handleClick("plogging")}
        >
          <BiLeaf />
        </div>
        <div
          className={`short-choice ${activeChoice === "short" ? "active" : ""}`}
          onClick={() => handleClick("short")}
        >
          <FaPersonRunning />
        </div>
        <div
          className={`target-choice ${
            activeChoice === "target" ? "active" : ""
          }`}
          onClick={() => handleClick("target")}
        >
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
