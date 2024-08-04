import React, { useEffect, useRef } from "react";

const Map = ({ route }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오 지도 API가 로드되지 않았습니다.");
      return;
    }

    // 지도 초기화
    const map = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(
        route.coordinates[0].lat,
        route.coordinates[0].lon
      ),
      level: 5,
    });

    // 경로 좌표 설정
    const linePath = route.coordinates.map(
      (coord) => new window.kakao.maps.LatLng(coord.lat, coord.lon)
    );

    // Polyline 설정
    const polyline = new window.kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: "#0000FF",
      strokeOpacity: 0.7,
      strokeStyle: "solid",
    });

    // Polyline 지도에 추가
    polyline.setMap(map);

    // 출발지 마커 설정
    const startMarker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(
        route.coordinates[0].lat,
        route.coordinates[0].lon
      ),
      title: "출발지",
    });

    // 출발지 마커 지도에 추가
    startMarker.setMap(map);

    // 도착지 마커 설정
    const endMarker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(
        route.coordinates[route.coordinates.length - 1].lat,
        route.coordinates[route.coordinates.length - 1].lon
      ),
      title: "도착지",
    });

    // 도착지 마커 지도에 추가
    endMarker.setMap(map);
  }, [route]);

  return <div ref={mapRef} style={{ width: "100%", height: "80vh" }}></div>;
};

export default Map;
