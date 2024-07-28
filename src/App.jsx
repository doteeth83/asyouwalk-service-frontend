import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
//컴포넌트 import
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Road from "./pages/Road";
import Target from "./pages/Target";
import Mypage from "./pages/MyPage";
import KakaoLogin from "./pages/KakaoLogin";
import HeightWeight from "./pages/HeightWeight";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 랜딩화면&홈화면 */}
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          {/* 경로 화면*/}
          <Route exact path="/road" element={<Road />} />
          {/* 마이페이지*/}
          <Route exact path="/height" element={<HeightWeight />} />
          <Route exact path="/target" element={<Target />} />
          {/*로그인 페이지*/}
          <Route path="/login" element={<KakaoLogin />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
