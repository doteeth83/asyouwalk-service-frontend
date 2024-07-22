import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Landing from "./pages/Landing";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* 랜딩화면&홈화면 */}
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />
          {/* 학과 정보/공지 페이지
          <Route exact path="/department/:departId" element={<Department />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
