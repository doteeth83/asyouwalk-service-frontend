import "../styles/Landing.css";
import LandingImg from "../image/Landing.png";
import LongButton from "../components/LongButton";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const nav = useNavigate();

  return (
    <div className="Landing">
      <img className="LandingImg" src={LandingImg} />
      <div className="landing-text">
        <h1>
          경로만
          <br />
          선택하면
        </h1>
        <p className="landing-explain">
          최단 경로부터, 플로깅 경로
          <br /> 숨은 나의 취향 저격 장소를 포함한 경로까지
          <br />
          전부 알려드릴게요
        </p>
      </div>
      <div className="landing-button-container">
        <p>
          지금 바로 <span className="new-road">새로운 경로</span>를 탐색하고
          싶으신가요?
        </p>
        <LongButton
          type={"goHome"}
          onClick={() => nav("/home")}
          className="Landing-btn"
          text={"탐색하러가기"}
        />
      </div>
    </div>
  );
};

export default Landing;
