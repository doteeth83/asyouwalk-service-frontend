// RouteDetail.js
import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/Road.css";
import Map from "../components/Map";

const RouteDetail = () => {
  const { routeId } = useParams();
  const [route, setRoute] = useState(null);

  useEffect(() => {
    // axios
    //   .get(`/api/route/${routeId}`)
    //   .then((response) => setRoute(response.data))
    //   .catch((error) => console.error("데이터를 불러올 수 없습니다: ", error));

    // 예시 데이터를 사용한 설정
    const exampleRoute = {
      coordinates: [
        { lat: 37.5665, lng: 126.978 },
        { lat: 37.5651, lng: 126.9895 },
        { lat: 37.5643, lng: 126.9982 },
      ],
      duration: "30분",
      calories: 200,
      co2: 1.5,
      points: 50,
    };
    setRoute(exampleRoute);
  }, [routeId]);

  if (!route) return <div>로딩중입니다</div>;

  return (
    <div className="route-detail-container">
      <div className="map-container">
        <Map route={route} />
      </div>
      <div className="route-info">
        <div className="route-time">소요 시간: {route.duration}</div>
        <div className="route-calories">소모 칼로리: {route.calories}kcal</div>
        <div className="route-co2">탄소절감량: {route.co2}Co2</div>
        <div className="route-points">포인트: + {route.points}</div>
      </div>
    </div>
  );
};

export default RouteDetail;
