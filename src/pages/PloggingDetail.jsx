import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Road.css";
import TrashMap from "../components/TrashMap";
import Header from "../components/Header";
import Nav from "../components/Nav";
import PloggingRouteList from "../util/PloggingRouteList"; // 경로 목록 임포트

const PloggingDetail = () => {
  const { routeId } = useParams();
  const [route, setRoute] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const nav = useNavigate();
  const goPlogging = () => {
    nav("/plogging");
  };
  useEffect(() => {
    const selectedRoute = PloggingRouteList.find(
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
        <TrashMap route={route} />
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
            <div className="route-plogging" onClick={goPlogging}>
              🌱 플로깅 인증하러 가기
            </div>
          </>
        )}
      </div>
      <div className="nav-container">
        <Nav />
      </div>
    </div>
  );
};

export default PloggingDetail;
