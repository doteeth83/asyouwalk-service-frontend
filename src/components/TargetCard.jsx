import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/TargetCard.css";
import { getTargetImage } from "../util/target-card-image";
import { targetList } from "../util/targetList";
import "bootstrap/dist/css/bootstrap.min.css";

const TargetCard = () => {
  return (
    <Container>
      <Row>
        {targetList.slice(0, 2).map((target) => (
          <Col>
            <div className="target-place-container">
              <div className="place-text-container1">
                <h3>{target.place}</h3>
                <p>{target.descript}</p>
              </div>
              <img src={getTargetImage(target.targetId)} alt={target.place} />
            </div>
          </Col>
        ))}
      </Row>
      <Row>
        {targetList.slice(2, 5).map((target) => (
          <Col>
            <div className="target-place-container2">
              <div className="place-text-container2">
                <h5>{target.place}</h5>
                <p>{target.descript}</p>
              </div>
              <img src={getTargetImage(target.targetId)} alt={target.place} />
            </div>
          </Col>
        ))}
      </Row>
      <Row>
        {targetList.slice(5, 8).map((target) => (
          <Col>
            <div className="target-place-container2">
              <div className="place-text-container2">
                <h5>{target.place}</h5>
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
