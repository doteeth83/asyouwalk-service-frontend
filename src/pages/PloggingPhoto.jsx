import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "../components/Nav";
import "../styles/PloggingPhoto.css"; // CSS 파일을 import 합니다

const PloggingPhoto = () => {
  const [photos, setPhotos] = useState([]);
  const API_BASE_URL = "http://15.165.17.77:8080/api";

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/plogging/pic`);
        setPhotos(response.data);
      } catch (error) {
        console.error("Failed to fetch photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="PloggingPhoto">
      <h1>플로깅 사진 갤러리</h1>
      <div className="photo-gallery">
        <Container>
          <Row>
            {photos.map((photo, index) => (
              <Col key={index} xs={4}>
                <div className="photo-item">
                  <img src={photo.pictureUrl} alt={`Plogging ${index + 1}`} />
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <div className="nav-container">
        <Nav />
      </div>
    </div>
  );
};

export default PloggingPhoto;
