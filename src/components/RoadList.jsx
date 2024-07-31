import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/RoadList.css";

const RoadList = () => {
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="road-list-container">
      <div className="road-list-title">
        <span>추천 경로</span>
      </div>
      {routes.map((route) => (
        <div
          key={route.id}
          className="road-item"
          onClick={() => viewRoute(route.id)}
        >
          <span className="road-number green">{route.startStation}</span>
          <span className="road-number orange">{route.endStation}</span>
          <span>{route.name}</span>
        </div>
      ))}
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
