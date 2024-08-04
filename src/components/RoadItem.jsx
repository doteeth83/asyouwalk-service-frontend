import React from "react";
import { useNavigate } from "react-router-dom";
import shortRouteList from "../util/shortRouteList.js";
import "../styles/RoadItem.css";
import RoadButton from "./RoadButton";
import Subway from "./Subway";

const RoadItem = () => {
  const navigate = useNavigate();

  const goRoadView = (id) => {
    navigate(`/route/${id}`);
  };

  return (
    <div className="RoadItem">
      {shortRouteList.map((item) => (
        <div key={item.id} className="road-item">
          <div className="road-info">
            {/*시작점 마크*/}
            <div className="route-start">
              <span className="start-mark"></span>
              <div className="route-start-point">
                <div className="subway-mark">
                  {item.startLine.map((line, index) => (
                    <Subway
                      key={`start-${item.id}-${index}`}
                      number={item.startName[index]}
                      type={line}
                    />
                  ))}
                </div>
                {item.start}
              </div>
            </div>
            {/*도착점 마크*/}
            <div className="end-start">
              <span className="end-mark"></span>
              <div className="route-end-point">
                <div className="subway-mark">
                  {item.endLine.map((line, index) => (
                    <Subway
                      key={`end-${item.id}-${index}`}
                      number={item.endName[index]}
                      type={line}
                    />
                  ))}
                </div>
                {item.end}
              </div>
            </div>
          </div>
          <RoadButton
            className="view-route"
            onClick={() => goRoadView(item.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default RoadItem;
