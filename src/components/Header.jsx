import React, { useState, useEffect } from "react";
import "../styles/Header.css";
import { BiLeaf } from "react-icons/bi";
import { FaPersonRunning } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import shortRouteList from "../util/shortRouteList";

const Header = () => {
  const nav = useNavigate();
  const { routeId } = useParams();
  const [activeChoice, setActiveChoice] = useState(null);
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const selectedRoute = shortRouteList.find(
      (route) => route.id === parseInt(routeId)
    );
    if (selectedRoute) {
      setRoute(selectedRoute);
    } else {
      console.error("해당 id의 루트를 찾을 수 없습니다: ", routeId);
    }
  }, [routeId]);

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
        {route ? (
          <p>
            {route.start} -&gt; {route.end}
          </p>
        ) : (
          <p>경로 정보를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
};

export default Header;
