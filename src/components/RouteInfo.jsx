import React, { useState, useEffect } from "react";
import "../styles/Road.css";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

const RouteInfo = ({ totalDistance }) => {
  const nav = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const [routeInfo, setRouteInfo] = useState({
    duration: 0,
    calories: 0,
    co2: 0,
    points: 0,
    trees: 0,
  });

  // 성인 평균 몸무게 65kg, 평균 속도 1.4m/s로 가정
  const averageWeight = 65; // kg
  const averageSpeed = 1.4; // m/s
  const MET = 3.5; // MET 값 (걷기 기준)
  const CO2_PER_METER = 0.1; // 1m당 절감되는 CO2 (g)
  const TREE_CO2_ABSORPTION = 22000; // 나무 한 그루가 흡수하는 CO2량 (g)

  // 경로 정보를 업데이트하는 함수
  const calculateRouteInfo = (distance) => {
    const timeInHours = distance / (averageSpeed * 3600); // 시간(h)으로 환산
    const caloriesBurned = averageWeight * MET * timeInHours * 1.05; // 칼로리 소모량
    const co2Saved = CO2_PER_METER * distance; // 절감된 CO2량 (g)
    const treesPlanted = co2Saved / TREE_CO2_ABSORPTION; // 심을 수 있는 나무 수 계산

    // 경로 정보 상태 업데이트
    setRouteInfo({
      duration: (distance / (averageSpeed * 60)).toFixed(2), // 분으로 환산하여 소요시간 계산
      calories: caloriesBurned.toFixed(2),
      co2: co2Saved.toFixed(2),
      points: Math.floor(distance / 100), // 100m당 1포인트로 가정
      trees: treesPlanted.toFixed(4),
    });
  };

  // 컴포넌트가 마운트되거나 totalDistance가 변경될 때 경로 정보 계산
  useEffect(() => {
    if (totalDistance) {
      calculateRouteInfo(totalDistance);
    }
  }, [totalDistance]);
  console.log(routeInfo.co2);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const goPlogging = () => {
    nav("/plogging");
  };
  return (
    <div className="route-detail-container">
      <div className={`route-info ${isExpanded ? "expanded" : ""}`}>
        <button className="expand-button" onClick={toggleExpand}>
          {isExpanded ? "🔽" : "🔼"}
        </button>
        <div className="route-time">⏰ 소요 시간: {routeInfo.duration}분</div>
        <div className="route-calories">
          🔥 소모 칼로리: {routeInfo.calories} kcal
        </div>

        {isExpanded && (
          <>
            <div className="route-co2">
              ♻️ 탄소절감량: {routeInfo.co2} g CO2
            </div>
            <div className="route-trees">
              🌳 심을 수 있는 나무: {routeInfo.trees} 그루
            </div>
            <div className="route-points">💰 포인트: +{routeInfo.points}</div>
            <div className="route-plogging" onClick={goPlogging}>
              🌱 플로깅 인증하러 가기
            </div>
          </>
        )}
      </div>
      <Nav />
    </div>
  );
};

export default RouteInfo;
