import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function PaymentSuccess() {
  const location = useLocation();
  const { orderId, paymentId } = location.state || {};
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(
          `https://api.portone.io/payments/${paymentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "PortOne Csyz4P2E26mtjbxT5BDbZTU4VIfv7aqPcNrWM1ZGJESwHsp0rT2IJ6U9lgZ6TCIxk1vZc324IuvlgBK4",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `결제 정보를 불러오지 못했습니다: ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("결제 상세 정보 가져오기 성공:", data);
        setPaymentInfo(data);

        const completeUrl = `https://asyouwork.com:8443/api/orders/${orderId}/complete`;
        const completeResponse = await fetch(completeUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6InVzZXIxIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcyNzQ0NjEzNSwiZXhwIjoxNzI3NDQ5NzM1fQ.RpXXBlnQZaDCiEQux2RHDuSn4WhIWNJlWBbTbN2nqgQ", // 필요에 따라 JWT 토큰을 변경하세요
          },
          body: JSON.stringify({
            paymentId: data.id,
            cardApprovalNumber: data.method?.card?.approvalNumber || "",
            installmentInfo: data.method?.card?.installment || "할부 없음",
          }),
        });

        if (completeResponse.ok) {
          console.log("결제 완료 처리 성공");
        } else {
          console.error("결제 완료 처리 실패:", completeResponse);
        }
      } catch (error) {
        console.error("결제 정보 조회 중 오류:", error);
      }
    };

    if (paymentId && orderId) {
      fetchPaymentDetails();
    }
  }, [orderId, paymentId]);

  return (
    <div className="payment-info">
      <h2>결제 완료 정보</h2>
      {paymentInfo ? (
        <>
          <p>
            <strong>결제 상태:</strong> {paymentInfo.status}
          </p>
          <p>
            <strong>결제 ID:</strong> {paymentInfo.id}
          </p>
          <p>
            <strong>거래 ID:</strong> {paymentInfo.transactionId}
          </p>
          <p>
            <strong>상점 ID:</strong> {paymentInfo.storeId}
          </p>
          <p>
            <strong>결제 수단:</strong>{" "}
            {paymentInfo.method?.type || "정보 없음"}
          </p>
          {paymentInfo.method?.card && (
            <>
              <p>
                <strong>카드 승인 번호:</strong>{" "}
                {paymentInfo.method.card.approvalNumber}
              </p>
              <p>
                <strong>할부 정보:</strong>{" "}
                {paymentInfo.method.card.installment
                  ? `${paymentInfo.method.card.installment}개월`
                  : "할부 없음"}
              </p>
              <p>
                <strong>포인트 사용 여부:</strong>{" "}
                {paymentInfo.method.card.pointUsed ? "예" : "아니오"}
              </p>
            </>
          )}
          <p>
            <strong>결제 요청 시각:</strong> {paymentInfo.requestedAt}
          </p>
          <p>
            <strong>결제 업데이트 시각:</strong> {paymentInfo.updatedAt}
          </p>
          <p>
            <strong>주문명:</strong> {paymentInfo.orderName}
          </p>
          <p>
            <strong>총 결제 금액:</strong> {paymentInfo.amount.total}원
          </p>
          <p>
            <strong>실제 결제 금액:</strong> {paymentInfo.amount.paid}원
          </p>
          <p>
            <strong>취소 금액:</strong> {paymentInfo.amount.cancelled || 0}원
          </p>
        </>
      ) : (
        <p>결제 정보가 없습니다.</p>
      )}
    </div>
  );
}

export default PaymentSuccess;
