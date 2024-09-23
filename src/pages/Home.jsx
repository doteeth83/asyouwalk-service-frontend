import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoadButton from "../components/RoadButton";
import "../styles/Home.css";
import Nav from "../components/Nav";

const Home = () => {
  const [homeMap, setHomeMap] = useState(null);
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null); // 현재 위치 상태 추가
  const nav = useNavigate();

  useEffect(() => {
    const mapInit = (lat, lng) => {
      const tmap2 = new Tmapv2.Map("map-container", {
        center: new Tmapv2.LatLng(lat, lng), // 현재 위치를 지도의 중심으로 설정
        width: "100%",
        height: "400px",
        zoom: 15,
      });
      setHomeMap(tmap2);
    };

    // 현재 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCurrentLocation({ lat, lng });
          mapInit(lat, lng); // 현재 위치를 지도 초기화에 사용
        },
        (error) => {
          console.error("현재 위치를 가져올 수 없습니다.", error);
          // 위치를 가져오지 못했을 경우 기본 위치로 지도 초기화
          mapInit(37.5652045, 126.98702028); // 기본 서울 좌표
        }
      );
    } else {
      // Geolocation을 사용할 수 없을 때 기본 위치로 지도 초기화
      mapInit(37.5652045, 126.98702028);
    }
  }, []); // 처음에 한 번만 실행

  const handleSearchRoute = () => {
    if (!startLocation || !endLocation) {
      alert("출발지와 도착지를 입력해주세요.");
      return;
    }
    // 출발지와 도착지를 query parameter로 전달
    nav(
      `/tmap?start=${encodeURIComponent(
        startLocation
      )}&end=${encodeURIComponent(endLocation)}`
    );
  };

  return (
    <div className="Home">
      <div id="map-container" className="map-container"></div>{" "}
      {/* 지도 컨테이너 */}
      <div className="search-bar">
        <input
          className="search-bar1"
          placeholder="출발지 입력"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
        />
        <input
          className="search-bar2"
          placeholder="도착지 입력"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
        />
        <RoadButton className="view-route" onClick={handleSearchRoute} />
      </div>
      <Nav />
    </div>
  );
};

export default Home;
