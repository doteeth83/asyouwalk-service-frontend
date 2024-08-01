import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import login from "../image/login.png";
import "../styles/KakaoLogin.css";
//아이콘
import { RiKakaoTalkFill } from "react-icons/ri";

const KakaoLogin = () => {
  const REST_API_KEY = process.env.VITE_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.VITE_APP_REDIRECT_URI;
  console.log(REST_API_KEY);
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div className="KakaoLogin">
      <img src={login} />
      <div className="login-text">
        <p>슬로건 슬로건 슬로건 슬로건</p>
        <h1>걷는대로</h1>
      </div>
      <button className="login-btn" onClick={handleLogin}>
        <RiKakaoTalkFill className="kakao-icon" />
        카카오톡으로 시작하기
      </button>
    </div>
  );
};

export default KakaoLogin;
