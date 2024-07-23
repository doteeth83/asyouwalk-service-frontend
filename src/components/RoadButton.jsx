import "../styles/Button.css";
import { IoIosArrowForward } from "react-icons/io";

const RoadButton = ({ onClick }) => {
  return (
    <div className="RoadButton">
      <button onClick={onClick} className="road-button">
        <span className="button-text">경로 보기</span>
        <IoIosArrowForward className="road-button-icon" />
      </button>
    </div>
  );
};

export default RoadButton;
