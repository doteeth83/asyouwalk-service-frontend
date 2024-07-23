import "../styles/Button.css";
import { IoIosArrowForward } from "react-icons/io";

const LongButton = ({ onClick, text, type }) => {
  return (
    <div className="LongButton">
      <button onClick={onClick} className={`button button_${type}`}>
        <span className="button-text">{text}</span>
        <IoIosArrowForward className="button-icon" />
      </button>
    </div>
  );
};

export default LongButton;
