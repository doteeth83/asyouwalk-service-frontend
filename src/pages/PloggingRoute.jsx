import React, { useState, useEffect } from "react";
import axios from "axios";

const PloggingRoute = ({ startCoords, endCoords }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const [trashBins, setTrashBins] = useState([]);
  const headers = {
    appKey: import.meta.env.VITE_TMAP_API_KEY,
  };
  const API_BASE_URL = "https://asyouwork.com:8443/api";

  // 쓰레기통 좌표 받아오기
  const fetchTrashBinCoords = async () => {
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
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6InVzZXIxIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcyNzQ5NjE5NCwiZXhwIjoxNzI3NTMyMTk0fQ.D34AxJeu7il_ehK1QFRg8UfMIYGMbpFNHUsTp_P5IXs",
          },
        }
      );

      setTrashBins(response.data);
      return response.data;
    } catch (error) {
      console.error("쓰레기통 좌표를 가져오는 중 오류가 발생했습니다:", error);
      throw error;
    }
  };

  // 플로깅 경로 그리기
  const fetchRouteWithWaypoints = async (trashBins) => {
    const pedestrianUrl =
      "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1";

    const waypointCoords = trashBins.map((bin) => ({
      lon: bin.lng,
      lat: bin.lat,
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

  useEffect(() => {
    if (startCoords && endCoords) {
      fetchTrashBinCoords().then((trashBins) => {
        fetchRouteWithWaypoints(trashBins);
      });
    }
  }, [startCoords, endCoords]);

  return <div id="map_div"></div>;
};

export default PloggingRoute;
