import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PaymentForm.css";
import { IoIosArrowBack } from "react-icons/io";

function PaymentForm() {
  const location = useLocation();
  const product = location.state?.product || {}; // ProductList에서 전달된 상품 정보
  const [itemName, setItemName] = useState(
    product.productName || "테스트 상품"
  );
  const [itemImg, setItemImg] = useState(product.productPictureUrl);
  const [itemPrice, setItemPrice] = useState(product.productPrice || 101);
  const [paymentMethod, setPaymentMethod] = useState("CARD");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOrderAndPayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const orderResponse = await fetch(
        "https://asyouwork.com:8443/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6InVzZXIxIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcyNzQ0NjEzNSwiZXhwIjoxNzI3NDQ5NzM1fQ.RpXXBlnQZaDCiEQux2RHDuSn4WhIWNJlWBbTbN2nqgQ", // 필요에 따라 JWT 토큰을 변경하세요
          },
          body: JSON.stringify({
            price: itemPrice,
            productId: product.id, // ProductList에서 전달된 상품 ID 사용
            userId: 1,
          }),
        }
      );

      if (!orderResponse.ok) {
        throw new Error("주문 생성에 실패했습니다.");
      }

      const orderData = await orderResponse.json();
      const paymentId = generatePaymentId();

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
        redirectUrl: `https://localhost:3000/success`,
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
        navigate("/success", {
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
        <IoIosArrowBack onClick={() => nav("/")} className="arrow-back-pay" />
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
