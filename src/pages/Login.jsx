import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";

function Login() {
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const API_BASE_URL = "http://15.165.17.77:8080/api";

  const isFormFilled = memberId.length > 0 && password.length > 0;

  const handleLogin = () => {
    axios
      .post(`${API_BASE_URL}/users/login`, {
        memberId: memberId,
        password: password,
      })
      .then((response) => {
        console.log('로그인 성공', response.data);
        const userId = response.data.userId;
        localStorage.setItem("userId", userId);

        alert("로그인 성공");
        nav("/mypage");
      })
      .catch((error) => {
        console.error("로그인 실패", error);
        alert("로그인 실패: " + (error.response?.data || error.message));
      });
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
            onClick={handleLogin}
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
