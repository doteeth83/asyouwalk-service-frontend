import React, { useState, useEffect } from "react";
import axios from "axios";

const PloggingRoute = ({ startCoords, endCoords }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const [trashBins, setTrashBins] = useState([]);
  ㅡ;
  const headers = {
    appKey: import.meta.env.VITE_TMAP_API_KEY, // 환경 변수에서 API 키 가져오기
  };
  const API_BASE_URL = "https://asyouwork.com:8443/api";
  let resultDrawArr = [];

  // 지도 초기화 함수
  const initTmap = () => {
    const map = new window.Tmapv2.Map("map_div", {
      center: new window.Tmapv2.LatLng(startCoords.lat, startCoords.lng),
      width: "100%",
      height: "400px",
      zoom: 17,
      zoomControl: true,
      scrollwheel: true,
    });
    setMapInstance(map);
  };

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
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6InVzZXIxIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcyNzQ5NjE5NCwiZXhwIjoxNzI3NTMyMTk0fQ.D34AxJeu7il_ehK1QFRg8UfMIYGMbpFNHUsTp_P5IXs", // 토큰 설정
          },
        }
      );

      setTrashBins(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("쓰레기통 좌표를 가져오는 중 오류가 발생했습니다:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (startCoords && endCoords) {
      if (!mapInstance) {
        initTmap(); // TMap 초기화
      }
      fetchTrashBinCoords().then((trashBins) => {
        fetchRouteWithWaypoints(trashBins); // 경로 그리기 호출
      });
    }
  }, [startCoords, endCoords]);

  return <div id="map_div"></div>;
};

export default PloggingRoute;
