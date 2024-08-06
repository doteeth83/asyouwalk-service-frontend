import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
//컴포넌트 import
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import RoadDetail from "./pages/RoadDetail";
import Target from "./pages/Target";
import Mypage from "./pages/MyPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BodyInfo from "./pages/BodyInfo";
import Calorie from "./pages/Calorie";

import PloggingRegister from "./pages/PloggingRegister";
import PloggingDetail from "./pages/PloggingDetail";
import PloggingPhoto from "./pages/PloggingPhoto";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 랜딩화면&홈화면 */}

          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          {/* 경로 화면*/}
          <Route path="/short/:routeId" element={<RoadDetail />} />
          <Route path="/plogging/:routeId" element={<PloggingDetail />} />
          {/* 플로깅 화면*/}

          <Route exact path="/plogging" element={<PloggingRegister />} />
          <Route exact path="/plogging-photos" element={<PloggingPhoto />} />
          {/* 마이페이지*/}
          <Route exact path="/body-info" element={<BodyInfo />} />
          <Route exact path="/user/allCal" element={<Calorie />} />
          <Route exact path="/target" element={<Target />} />
          {/*로그인 페이지*/}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
