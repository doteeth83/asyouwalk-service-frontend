import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
function Login() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const API_BASE_URL = "http://43.203.247.164:8080/api";

  const isFormFilled = memberId.length > 0 && password.length > 0;

  const handleLoginClick = async () => {
    if (!isFormFilled) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        memberId: memberId,
        password: password,
      });

      if (response.data && response.data.token) {
        console.log("로그인 성공", response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("memberId", memberId);
        localStorage.setItem("username", response.data.name); // username 저장
        nav("/");
      } else {
        alert(
          `로그인 실패: ${response.data.message || "응답이 올바르지 않습니다."}`
        );
      }
    } catch (error) {
      console.error("로그인 실패", error.response ? error.response : error);
      const errorMessage = error.response
        ? error.response.data.message || "아이디 또는 비밀번호를 확인해주세요."
        : "서버 연결에 실패했습니다.";
      alert(`로그인 실패: ${errorMessage}`);
    }
  };

  const handleSignUpClick = () => {
    nav("/register");
  };

  return (
    <div className="Login">
      <IoIosArrowBack
        onClick={() => nav("/home")}
        className="arrow-back-black"
      />
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
            onClick={handleLoginClick}
            disabled={!isFormFilled}
          >
            로그인
          </button>
          <div className="Nedivider">———————— 또는 ————————</div>
          <p className="Nesignup-prompt">
            아직 회원이 아니신가요?
            <span onClick={handleSignUpClick}> 회원가입 하러 가기</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
