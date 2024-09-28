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
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 에러 상태 추가
  const navigate = useNavigate();
  const API_BASE_URL = "https://asyouwork.com:8443/api";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // 사용자 정보를 가져오는 API 호출
    axios
      .get(`${API_BASE_URL}/users/me`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6InVzZXIxIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcyNzQ5NjE5NCwiZXhwIjoxNzI3NTMyMTk0fQ.D34AxJeu7il_ehK1QFRg8UfMIYGMbpFNHUsTp_P5IXs", // 헤더에 토큰 추가
        },
      })
      .then((response) => {
        setUserInfo(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch user info:", error);

        if (error.response && error.response.status === 500) {
          setError("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } else if (error.response && error.response.status === 401) {
          setError("인증이 만료되었습니다. 다시 로그인해주세요.");
          navigate("/login");
        } else {
          setError("사용자 정보를 불러오는데 실패했습니다.");
        }

        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>; // 에러 메시지 표시
  }

  if (!userInfo) {
    return <div>로그인 정보가 없습니다. 로그인 페이지로 이동합니다.</div>;
  }

  return (
    <div className="MyPage">
      <div className="profile-container">
        <h4>{userInfo.nickName}</h4>
        <button>프로필 수정</button>
      </div>

      <div className="profile-item-container">
        <Container className="route-item-container">
          <Col>
            <span>🔥</span>소모 칼로리 {userInfo.totalCalorie || 0}
          </Col>
          <span className="line">|</span>
          <Col>
            <span>🌳</span>탄소 절감량 {userInfo.totalCo2 || 0}
          </Col>
          <span className="line">|</span>
          <Col>
            <span>💰</span>포인트 {userInfo.totalPoint || 0}
          </Col>
        </Container>

        <div className="profile-information-container">
          <h4>나의 정보/활동</h4>
          <Stack className="stack-container" gap={3}>
            <div
              className="p-2 with-border"
              onClick={() => navigate("/body-info")}
            >
              <IoIosInformationCircleOutline className="p-icon" /> 키/몸무게
              정보
            </div>
            <div
              onClick={() => navigate("/target")}
              className="p-2 with-border"
            >
              <BiStoreAlt className="p-icon" /> 나의 취향 저격 장소
            </div>
            <div className="p-2">
              <LuSubtitles className="p-icon" /> 작성한 댓글
            </div>
          </Stack>
        </div>

        <div className="profile-plogging-container">
          <h4>플로깅 내역</h4>
          <Stack className="stack-container" gap={3}>
            <div
              className="p-2 with-border"
              onClick={() => navigate("/plogging-photos")}
            >
              <CiFolderOn className="p-icon" /> 플로깅 갤러리
            </div>
            <div className="p-2">
              <GoDatabase className="p-icon" /> 월별 통계
            </div>
          </Stack>
        </div>
      </div>
      <Nav />
    </div>
  );
};

export default MyPage;
