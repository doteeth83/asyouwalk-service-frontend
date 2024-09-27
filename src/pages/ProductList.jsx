import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ProductList.css"; // CSS 파일을 불러옴
import { IoIosArrowBack } from "react-icons/io";
import Nav from "../components/Nav";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [activeBarcode, setActiveBarcode] = useState(null); // 현재 활성화된 바코드
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const API_BASE_URL = "https://asyouwork.com:8443/api";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/product`);
        setProducts(response.data);
      } catch (error) {
        console.error("상품 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchProducts();
  }, []);

  const handlePurchaseClick = (productId, productBarcodeUrl) => {
    // 클릭된 상품의 바코드를 모달로 표시
    setActiveBarcode({ id: productId, url: productBarcodeUrl });
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setActiveBarcode(null); // 바코드 초기화
  };

  return (
    <div>
      <IoIosArrowBack onClick={() => nav("/")} className="arrow-back-black" />
      <div className="category-buttons">
        <button className="category-button">전체</button>
        <button className="category-button">카테고리1</button>
        <button className="category-button">카테고리2</button>
        <button className="category-button">카테고리3</button>
      </div>
      <div className="container">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img
                  src={product.productPictureUrl}
                  alt={product.productName}
                />
              </div>
              <p className="product-category">{product.itemCategory}</p>
              <p className="product-name">{product.productName}</p>
              <p className="product-price">{product.productPrice}원</p>
              <button
                className="buy-button"
                onClick={() =>
                  handlePurchaseClick(product.id, product.productBarcodeUrl)
                }
              >
                구매
              </button>
            </div>
          ))
        ) : (
          <p>상품이 없습니다.</p>
        )}
      </div>

      {/* 모달 팝업 */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>바코드</h4>
            {activeBarcode?.url && (
              <img
                src={activeBarcode.url}
                alt="바코드"
                className="barcode-image"
              />
            )}
            <button className="close-button" onClick={closeModal}>
              닫기
            </button>
          </div>
        </div>
      )}

      <Nav className="nav" />
    </div>
  );
};

export default ProductList;
