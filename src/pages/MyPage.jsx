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
  const API_BASE_URL = "https://asyouwork.com:8443/api";

  useEffect(() => {
    // useEffect를 사용하여 컴포넌트가 마운트될 때 API 호출
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기

    // API 호출 및 데이터 수신
    axios
      .get(`${API_BASE_URL}/mypage`, {
        headers: {
          Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
        },
      })
      .then((response) => {
        // API 응답 데이터를 받아와서 상태 변수에 설정
        const userData = response.data;
        setUserName(userData.memberId);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // 오류 처리
      });
  }, []);

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
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${API_BASE_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
          },
        })
        .then((response) => {
          console.log("User info fetched successfully", response.data);
          setUserInfo(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch user info", error.response || error);
          navigate("/login");
        });
    } else {
      navigate("/login"); // 토큰이 없으면 로그인 페이지로 이동
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
