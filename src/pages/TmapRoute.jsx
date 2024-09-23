import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const TmapRoute = () => {
  const [map, setMap] = useState(null);
  const [startCoords, setStartCoords] = useState({ lat: null, lng: null });
  const [endCoords, setEndCoords] = useState({ lat: null, lng: null });

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const startLocation = params.get("start");
  const endLocation = params.get("end");

  const appKey = "wUnr6uPBvz3zY9aBjXSAN2jWJuFA06oE3QsXbXwl";

  // 지도 초기화는 한 번만 실행
  useEffect(() => {
    const initTmap = () => {
      if (!map) {
        const tmap = new Tmapv2.Map("map_div", {
          center: new Tmapv2.LatLng(37.5652045, 126.98702028),
          width: "100%",
          height: "400px",
          zoom: 15,
        });
        setMap(tmap); // 지도를 초기화하고 상태 업데이트
      }
    };
    initTmap();
  }, []); // 빈 배열로 두어 한 번만 실행되게 설정

  const searchPOI = async (location, setCoords) => {
    try {
      const response = await axios.get(
        "https://apis.openapi.sk.com/tmap/pois",
        {
          headers: { appKey: appKey },
          params: {
            version: 1,
            format: "json",
            searchKeyword: location,
            resCoordType: "EPSG3857",
            reqCoordType: "WGS84GEO",
            count: 1,
          },
        }
      );

      if (response.data && response.data.searchPoiInfo.pois.poi.length > 0) {
        const poi = response.data.searchPoiInfo.pois.poi[0];
        const lat = Number(poi.noorLat);
        const lng = Number(poi.noorLon);

        const pointCng = new Tmapv2.Point(lng, lat);
        const projectionCng = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
          pointCng
        );

        setCoords({ lat: projectionCng._lat, lng: projectionCng._lng });
      } else {
        alert("검색 결과가 없습니다.");
      }
    } catch (error) {
      console.error("POI 검색 오류:", error);
    }
  };

  const searchRoute = async () => {
    if (!startLocation || !endLocation) return;

    await searchPOI(startLocation, setStartCoords);
    await searchPOI(endLocation, setEndCoords);
  };

  useEffect(() => {
    searchRoute();
  }, [startLocation, endLocation]); // startLocation과 endLocation이 바뀔 때 경로 재검색

  // 지도 위에 경로 그리기
  useEffect(() => {
    if (startCoords.lat && endCoords.lat && map) {
      const apiUrl =
        "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json";

      const requestData = {
        startX: startCoords.lng,
        startY: startCoords.lat,
        endX: endCoords.lng,
        endY: endCoords.lat,
        reqCoordType: "WGS84GEO",
        resCoordType: "EPSG3857",
        startName: startLocation,
        endName: endLocation,
      };

      axios
        .post(apiUrl, requestData, {
          headers: { appKey: appKey },
        })
        .then((response) => {
          const resultData = response.data.features;
          const drawInfoArr = [];
          const bounds = new Tmapv2.LatLngBounds();

          if (resultData) {
            resultData.forEach((item) => {
              const geometry = item.geometry;
              if (geometry.type === "LineString") {
                geometry.coordinates.forEach((coord) => {
                  const latlng = new Tmapv2.Point(coord[0], coord[1]);
                  const convertPoint =
                    new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                  const latLng = new Tmapv2.LatLng(
                    convertPoint._lat,
                    convertPoint._lng
                  );
                  drawInfoArr.push(latLng);
                  bounds.extend(latLng);
                });
              }
            });

            // 기존에 그려진 폴리라인 제거
            if (map._routes) {
              map._routes.setMap(null);
            }

            // 새 경로를 지도에 그리기
            const polyline = new Tmapv2.Polyline({
              path: drawInfoArr,
              strokeColor: "#027AFF",
              strokeWeight: 6,
              map: map,
            });

            map._routes = polyline; // 폴리라인을 저장하여 다음에 제거할 수 있도록 함

            map.fitBounds(bounds);
          }
        })
        .catch((error) => {
          console.error("경로 검색 중 오류 발생:", error);
        });
    }
  }, [startCoords, endCoords, map]); // 지도와 좌표가 준비되었을 때 경로 그리기

  return (
    <div>
      <h2>경로 보기</h2>
      <div id="map_div" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default TmapRoute;
