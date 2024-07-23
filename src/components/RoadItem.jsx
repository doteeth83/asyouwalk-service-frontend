import "../styles/RoadItem.css";
import React, { useEffect, useState } from "react";
import RoadButton from "./RoadButton";
import { useNavigate } from "react-router-dom";

const RoadItem = () => {
  const nav = useNavigate();

  const goRoadView = () => {
    nav("/route");
  };

  return (
    <div className="RoadItem">
      <RoadButton onClick={goRoadView} />
    </div>
  );
};

export default RoadItem;
