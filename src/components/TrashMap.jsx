import React, { useEffect, useRef } from "react";
import trashBinImage from "../image/trash.png"; // 쓰레기통 아이콘 경로

const TrashMap = ({ route }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오 지도 API가 로드되지 않았습니다.");
      return;
    }

    // 경로 ID에 따라 쓰레기통 좌표 설정
    const trashBins = (() => {
      switch (route.id) {
        case 1:
          return [
            { lat: 37.5021121, lon: 127.0398458 },
            { lat: 37.5069968, lon: 127.039682 },
            { lat: 37.514053, lon: 127.0320041 },
          ];
        case 2:
          return [
            { lat: 37.535143, lon: 126.8999717 },
            { lat: 37.5372436, lon: 126.8947718 },
            { lat: 37.548427, lon: 126.914912 },
          ];
        case 3:
          return [
            { lat: 37.505121, lon: 127.035336 },
            { lat: 37.509578, lon: 127.038946 },
            { lat: 37.517281, lon: 127.035739 },
          ];
        case 4:
          return [
            { lat: 37.583245, lon: 127.001476 },
            { lat: 37.585342, lon: 127.000666 },
            { lat: 37.571998, lon: 127.011039 },
          ];
        case 5:
          return [
            { lat: 37.5527865, lon: 126.9565585 },
            { lat: 37.5363258, lon: 126.963686 },
            { lat: 37.555886, lon: 126.956874 },
          ];
        default:
          return [];
      }
    })();

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
      strokeWeight: 7,
      strokeColor: "#FF4D3F",
      strokeOpacity: 0.5,
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

    // 쓰레기통 아이콘 설정
    const trashBinImageSize = new window.kakao.maps.Size(40, 60); // 아이콘 크기
    const trashBinImageOption = { offset: new window.kakao.maps.Point(12, 35) }; // 아이콘 위치 조정

    const trashBinIcon = new window.kakao.maps.MarkerImage(
      trashBinImage,
      trashBinImageSize,
      trashBinImageOption
    );

    // 쓰레기통 마커 추가
    trashBins.forEach((bin) => {
      const trashBinMarker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(bin.lat, bin.lon),
        image: trashBinIcon,
      });
      trashBinMarker.setMap(map);
    });
  }, [route]);

  return <div ref={mapRef} style={{ width: "100%", height: "80vh" }}></div>;
};

export default TrashMap;
