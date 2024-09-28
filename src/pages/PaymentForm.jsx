import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // axios 임포트
import "../styles/PaymentForm.css";
import { IoIosArrowBack } from "react-icons/io";

function PaymentForm() {
  const location = useLocation();
  const product = location.state?.product || {}; // ProductList에서 전달된 상품 정보
  const [itemName, setItemName] = useState(
    product.productName || "테스트 상품"
  );
  const [itemId, setItemID] = useState(product.productId);
  const [itemImg, setItemImg] = useState(product.productPictureUrl);
  const [itemPrice, setItemPrice] = useState(product.productPrice || 101);
  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const handleOrderAndPayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const API_BASE_URL = "https://asyouwork.com:8443/api";
    try {
      // 로컬 스토리지에서 token과 memberId 가져오기
      const token = localStorage.getItem("token");
      const memberId = localStorage.getItem("memberId");
      console.log(itemId);
      console.log(token);

      if (!token) {
        throw new Error("로그인이 필요합니다.");
      }

      // 주문 생성 요청을 axios로 변경
      const orderResponse = await axios.post(
        `${API_BASE_URL}/orders`,
        {
          price: itemPrice,
          productId: itemId, // ProductList에서 전달된 상품 ID 사용
          userId: 1,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6InVzZXIxIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcyNzQ5NjE5NCwiZXhwIjoxNzI3NTMyMTk0fQ.D34AxJeu7il_ehK1QFRg8UfMIYGMbpFNHUsTp_P5IXs", // 헤더에 토큰 추가
            "Content-Type": "application/json",
          },
        }
      );

      const orderData = orderResponse.data;
      const paymentId = generatePaymentId();

      // PortOne 결제 처리
      const payment = await window.PortOne.requestPayment({
        storeId: "store-0d330b91-6dd8-4b62-9e00-3c08e9588a68",
        channelKey: "channel-key-cc00994e-c093-455b-b175-b6ca955b93c8",
        paymentId: paymentId,
        orderName: itemName,
        totalAmount: itemPrice,
        currency: "KRW",
        payMethod: paymentMethod,
        customer: {
          phoneNumber: "010-4187-7322",
        },
        redirectUrl: "https://asyouwork.com:8443/api/success",
        noticeUrls: ["https://localhost:8080/api/orders/webhook"],
        customData: {
          orderId: orderData.orderId,
        },
      });

      if (payment.code != null) {
        console.error("결제 실패:", payment);
        alert(`결제 실패: ${payment.message}`);
      } else {
        console.log("결제 성공:", payment);
        nav("/success", {
          state: { orderId: orderData.orderId, paymentId },
        });
      }
    } catch (error) {
      console.error("주문 또는 결제 처리 중 오류:", error);
      alert(`주문 또는 결제 중 오류가 발생했습니다. ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePaymentId = () => {
    return [...crypto.getRandomValues(new Uint32Array(2))]
      .map((word) => word.toString(16).padStart(8, "0"))
      .join("");
  };

  return (
    <div>
      <div className="pay-header">
        <IoIosArrowBack
          onClick={() => nav("/shop")}
          className="arrow-back-pay"
        />
        <span className="go-pay">결제하기</span>
      </div>
      <div className="PaymentForm">
        <img className="item-img" src={itemImg} alt="상품이미지" />

        <form className="pay-info" onSubmit={handleOrderAndPayment}>
          <label>
            <input
              className="pay-name"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              className="pay-price"
              type="number"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              required
            />
          </label>
          <div className="pay-method">
            <label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="CARD">카드</option>
                <option value="VIRTUAL_ACCOUNT">가상계좌</option>
              </select>
            </label>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "결제 진행 중..." : "결제하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;
