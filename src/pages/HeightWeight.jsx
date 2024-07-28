import { useState } from "react";
import axios from "axios";
import "../styles/HeightWeight.css";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import LongButton from "../components/LongButton";
import SavePopup from "../components/SavePopup";

const HeightWeight = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const nav = useNavigate();

  // 팝업 창
  const [showSave, setShowSave] = useState(false);

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId"); // localStorage에서 사용자 ID 가져오기
    const userData = {
      user_id: userId,
      height: parseFloat(height),
      weight: parseFloat(weight),
    };

    const API_BASE_URL = "API_BASE_URL";

    try {
      const token = localStorage.getItem("token"); // localStorage에서 토큰 가져오기
      const response = await axios.post(`${API_BASE_URL}/user/info`, userData, {
        headers: {
          "Content-Type": "application/json",
          // 헤더에 토큰 추가
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("데이터가 성공적으로 제출되었습니다!");
        window.location.reload();
      } else {
        console.error("데이터 제출에 실패했습니다.");
      }
    } catch (error) {
      console.error("데이터 제출 중 오류가 발생했습니다.", error);
    }
  };

  const handleButtonClick = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지
    setShowSave(true);
    await handleSubmit();
  };

  return (
    <div className="HeightWeight">
      <IoIosArrowBack onClick={() => nav(-1)} className="arrow-back" />
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

export default HeightWeight;
