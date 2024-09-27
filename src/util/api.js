import axios from "axios";

const headers = {
  appKey: import.meta.env.VITE_TMAP_API_KEY,
};

const API_BASE_URL = "https://asyouwork.com:8443/api";

export const fetchCoordinates = async (locationName) => {
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
      return { lat: poi.frontLat, lng: poi.frontLon };
    } else {
      throw new Error("해당 장소의 좌표를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("좌표를 검색하는 중 오류가 발생했습니다:", error);
    throw error;
  }
};

export const fetchRoute = async (
  startCoords,
  endCoords,
  initializeMap,
  mapInstance
) => {
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
      headers: { "Content-Type": "application/json", appKey: headers.appKey },
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
        totalDistance += feature.properties.totalDistance || 0;
      }
    });

    if (mapInstance) {
      mapInstance.destroy();
    }

    const newMapInstance = initializeMap(startCoords.lat, startCoords.lng);
    new window.Tmapv2.Polyline({
      path: drawInfoArr,
      strokeColor: "#FF0000",
      strokeWeight: 6,
      map: newMapInstance,
    });

    return totalDistance;
  } catch (error) {
    console.error("경로를 가져오는 중 오류가 발생했습니다:", error);
    throw error;
  }
};

export const requestTrashBinCoords = async (startCoords, endCoords) => {
  try {
    await axios.post(`${API_BASE_URL}/trashbins`, {
      startLatitude: startCoords.lat,
      startLongitude: startCoords.lng,
      endLatitude: endCoords.lat,
      endLongitude: endCoords.lng,
    });
    console.log("출발지 도착지 좌표 요청 완료");
  } catch (error) {
    console.error("쓰레기통 좌표 요청 중 오류가 발생했습니다:", error);
    throw error; // 오류 발생 시 호출하는 곳에서 처리할 수 있도록 throw
  }
};

export const fetchPloggingRoute = async (
  startCoords,
  endCoords,
  mapInstance
) => {
  try {
    // POST로 좌표 요청
    await requestTrashBinCoords(startCoords, endCoords);

    // GET으로 좌표 가져와서 지도에 표시
    await fetchTrashBinCoords(startCoords, endCoords, mapInstance);
  } catch (error) {
    console.error("플로깅 경로 처리 중 오류가 발생했습니다:", error);
  }
};

export const fetchTrashBinCoords = async (
  startCoords,
  endCoords,
  mapInstance
) => {
  try {
    // GET 요청에 startCoords와 endCoords를 쿼리 파라미터로 추가
    const response = await axios.get(`${API_BASE_URL}/findBetween`, {
      params: {
        startLatitude: startCoords.lat,
        startLongitude: startCoords.lng,
        endLatitude: endCoords.lat,
        endLongitude: endCoords.lng,
      },
    });

    const trashBinCoords = response.data;

    // 가져온 좌표를 지도에 마커로 표시
    trashBinCoords.forEach((coords) => {
      if (coords.latitude && coords.longitude) {
        new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(coords.latitude, coords.longitude),
          map: mapInstance,
        });
      } else {
        console.warn("유효하지 않은 좌표:", coords);
      }
    });
  } catch (error) {
    console.error("쓰레기통 좌표 가져오는 중 오류가 발생했습니다:", error);
  }
};

export const postDistance = async (distance) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/co2-records/calculate`, {
      distance,
    });
    if (response.status === 200) {
      console.log("데이터 전송 성공");
    } else {
      console.error("데이터 전송 실패");
    }
  } catch (error) {
    console.error("오류 발생:", error);
  }
};
