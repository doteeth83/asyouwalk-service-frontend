import "../styles/SavePopup.css";
import { SlCheck } from "react-icons/sl";
import { Link } from "react-router-dom";

const Popup = ({ action }) => {
  let message = "";
  let text = "";
  if (action === "수정") {
    message = "수정이 완료되었어요";
    text = "확인";
  } else if (action === "삭제") {
    message = "삭제가 완료되었어요";
    text = "목록으로";
  } else if (action === "저장") {
    message = "저장이 완료되었어요";
    text = "확인";
  }

  return (
    <div className="popup-container">
      <span className="popup-message">
        <SlCheck className="check-icon" />
        {message}
      </span>
      <div>
        <Link to="/home">
          <button className="verify">{text}</button>
        </Link>
      </div>
    </div>
  );
};

export default Popup;
