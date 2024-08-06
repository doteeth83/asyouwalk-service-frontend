import React, { useState } from "react";
import LongButton from "../components/LongButton";
import Nav from "../components/Nav";
import "../styles/PloggingRegister.css";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SavePopup from "../components/SavePopup";
const PloggingRegister = () => {
  const navigate = useNavigate();
  const [previewImg, setPreviewImg] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [showSave, setShowSave] = useState(false);

  const API_BASE_URL = "http://15.165.17.77:8080/api";
  const uploadToS3 = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/plogging/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("서버 응답:", response.data);
      return response.data.pictureUrl; // 올바른 필드를 참조하도록 수정
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error("Image upload failed");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImg(previewUrl);
      setImageFile(file);
      setSelectedFileName(file.name);

      // 메모리 누수를 방지하기 위해 이전 URL을 해제합니다.
      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("plogging-img-input").click();
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      alert("이미지를 업로드한 후 제출해주세요.");
      return;
    }

    try {
      const imageUrl = await uploadToS3(imageFile);
      if (!imageUrl) {
        throw new Error("Image URL is undefined");
      }
      setUploadedImageUrl(imageUrl);
      console.log("이미지 URL:", imageUrl);
      navigate("/plogging-photos");
    } catch (error) {
      alert("이미지 업로드에 실패했습니다.");
      console.error("Error:", error);
    }
  };

  //저장하기 버튼 클릭 핸들러
  const handlePloggingButton = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지
    setShowSave(true);
    await handleSubmit();
  };
  return (
    <div className="PloggingRegister">
      <div className="plogging-img-container">
        <input
          type="file"
          id="plogging-img-input"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <button
          className="plogging-img-upload"
          onClick={handleUploadClick}
          style={{
            backgroundImage: previewImg ? `url(${previewImg})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!previewImg && (
            <>
              <CiImageOn />
              클릭하여 사진 업로드
            </>
          )}
        </button>
        {selectedFileName && <span>{selectedFileName}</span>}
      </div>
      <span className="plogging-explain">플로깅 인증 사진을 첨부해주세요</span>
      <div className="plogging-btn-container">
        <LongButton
          text={"저장하기"}
          type={"plogging"}
          onClick={handlePloggingButton}
        />
        {showSave && <SavePopup action="저장" />}
        <LongButton
          text={"경로 화면으로"}
          type={"register"}
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="nav-container">
        <Nav className="navigation" />
      </div>
    </div>
  );
};

export default PloggingRegister;
