import "../styles/RoadItem.css";
import React, { useEffect, useState } from "react";
import RoadButton from "./RoadButton";
import { useNavigate } from "react-router-dom";
import Subway from "./Subway";

const RoadItem = () => {
  const nav = useNavigate();

  const goRoadView = () => {
    nav("/road");
  };

  return (
    <div className="RoadItem">
      <Subway type={1} number={1} />
      <Subway type={"kyungui"} number={"경의선"} />
      <RoadButton onClick={goRoadView} />
    </div>
  );
};

export default RoadItem;
