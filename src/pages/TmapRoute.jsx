import React, { useState, useEffect } from "react";
import axios from "axios";
import RouteInfo from "../components/RouteInfo";
import "../styles/TmapRoute.css";
import Nav from "../components/Nav";
import SearchForm from "../components/SearchForm";
import PloggingRoute from "../pages/PloggingRoute"; // PloggingRoute 임포트

const TmapRoute = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [mapInstance, setMapInstance] = useState(null); // mapInstance 상태 추가
  const [isPloggingMode, setIsPloggingMode] = useState(false); // 플로깅 모드 상태
  const [totalDistance, setTotalDistance] = useState(0);

  const headers = {
    appKey: import.meta.env.VITE_TMAP_API_KEY,
  };

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
      //거리 확인
      let totalDistance = 0;

      features.forEach((feature) => {
        const geometry = feature.geometry;
        if (geometry.type === "LineString") {
          geometry.coordinates.forEach((coordinate) => {
            drawInfoArr.push(
              new window.Tmapv2.LatLng(coordinate[1], coordinate[0])
            );
          });
        }

        // 경로 거리 확인
        if (feature.properties && feature.properties.distance) {
          totalDistance += feature.properties.distance; // 누적 거리 계산
        }
      });
      setTotalDistance(totalDistance);
      console.log(totalDistance);
      // 맵 인스턴스가 없을 경우 새로 생성
      let mapInstanceToUse = mapInstance;
      if (!mapInstance) {
        const newMapInstance = new window.Tmapv2.Map("map_div", {
          center: new window.Tmapv2.LatLng(startCoords.lat, startCoords.lng),
          width: "100%",
          height: "400px",
          zoom: 15,
        });
        setMapInstance(newMapInstance);
        mapInstanceToUse = newMapInstance;
      }

      // 경로 그리기
      new window.Tmapv2.Polyline({
        path: drawInfoArr,
        strokeColor: "#FF0000", // 기본 경로 색상 (빨간색)
        strokeWeight: 6,
        map: mapInstanceToUse, // 기존 또는 새로 생성된 맵 인스턴스 사용
      });
    } catch (error) {
      console.error("경로를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  // 폼 제출 시 호출
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const startCoords = await fetchCoordinates(startLocation);
      const endCoords = await fetchCoordinates(endLocation);

      setStartCoords(startCoords);
      setEndCoords(endCoords);
      setIsPloggingMode(false); // 기본 경로 모드로 설정
    } catch (error) {
      console.error("경로를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    if (startCoords && endCoords && !isPloggingMode) {
      fetchRoute(startCoords, endCoords); // 플로깅 모드가 아닐 때 일반 경로 그리기
    }
    // 기존 맵 인스턴스를 지우지 않고 상태를 유지합니다.
  }, [startCoords, endCoords, isPloggingMode]);

  return (
    <div>
      <div className="TmapRoute">
        <SearchForm
          startLocation={startLocation}
          setStartLocation={setStartLocation}
          endLocation={endLocation}
          setEndLocation={setEndLocation}
          onSubmit={handleSubmit}
          onPlogging={() => {
            if (startCoords && endCoords) {
              setIsPloggingMode(true); // 플로깅 모드 활성화
            } else {
              console.error("좌표가 설정되지 않았습니다.");
            }
          }}
        />

        {isPloggingMode ? (
          <PloggingRoute startCoords={startCoords} endCoords={endCoords} />
        ) : (
          <div className="map-container">
            <div id="map_div"></div>
          </div>
        )}

        <RouteInfo totalDistance={totalDistance} />
      </div>
      <Nav />
    </div>
  );
};

export default TmapRoute;
