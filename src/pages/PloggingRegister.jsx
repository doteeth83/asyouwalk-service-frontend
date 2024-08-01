import React, { useState } from "react";
import LongButton from "../components/LongButton";
import Nav from "../components/Nav";
import "../styles/PloggingRegister.css";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";

const PloggingRegister = () => {
  const [ploggingImg, setPloggingImg] = useState(null);
  const [previewImg, setPreviewImg] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const uploadToS3 = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axios.post(
      "http://localhost:3000/api/plogging/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.imageUrl;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreviewImg(URL.createObjectURL(file));
      setImageFile(file);
      setSelectedFileName(file.name);
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
      setPloggingImg(imageUrl);

      console.log("이미지 URL:", imageUrl);
    } catch (error) {
      alert("이미지 업로드에 실패했습니다");
    }
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
          onClick={handleSubmit}
        />
        <LongButton text={"경로 화면으로"} type={"register"} />
      </div>
      <div className="nav-container">
        <Nav />
      </div>
    </div>
  );
};

export default PloggingRegister;
