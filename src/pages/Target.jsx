import TargetCard from "../components/TargetCard";
import "../styles/Target.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaRegSquarePlus } from "react-icons/fa6";
import LongButton from "../components/LongButton";

const Target = () => {
  const nav = useNavigate();
  // 클릭된 요소를 추적하는 상태

  return (
    <div className="Target">
      <IoIosArrowBack onClick={() => nav(-1)} className="arrow-back" />
      <h3>어떤 장소가 취향이신가요?</h3>
      <div className="target-card-container">
        <TargetCard />
      </div>
      <div className="place-register">
        <div className="place-register-text">
          <h4>취향 장소 등록하기</h4>
          <FaRegSquarePlus className="plus-icon" />
        </div>
        <LongButton text={"저장하기"} type={"register"} />
      </div>
    </div>
  );
};

export default Target;
