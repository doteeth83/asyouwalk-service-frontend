import LongButton from "../components/LongButton";
import Nav from "../components/Nav";
import "../styles/PloggingRegister.css";

import { CiImageOn } from "react-icons/ci";
const PloggingRegister = () => {
  return (
    <div className="PloggingRegister">
      <div className="plogging-img-container">
        <button className="plogging-img-upload">
          <CiImageOn />
          클릭하여 사진 업로드
        </button>
      </div>
      <span className="plogging-explain">플로깅 인증 사진을 첨부해주세요</span>
      <div className="plogging-btn-container">
        <LongButton text={"저장하기"} type={"plogging"} />
        <LongButton text={"경로 화면으로"} type={"register"} />
      </div>
      <div className="nav-container">
        <Nav />
      </div>
    </div>
  );
};
export default PloggingRegister;
