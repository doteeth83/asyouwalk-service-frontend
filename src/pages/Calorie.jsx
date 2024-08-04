import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/RouteItem.css";
import { IoIosArrowBack } from "react-icons/io";
import kcal from "../image/kcal.png";
import { useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";

const Calorie = () => {
  const [deletePop, setDeletePop] = useState(true);

  const nav = useNavigate();

  // Uncomment and modify the following code after backend deployment
  /*
  const [userData, setUserData] = useState(null);
  const API_BASE_URL = "백엔드 배포 후";
  const userId = 1; // 임시 id 설정

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);
  */

  const handleDeleteClick = () => {
    setDeletePop(false);
  };

  return (
    <div className="Calorie">
      <div className="calorie-container">
        <IoIosArrowBack onClick={() => nav(-1)} className="arrow-back-white" />
        <p className="item-ment">오늘도 같이 걸어볼까요 ?</p>
        <p className="item-today">Today</p>
        <div className="item_total">
          <div className="total-text">
            <div className="total-sum-item">임시</div>
            <div className="total-unit">kcal</div>
          </div>
          <img src={kcal} alt="칼로리 이미지" />
        </div>
        {deletePop && (
          <div className="item-announce">
            <TiDelete className="delete-icon" onClick={handleDeleteClick} />
          </div>
        )}
      </div>
      <div className="item-statistics"></div>
    </div>
  );
};

export default Calorie;
