import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Road.css";
import Map from "../components/Map";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Stack from "react-bootstrap/Stack";
const routes = [
  {
    id: 1,
    coordinates: [
      { lat: 37.55754, lng: 126.9246 },
      { lat: 37.58754, lng: 126.9746 },
      { lat: 37.62476, lng: 126.9159 },
    ],
    duration: "30분",
    calories: 200,
    co2: 1.5,
    points: 50,
  },
  {
    id: 2,
    coordinates: [
      { lat: 37.5665, lng: 126.978 },
      { lat: 37.5651, lng: 126.9895 },
    ],
    duration: "40분",
    calories: 250,
    co2: 2.0,
    points: 60,
  },
  {
    id: 3,
    coordinates: [
      { lat: 37.5643, lng: 126.9982 },
      { lat: 37.5718, lng: 126.986 },
    ],
    duration: "20분",
    calories: 150,
    co2: 1.0,
    points: 40,
  },
];

const RouteDetail = () => {
  const { routeId } = useParams();
  const [route, setRoute] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const selectedRoute = routes.find(
      (route) => route.id === parseInt(routeId)
    );
    if (selectedRoute) {
      setRoute(selectedRoute);
    } else {
      console.error("해당 id의 루트를 찾을 수 없습니다: ", routeId);
    }
  }, [routeId]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!route) return <div>로딩중입니다</div>;

  return (
    <div className="route-detail-container">
      <Header />
      <div className="map-container">
        <Map route={route} />
      </div>

      <div className={`route-info ${isExpanded ? "expanded" : ""}`}>
        <button className="expand-button" onClick={toggleExpand}>
          {isExpanded ? "🔽" : "🔼"}
        </button>
        <div className="route-time">⏰ 소요 시간: {route.duration}</div>
        <div className="route-calories">
          🔥 소모 칼로리: {route.calories}kcal
        </div>

        {isExpanded && (
          <>
            <div className="route-co2">♻️ 탄소절감량: {route.co2}Co2</div>
            <div className="route-points">💰 포인트: + {route.points}</div>
          </>
        )}
      </div>
      <div className="nav-container">
        <Nav />
      </div>
    </div>
  );
};

export default RouteDetail;
