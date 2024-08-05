import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RoadItem.css";
import RoadButton from "./RoadButton";
import Subway from "./Subway";

const RoadItem = ({ route }) => {
  const navigate = useNavigate();

  const goRoadView = (id) => {
    navigate(`/route/${id}`);
  };

  return (
    <div className="road-item">
      <div className="road-info">
        <div className="route-start">
          <span className="start-mark"></span>
          <div className="route-start-point">
            <div className="subway-mark">
              {route.startLine.map((line, index) => (
                <Subway
                  key={`start-${route.id}-${index}`}
                  number={route.startName[index]}
                  type={line}
                />
              ))}
            </div>
            {route.start}
          </div>
        </div>
        <div className="end-start">
          <span className="end-mark"></span>
          <div className="route-end-point">
            <div className="subway-mark">
              {route.endLine.map((line, index) => (
                <Subway
                  key={`end-${route.id}-${index}`}
                  number={route.endName[index]}
                  type={line}
                />
              ))}
            </div>
            {route.end}
          </div>
        </div>
      </div>
      <RoadButton className="view-route" onClick={() => goRoadView(route.id)} />
    </div>
  );
};

export default RoadItem;
