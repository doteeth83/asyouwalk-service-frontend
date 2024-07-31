import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const KakaoCallback = () => {
  const location = useLocation();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");
    //API_BASE_URL=""
    if (code) {
      axios
        //.post("API_BASE_URL/login/oauth/kakao", { code })
        .post("http://localhost/api/login/oauth/kakao", { code })
        .then((response) => {
          const { access_token } = response.data;

          console.log("Access Token:", access_token);
        })
        .catch((error) => {
          console.error("Error fetching access token:", error);
        });
    }
  }, [location]);

  return <div>Redirecting...</div>;
};

export default KakaoCallback;
