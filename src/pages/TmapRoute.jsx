import React, { useState, useEffect } from "react";
import axios from "axios";
import RouteInfo from "../components/RouteInfo";
import "../styles/TmapRoute.css";
import Nav from "../components/Nav";
import SearchForm from "../components/SearchForm";

const TmapRoute = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [markers, setMarkers] = useState([]); // 마커 배열 추가
  const [trashBins, setTrashBins] = useState([]);

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
  const fetchRoute = async (startCoords, endCoords, mapInstance) => {
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

      if (!mapInstance) {
        const newMapInstance = new window.Tmapv2.Map("map_div", {
          center: new window.Tmapv2.LatLng(startCoords.lat, startCoords.lng),
          width: "100%",
          height: "400px",
          zoom: 15,
        });
        setMapInstance(newMapInstance);
        mapInstance = newMapInstance; // 기존 mapInstance 값 업데이트
      }

      new window.Tmapv2.Polyline({
        path: drawInfoArr,
        strokeColor: "#FF0000",
        strokeWeight: 6,
        map: mapInstance,
      });
    } catch (error) {
      console.error("경로를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  const token = localStorage.getItem("token");

  // 쓰레기통 마커 추가 함수
  const addMarkersForTrashBins = (trashBins, mapInstance) => {
    trashBins.forEach((bin) => {
      const marker = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(bin.lat, bin.lng), // 쓰레기통 좌표 사용
        map: mapInstance,
      });

      // 기존 마커 배열에 추가
      setMarkers((prevMarkers) => [...prevMarkers, marker]);
    });
  };

  // 쓰레기통 좌표를 받아와 마커 추가 호출
  const fetchTrashBinCoords = async (startCoords, endCoords, mapInstance) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/trashbins/findBetween`,
        null,
        {
          params: {
            startLatitude: startCoords.lat,
            startLongitude: startCoords.lng,
            endLatitude: endCoords.lat,
            endLongitude: endCoords.lng,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6InVzZXIxIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcyNzQ0NjEzNSwiZXhwIjoxNzI3NDQ5NzM1fQ.RpXXBlnQZaDCiEQux2RHDuSn4WhIWNJlWBbTbN2nqgQ",
          },
        }
      );

      setTrashBins(response.data); // 받아온 쓰레기통 좌표 배열
      addMarkersForTrashBins(response.data, mapInstance); // 마커 추가
    } catch (error) {
      console.error("쓰레기통 좌표를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  const fetchRouteWithWaypoints = async (
    startCoords,
    endCoords,
    waypoints,
    mapInstance
  ) => {
    const pedestrianUrl =
      "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1";

    const waypointCoords = waypoints.map((waypoint) => ({
      lon: waypoint.lng,
      lat: waypoint.lat,
    }));

    const requestData = {
      startX: startCoords.lng,
      startY: startCoords.lat,
      endX: endCoords.lng,
      endY: endCoords.lat,
      passList: waypointCoords.map((wp) => `${wp.lon},${wp.lat}`).join("_"),
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

      if (!mapInstance) {
        const newMapInstance = new window.Tmapv2.Map("map_div", {
          center: new window.Tmapv2.LatLng(startCoords.lat, startCoords.lng),
          width: "100%",
          height: "400px",
          zoom: 15,
        });
        setMapInstance(newMapInstance);
        mapInstance = newMapInstance;
      }

      new window.Tmapv2.Polyline({
        path: drawInfoArr,
        strokeColor: "#00FF00", // 플로깅 경로는 초록색으로
        strokeWeight: 6,
        map: mapInstance,
      });
    } catch (error) {
      console.error("경로를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  const fetchPloggingRoute = async (startCoords, endCoords, mapInstance) => {
    await fetchTrashBinCoords(startCoords, endCoords, mapInstance); // 쓰레기통 마커 추가
    await fetchRouteWithWaypoints(
      startCoords,
      endCoords,
      trashBins,
      mapInstance
    ); // 경유지 포함 경로 가져오기
  };

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
      fetchRoute(startCoords, endCoords, mapInstance);
    }
    return () => {
      if (mapInstance) {
        mapInstance.destroy();
      }
    };
  }, [startCoords, endCoords]);

  return (
    <div className="TmapRoute">
      <SearchForm
        startLocation={startLocation}
        setStartLocation={setStartLocation}
        endLocation={endLocation}
        setEndLocation={setEndLocation}
        onSubmit={handleSubmit}
        onPlogging={() => {
          if (startCoords && endCoords) {
            fetchPloggingRoute(startCoords, endCoords, mapInstance);
          } else {
            console.error("좌표가 설정되지 않았습니다.");
          }
        }}
      />

      <div id="map_div" style={{ width: "100%", height: "60vh" }}></div>
      <RouteInfo />
      <Nav />
    </div>
  );
};

export default TmapRoute;
