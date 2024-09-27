import React, { useState, useEffect } from "react";
import RouteInfo from "../components/RouteInfo";
import Nav from "../components/Nav";
import SearchForm from "../components/SearchForm";
import axios from "axios";

import {
  fetchCoordinates,
  fetchRoute,
  fetchPloggingRoute,
  postDistance,
} from "../util/api.js";
import useMap from "../hook/useMap";
import "../styles/TmapRoute.css";

const TmapRoute = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const { mapInstance, initializeMap, destroyMap } = useMap();

  const API_BASE_URL = "https://asyouwork.com:8443/api";

  // 폼 제출 시 호출
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const startCoords = await fetchCoordinates(startLocation);
      const endCoords = await fetchCoordinates(endLocation);
      setStartCoords(startCoords);
      setEndCoords(endCoords);
    } catch (error) {
      console.error("경로를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  const handleComplete = async () => {
    try {
      if (startCoords && endCoords) {
        // 경로 거리 계산
        const distance = await fetchRoute(
          startCoords,
          endCoords,
          initializeMap,
          mapInstance
        );

        // 거리 정보를 /api/co2-records/calculate 엔드포인트로 POST 요청
        const response = await axios.post(
          `${API_BASE_URL}/co2-records/calculate`,
          {
            distance,
          }
        );

        if (response.status === 200) {
          console.log("거리 정보를 성공적으로 전송했습니다:", distance);
        } else {
          console.error(
            "거리 정보를 전송하는 중 오류가 발생했습니다: ",
            response.status
          );
        }
      }
    } catch (error) {
      console.error("거리 정보를 전송하는 중 오류가 발생했습니다:", error);
      alert("거리 정보를 전송하는 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };
  useEffect(() => {
    if (startCoords && endCoords) {
      fetchRoute(startCoords, endCoords, initializeMap, mapInstance);
    }
    return () => {
      destroyMap();
    };
  }, [startCoords, endCoords]);

  return (
    <div>
      <SearchForm
        startLocation={startLocation}
        setStartLocation={setStartLocation}
        endLocation={endLocation}
        setEndLocation={setEndLocation}
        onSubmit={handleSubmit}
        onComplete={handleComplete}
        onPlogging={() =>
          fetchPloggingRoute(startCoords, endCoords, mapInstance)
        }
      />
      <div id="map_div" style={{ width: "100%", height: "60vh" }}></div>
      <RouteInfo />
      <Nav />
    </div>
  );
};

export default TmapRoute;
