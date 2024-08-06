import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { FiAlertCircle } from "react-icons/fi";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";

function Register() {
  const nav = useNavigate();
  const [userName, setUserName] = useState("");
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");

  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const API_BASE_URL = "https://asyouwork.com:8443/api";

  const isFormFilled =
    userName.length > 0 && memberId.length > 0 && password.length > 0;

  const handleSignup = () => {
    axios
      .post(`${API_BASE_URL}/users/signUp`, {
        memberId,
        password,
        name: userName,
      })
      .then((response) => {
        console.log("회원가입 성공", response.data);
        alert("회원가입 성공");
        nav("/home");
      })
      .catch((error) => {
        console.error("회원가입 실패", error.response || error);
        alert("회원가입 실패: " + (error.response?.data || error.message));
      });
  };

  return (
    <div className="Register">
      <IoIosArrowBack onClick={() => nav(-1)} className="arrow-back-black" />
      <div className="Neright-section">
        <h2>회원가입</h2>
        <p>회원가입을 통해 걷는대로의 서비스를 이용해 보세요!</p>

        <div className="Neinput-container">
          <p>
            이름<span className="Nerequired"> *필수</span>
          </p>
          <input
            className="Neunderline-input"
            type="text"
            placeholder="이름을 입력해주세요"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="Neinput-container">
          <p>
            아이디<span className="Nerequired"> *필수</span>
          </p>
          <input
            className="Neunderline-input"
            type="text"
            placeholder="아이디를 입력해주세요"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
          />
        </div>

        <div className="Neinput-container">
          <p className="Nepassword-label">
            비밀번호<span className="Nerequired"> *필수</span>
          </p>
          <input
            className="Neunderline-input"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>영어 소문자, 대문자, 특수문자를 포함해주세요</p>
        </div>

        <button
          className={`login-button ${isFormFilled ? "active" : ""}`}
          type="button"
          onClick={handleSignup}
          disabled={!isFormFilled}
        >
          입력완료
        </button>
      </div>
    </div>
  );
}

export default Register;
