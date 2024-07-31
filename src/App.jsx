import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
//컴포넌트 import
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import RoadDetail from "./pages/RoadDetail";
import Target from "./pages/Target";
import Mypage from "./pages/MyPage";
import KakaoLogin from "./pages/KakaoLogin";
import BodyInfo from "./pages/BodyInfo";
import Calorie from "./pages/Calorie";
import KakaoCallback from "./pages/KakaoCallback";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 랜딩화면&홈화면 */}
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          {/* 경로 화면*/}
          <Route exact path="/route/:routeId" element={<RoadDetail />} />

          {/* 마이페이지*/}
          <Route exact path="/bodyinfo" element={<BodyInfo />} />
          <Route exact path="/user/allCal" element={<Calorie />} />
          <Route exact path="/target" element={<Target />} />
          {/*로그인 페이지*/}
          <Route path="/login" element={<KakaoLogin />} />
          <Route path="/login/oauth/kakao" element={<KakaoCallback />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
