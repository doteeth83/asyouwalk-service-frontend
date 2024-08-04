import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/RoadList.css";
import RoadItem from "../components/RoadItem";

const RoadList = () => {
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="road-list-container">
      <div className="road-list-title">
        <span className="recomend-route">추천 경로</span>
      </div>
      <RoadItem />
      {routes.length > 0 && (
        <button
          className="view-route-button"
          onClick={() => viewRoute(routes[0].id)}
        >
          경로 보기
        </button>
      )}
    </div>
  );
};

export default RoadList;
