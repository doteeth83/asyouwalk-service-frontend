import { useState } from "react";

const useMap = () => {
  const [mapInstance, setMapInstance] = useState(null);

  const initializeMap = (lat, lng) => {
    const newMapInstance = new window.Tmapv2.Map("map_div", {
      center: new window.Tmapv2.LatLng(lat, lng),
    });
    setMapInstance(newMapInstance);
    return newMapInstance;
  };

  const destroyMap = () => {
    if (mapInstance) {
      mapInstance.destroy();
      setMapInstance(null);
    }
  };

  return { mapInstance, initializeMap, destroyMap };
};

export default useMap;
