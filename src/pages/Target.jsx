import React, { useState } from "react";
import TargetCard from "../components/TargetCard";
import "../styles/Target.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaRegSquarePlus } from "react-icons/fa6";
import LongButton from "../components/LongButton";
import axios from "axios";
import SavePopup from "../components/SavePopup";
const Target = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const nav = useNavigate();
  const API_BASE_URL = "API_BASE_URL";
  const userId = 1; // 임시

  const [targetSave, setTargetSave] = useState(false);

  const handleSave = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/info`, {
        user_id: userId,
        targetIds: selectedIds,
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error saving targetIds:", error);
    }
  };

  const handleTargetButton = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지
    setTargetSave(true);
    await handleSave();
  };

  return (
    <div className="Target">
      <div className="target-container">
        <IoIosArrowBack onClick={() => nav(-1)} className="arrow-back" />
        <h3>어떤 장소가 취향이신가요?</h3>
        <div className="target-card-container">
          <TargetCard
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </div>
      </div>
      <div className="place-register">
        <div className="place-register-text">
          <h4>취향 장소 등록하기</h4>
          <FaRegSquarePlus className="plus-icon" />
        </div>
        <LongButton
          text={"저장하기"}
          type={"register"}
          onClick={handleTargetButton}
        />
      </div>
      {targetSave && <SavePopup action="저장" />}
    </div>
  );
};

export default Target;
