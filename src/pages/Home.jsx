import React, { useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import "../styles/Home.css";
import RoadList from "../components/RoadList";
import Nav from "../components/Nav";

const Home = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (mapContainer.current) {
      // 기본 지도 옵션을 설정합니다.
      let mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 기본 중심 좌표
        level: 3, // 기본 확대 수준
      };

      let map = new kakao.maps.Map(mapContainer.current, mapOption);

      // 사용자의 위치를 가져와서 지도에 표시합니다.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;

          let locPosition = new kakao.maps.LatLng(lat, lon);
          let message = '<div style="padding:5px;">현 위치</div>';

          displayMarker(locPosition, message);
        });
      } else {
        // geolocation을 사용할 수 없는 경우 기본 위치로 설정합니다.
        let locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
        let message = "geolocation을 사용할 수 없어요..";

        displayMarker(locPosition, message);
      }

      // 마커와 인포윈도우를 표시하는 함수입니다.
      function displayMarker(locPosition, message) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: locPosition,
        });

        let iwContent = message;
        let iwRemoveable = true;

        let infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });

        infowindow.open(map, marker); // 수정된 부분: infowindow.open(map, marker);
        map.setCenter(locPosition);
      }
    }
  }, []);

  return (
    <div className="Home">
      <div className="map-container">
        <input className="search-bar" placeholder="역 이름을 입력해주세요" />
        <div
          ref={mapContainer}
          className="map"
          style={{ width: "100%", height: "400px" }}
        ></div>
      </div>

      <RoadList className="road-list" />
      <Nav className="navigation" />
    </div>
  );
};

export default Home;
