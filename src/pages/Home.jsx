import React, { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import "../styles/Home.css";
import RoadItem from "../components/RoadItem";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import shortRouteList from "../util/shortRouteList.js";

const Home = () => {
  const mapContainer = useRef(null);
  const [search, setSearch] = useState("");
  const nav = useNavigate();

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return shortRouteList;
    }
    return shortRouteList.filter(
      (route) =>
        route.start.toLowerCase().includes(search.toLowerCase()) ||
        route.end.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredRoutes = getFilteredData();

  useEffect(() => {
    if (mapContainer.current) {
      let mapOption = {
        center: new kakao.maps.LatLng(37.46849, 127.0395),
        level: 3,
      };

      let map = new kakao.maps.Map(mapContainer.current, mapOption);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;

          let locPosition = new kakao.maps.LatLng(lat, lon);
          let message = '<div style="padding:5px;">현 위치</div>';

          displayMarker(locPosition, message);
        });
      } else {
        let locPosition = new kakao.maps.LatLng(37.46849, 127.0395);
        let message = "geolocation을 사용할 수 없어요..";

        displayMarker(locPosition, message);
      }

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

        infowindow.open(map, marker);
        map.setCenter(locPosition);
      }
    }
  }, []);

  return (
    <div className="Home">
      <div className="map-container">
        <input
          className="search-bar"
          placeholder="역 이름을 입력해주세요"
          value={search}
          onChange={onChangeSearch}
        />
        <div
          ref={mapContainer}
          className="map"
          style={{ width: "100%", height: "400px" }}
        ></div>
      </div>

      <div className="road-list-container">
        <div className="road-list-title">
          <span className="recomend-route">🏃🏻 추천 경로</span>
        </div>
        {filteredRoutes.map((route) => (
          <RoadItem key={route.id} route={route} />
        ))}
      </div>
      <Nav className="navigation" />
    </div>
  );
};

export default Home;
