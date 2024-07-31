import React, { useEffect, useRef } from "react";

const Map = ({ route }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new window.kakao.maps.Map(mapRef.current, {
      center: new window.kakao.maps.LatLng(
        route.coordinates[0].lat,
        route.coordinates[0].lng
      ),
      level: 7,
    });

    const linePath = route.coordinates.map(
      (coord) => new window.kakao.maps.LatLng(coord.lat, coord.lng)
    );
    const polyline = new window.kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: "#0000FF",
      strokeOpacity: 0.7,
      strokeStyle: "solid",
    });

    polyline.setMap(map);
  }, [route]);

  return <div ref={mapRef} style={{ width: "100%", height: "50vh" }}></div>;
};

export default Map;
