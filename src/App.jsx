import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
//컴포넌트 import
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import RoadDetail from "./pages/RoadDetail";
import Target from "./pages/Target";
import Mypage from "./pages/MyPage";

import BodyInfo from "./pages/BodyInfo";
import Calorie from "./pages/Calorie";

import PloggingRegister from "./pages/PloggingRegister";
import Category from "./pages/Ex";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 랜딩화면&홈화면 */}
          <Route exact path="/test" element={<Category />} />
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          {/* 경로 화면*/}
          <Route exact path="/route/:routeId" element={<RoadDetail />} />
          {/* 플로깅 화면*/}
          <Route exact path="/plogging" element={<PloggingRegister />} />
          {/* 마이페이지*/}
          <Route exact path="/user/info" element={<BodyInfo />} />
          <Route exact path="/user/allCal" element={<Calorie />} />
          <Route exact path="/target" element={<Target />} />
          {/*로그인 페이지*/}

          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
