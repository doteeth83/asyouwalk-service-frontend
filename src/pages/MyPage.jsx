import React, { useEffect, useState } from "react";
import axios from "axios";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Nav from "../components/Nav.jsx";
import "../styles/MyPage.css";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { BiStoreAlt } from "react-icons/bi";
import { LuSubtitles } from "react-icons/lu";
import { CiFolderOn } from "react-icons/ci";
import { GoDatabase } from "react-icons/go";
import BodyInfo from "./BodyInfo.jsx";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = "http://15.165.17.77:8080/api";

  const goTarget = () => {
    navigate("/target");
  };

  const goPloggingPhoto = () => {
    navigate("/plogging-photos");
  };

  const goToBodyInfo = () => {
    navigate("/body-info");
  };
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      axios
        .get(`${API_BASE_URL}/users/${userId}`)
        .then((response) => {
          console.log("User info fetched successfully", response.data);
          setUserInfo(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch user info", error.response || error);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!userInfo) {
    return <div>로그인 페이지로 이동합니다.</div>;
  }

  return (
    <div className="MyPage">
      <div className="profile-container">
        <h4 className="">{userInfo.nickName}</h4>
        <button>프로필 수정</button>
      </div>

      <div className="profile-item-container">
        <Container className="route-item-container">
          <Col>
            <span>🔥</span>소모칼로리 {userInfo.calSum || 0}
          </Col>
          <span className="line">|</span>
          <Col>
            <span>🌳</span>탄소 절감량 {userInfo.carSum || 0}
          </Col>
          <span className="line">|</span>
          <Col>
            <span>💰</span>포인트 {userInfo.totalPoint || 0}
          </Col>
        </Container>
        <div className="profile-information-container">
          <h4>나의 정보/활동</h4>
          <Stack className="stack-container" gap={3}>
            <div className="p-2 with-border" onClick={goToBodyInfo}>
              <IoIosInformationCircleOutline className="p-icon" /> 키/몸무게
              정보
            </div>
            <div onClick={goTarget} className="p-2 with-border">
              <BiStoreAlt className="p-icon" />
              나의 취향 저격 장소
            </div>
            <div className="p-2">
              <LuSubtitles className="p-icon" />
              작성한 댓글
            </div>
          </Stack>
        </div>
        <div className="profile-plogging-container">
          <h4>플로깅 내역</h4>
          <Stack className="stack-container" gap={3}>
            <div className="p-2 with-border" onClick={goPloggingPhoto}>
              <CiFolderOn className="p-icon" />
              플로깅 갤러리
            </div>
            <div className="p-2">
              <GoDatabase className="p-icon" />
              월별 통계
            </div>
          </Stack>
        </div>
      </div>
      <Nav />
    </div>
  );
};

export default MyPage;
