import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Road from "./pages/Road";

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
