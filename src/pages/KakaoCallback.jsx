import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    const API_BASE_URL = "어쩌고";
    if (code) {
      axios
        .post(`${API_BASE_URL}/api/auth/kakao`, { code })
        .then((response) => {
          const { access_token } = response.data;
          console.log("Access Token:", access_token);
          // Save the access token to local storage
          localStorage.setItem("kakao_access_token", access_token);
          // Redirect to mypage
          navigate("/mypage");
        })
        .catch((error) => {
          console.error("Error fetching access token:", error);
        });
    }
  }, [location, navigate]);

  return <div>Redirecting...</div>;
};

export default KakaoCallback;
