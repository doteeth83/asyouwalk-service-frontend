import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";

function Login() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const isFormFilled = memberId.length > 0 && password.length > 0;
  const API_BASE_URL = "https://asyouwork.com:8443";

  const handleLogin = async () => {
    try {
      // FormData 객체 생성
      const formData = new FormData();
      formData.append("memberId", memberId);
      formData.append("password", password);

      const response = await axios.post(`${API_BASE_URL}/login`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // 서버에서 'authorization' 헤더로 전달된 토큰 추출
      const token = response.headers["authorization"]; // 'authorization' 헤더에서 토큰 추출

      if (token) {
        // Bearer 를 포함하여 로컬 스토리지에 토큰 저장
        localStorage.setItem("token", token);

        console.log("토큰:", token);

        alert("로그인 성공");
        nav("/"); // 로그인 성공 후 메인 페이지로 이동
      } else {
        throw new Error("토큰을 받지 못했습니다.");
      }
    } catch (error) {
      console.error("로그인 실패", error);
      alert("로그인 실패: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="Login">
      <IoIosArrowBack onClick={() => nav("/")} className="arrow-back-black" />
      <div className="Nelogin-container">
        <div className="Neright-section">
          <h2>로그인</h2>

          <div className="Neinput-container">
            <p>아이디</p>
            <input
              className="Neunderline-input"
              type="text"
              placeholder="아이디를 입력해주세요"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
          </div>
          <div className="Neinput-container">
            <p>비밀번호</p>
            <input
              className="Neunderline-input"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className={`Nelogin-button ${isFormFilled ? "active" : ""}`}
            type="button"
            onClick={handleLogin}
            disabled={!isFormFilled}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
