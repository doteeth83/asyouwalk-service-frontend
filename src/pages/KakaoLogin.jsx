import React, { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const KakaoLogin = () => {
  const REST_API_KEY = import.meta.env.VITE_APP_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_APP_REDIRECT_URI;
  console.log(REST_API_KEY);
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoAuthUrl;
  };

  return <button onClick={handleLogin}>Login with Kakao</button>;
};

export default KakaoLogin;
