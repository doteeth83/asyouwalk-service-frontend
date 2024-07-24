import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/TargetCard.css";
import { getTargetImage } from "../util/target-card-image";
import { targetList } from "../util/targetList";
import "bootstrap/dist/css/bootstrap.min.css";

const TargetCard = () => {
  // 클릭된 요소를 추적하는 상태
  const [selectedId, setSelectedId] = useState(null);

  // 클릭 핸들러
  const handleClick = (id) => {
    setSelectedId(id);
  };

  return (
    <Container>
      <Row>
        {targetList.slice(0, 2).map((target) => (
          <Col key={target.targetId}>
            <div
              className={`target-place-container ${
                selectedId === target.targetId ? "selected" : ""
              }`}
              onClick={() => handleClick(target.targetId)}
            >
              <div className="place-text-container1">
                <h5>{target.place}</h5>
                <p>{target.descript}</p>
              </div>
              <img src={getTargetImage(target.targetId)} alt={target.place} />
            </div>
          </Col>
        ))}
      </Row>
      <Row>
        {targetList.slice(2, 5).map((target) => (
          <Col key={target.targetId}>
            <div
              className={`target-place-container2 ${
                selectedId === target.targetId ? "selected" : ""
              }`}
              onClick={() => handleClick(target.targetId)}
            >
              <div className="place-text-container2">
                <h6>{target.place}</h6>
                <p>{target.descript}</p>
              </div>
              <img src={getTargetImage(target.targetId)} alt={target.place} />
            </div>
          </Col>
        ))}
      </Row>
      <Row>
        {targetList.slice(5, 8).map((target) => (
          <Col key={target.targetId}>
            <div
              className={`target-place-container2 ${
                selectedId === target.targetId ? "selected" : ""
              }`}
              onClick={() => handleClick(target.targetId)}
            >
              <div className="place-text-container2">
                <h6>{target.place}</h6>
                <p>{target.descript}</p>
              </div>
              <img src={getTargetImage(target.targetId)} alt={target.place} />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TargetCard;
