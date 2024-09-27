import React, { useState, useEffect } from "react";
import axios from "axios";
import RouteInfo from "../components/RouteInfo";
import "../styles/TmapRoute.css";
import Nav from "../components/Nav";

const TmapRoute = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  const headers = {
    appKey: import.meta.env.VITE_TMAP_API_KEY,
  };

  const API_BASE_URL = "https://asyouwork.com:8443/api";

  // 장소(POI) 검색 API 호출
  const fetchCoordinates = async (locationName) => {
    const poiUrl = `https://apis.openapi.sk.com/tmap/pois?version=1&searchKeyword=${encodeURIComponent(
      locationName
    )}&resCoordType=WGS84GEO&reqCoordType=WGS84GEO&count=1&appKey=${
      headers.appKey
    }`;

    try {
      const response = await axios.get(poiUrl);
      const data = response.data;

      if (
        data.searchPoiInfo &&
        data.searchPoiInfo.pois &&
        data.searchPoiInfo.pois.poi.length > 0
      ) {
        const poi = data.searchPoiInfo.pois.poi[0];
        return {
          lat: poi.frontLat,
          lng: poi.frontLon,
        };
      } else {
        throw new Error("해당 장소의 좌표를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("좌표를 검색하는 중 오류가 발생했습니다:", error);
      throw error;
    }
  };

  // 보행자 경로 API 호출
  const fetchRoute = async (startCoords, endCoords) => {
    const pedestrianUrl =
      "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1";

    const requestData = {
      startX: startCoords.lng,
      startY: startCoords.lat,
      endX: endCoords.lng,
      endY: endCoords.lat,
      reqCoordType: "WGS84GEO",
      resCoordType: "WGS84GEO",
      startName: "출발지",
      endName: "도착지",
    };

    try {
      const response = await axios.post(pedestrianUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          appKey: headers.appKey,
        },
      });

      const data = response.data;
      const features = data.features;

      let drawInfoArr = [];
      let totalDistance = 0; // 총 거리 계산 변수

      features.forEach((feature) => {
        const geometry = feature.geometry;
        if (geometry.type === "LineString") {
          geometry.coordinates.forEach((coordinate) => {
            drawInfoArr.push(
              new window.Tmapv2.LatLng(coordinate[1], coordinate[0])
            );
          });
          if (feature.properties && feature.properties.totalDistance) {
            totalDistance += feature.properties.totalDistance; // 총 거리 계산
          }
        }
      });

      if (mapInstance) {
        mapInstance.destroy(); // 기존 지도 제거
      }

      const newMapInstance = new window.Tmapv2.Map("map_div", {
        center: new window.Tmapv2.LatLng(startCoords.lat, startCoords.lng),
        width: "100%",
        height: "500px",
        zoom: 15,
      });

      new window.Tmapv2.Polyline({
        path: drawInfoArr,
        strokeColor: "#FF0000",
        strokeWeight: 6,
        map: newMapInstance,
      });

      setMapInstance(newMapInstance);
    } catch (error) {
      console.error("경로를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  // 쓰레기통 경로 API 호출
  const fetchPloggingRoute = async (startCoords, endCoords) => {
    try {
      await axios.post(`${API_BASE_URL}/trashbins`, {
        startLatitude: startCoords.lat,
        startLongitude: startCoords.lng,
        endLatitude: endCoords.lat,
        endLongitude: endCoords.lng,
      });

      const response = await axios.get(`${API_BASE_URL}/findBetween`);
      const trashBinCoords = response.data;

      trashBinCoords.forEach((coords) => {
        new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(coords.lat, coords.lng),
          map: mapInstance,
        });
      });
    } catch (error) {
      console.error("쓰레기통 경로를 가져오는 중 오류가 발생했습니다:", error);
    }
  };
  // 총 거리 데이터를 서버로 POST하는 함수
  async function getDistanceAndPost(distance) {
    const distanceValue = parseFloat(distance);
    try {
      // 서버로 POST 요청 보내기
      const postResponse = await axios.post(`${API_BASE_URL}/co2-records`, {
        distance: distanceValue, // 서버에 보낼 데이터
      });

      // POST 응답 처리
      if (postResponse.status === 200) {
        console.log("데이터 전송 성공");
      } else {
        console.error("데이터 전송 실패");
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  }

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

  useEffect(() => {
    if (startCoords && endCoords) {
      fetchRoute(startCoords, endCoords);
    }
    return () => {
      if (mapInstance) {
        mapInstance.destroy();
      }
    };
  }, [startCoords, endCoords]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span className="search-bar">
          <div className="start-box">
            <div className="start-icon"></div>
            <input
              type="text"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              required
              className="search-bar1"
            />
          </div>
          <div className="end-box">
            <span className="end-icon"></span>
            <input
              type="text"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
              required
              className="search-bar2"
            />
          </div>
          <div className="route-buttons">
            <button
              onClick={() => fetchRoute(startCoords, endCoords)}
              className="show-road"
            >
              기본 경로 찾기
            </button>
            <button
              onClick={() => getDistanceAndPost()} // 완료 버튼 클릭 시 getDistanceAndPost 호출
              className="complete-button"
            >
              완료
            </button>
            <button
              onClick={() => fetchPloggingRoute(startCoords, endCoords)}
              className="plogging-button"
            >
              플로깅 경로 찾기
            </button>
          </div>
        </span>
      </form>

      <div id="map_div" style={{ width: "100%", height: "60vh" }}></div>
      <RouteInfo />
      <Nav />
    </div>
  );
};

export default TmapRoute;
