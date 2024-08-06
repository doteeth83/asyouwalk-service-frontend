import React, { useState, useEffect } from "react";
import "../styles/BodyInfo.css";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import LongButton from "../components/LongButton";
import SavePopup from "../components/SavePopup";

const BodyInfo = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [showSave, setShowSave] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 키와 몸무게를 불러옴
    const storedHeight = localStorage.getItem("height");
    const storedWeight = localStorage.getItem("weight");

    if (storedHeight) {
      setHeight(storedHeight);
    }
    if (storedWeight) {
      setWeight(storedWeight);
    }
  }, []);

  const handleSubmit = () => {
    // 키와 몸무게를 로컬 스토리지에 저장
    localStorage.setItem("height", height);
    localStorage.setItem("weight", weight);

    console.log("데이터가 성공적으로 저장되었습니다!");
    setShowSave(true);
  };

  const handleButtonClick = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지
    handleSubmit();
  };

  return (
    <div className="BodyInfo">
      <IoIosArrowBack onClick={() => navigate(-1)} className="arrow-back" />
      <form className="user-form" onSubmit={handleButtonClick}>
        <h4>체형</h4>
        <p>나의 키와 몸무게에 맞춰 소모 칼로리를 계산해요.</p>
        <div className="user-form-input">
          <div className="height">
            <p>키</p>
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="weight">
            <p>몸무게</p>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>
        <div className="button-container">
          <LongButton
            onClick={handleButtonClick}
            className="submit-form"
            text={"저장하기"}
            type={"register"}
          />
          {showSave && <SavePopup action="저장" />}
        </div>
      </form>
    </div>
  );
};

export default BodyInfo;
