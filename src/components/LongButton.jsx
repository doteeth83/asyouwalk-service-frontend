import "../styles/LongButton.css";
import { IoIosArrowForward } from "react-icons/io";

const LongButton = ({ onClick, text }) => {
  return (
    <div className="LongButton">
      <button onClick={onClick} className="button">
        <span className="button-text">{text}</span>
        <IoIosArrowForward className="button-icon" />
      </button>
    </div>
  );
};

export default LongButton;
