import React, { useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Nav from "../components/Nav.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/MyPage.css";
// 아이콘
import { IoIosInformationCircleOutline } from "react-icons/io";
import { BiStoreAlt } from "react-icons/bi";
import { LuSubtitles } from "react-icons/lu";
import { CiFolderOn } from "react-icons/ci";
import { GoDatabase } from "react-icons/go";

const MyPage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = "백엔드 배포 후";
  const userId = 1; // 임시 id 설정

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const goHeight = () => {
    navigate("/height");
  };

  const goTarget = () => {
    navigate("/target");
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="MyPage">
      <div className="profile-container">
        <div className="">프로필 이미지</div>
        <h4 className="">{userData.nickname}</h4>
        <button>프로필 수정</button>
      </div>
      <div className="profile-item-container">
        <Container className="route-item-container">
          <Col>
            <span>🔥</span>소모칼로리: {userData.cal_sum}
          </Col>
          <span className="line">|</span>
          <Col>
            <span>🌳</span>탄소 절감량: {userData.car_sum}
          </Col>
          <span className="line">|</span>
          <Col>
            <span>💰</span>포인트: {userData.total_point}
          </Col>
        </Container>
        <div className="profile-information-container">
          <h4>나의 정보/활동</h4>
          <Stack className="stack-container" gap={3}>
            <div className="p-2 with-border" onClick={goHeight}>
              <IoIosInformationCircleOutline className="p-icon" /> 키/몸무게
              정보
            </div>
            <div className="p-2 with-border" onClick={goTarget}>
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
            <div className="p-2 with-border">
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
