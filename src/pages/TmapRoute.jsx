import React, { useState, useEffect } from "react";
import axios from "axios";
import RouteInfo from "../components/RouteInfo";

const TmapRoute = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

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

      features.forEach((feature) => {
        const geometry = feature.geometry;
        if (geometry.type === "LineString") {
          geometry.coordinates.forEach((coordinate) => {
            drawInfoArr.push(
              new window.Tmapv2.LatLng(coordinate[1], coordinate[0])
            );
          });
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

  // 폼 제출 시 호출
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 출발지와 도착지의 좌표를 각각 검색
      const startCoords = await fetchCoordinates(startLocation);
      const endCoords = await fetchCoordinates(endLocation);

      setStartCoords(startCoords);
      setEndCoords(endCoords);
    } catch (error) {
      console.error("경로를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  // 출발지와 도착지 좌표가 업데이트되면 경로 API 호출
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
      <h1>보행자 경로 찾기</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>출발지: </label>
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>도착지: </label>
          <input
            type="text"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit">경로 찾기</button>
      </form>

      <div id="map_div" style={{ width: "100%", height: "500px" }}></div>
      <RouteInfo />
    </div>
  );
};

export default TmapRoute;
