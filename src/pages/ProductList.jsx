import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../styles/ProductList.css"; // CSS 파일을 불러옴
import Nav from "../components/Nav";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const API_BASE_URL = "https://asyouwork.com:8443/api";
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

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

  const handlePurchaseClick = (product) => {
    // 구매 버튼 클릭 시 결제 페이지로 이동하고 상품 정보 전달
    navigate("/payment", { state: { product } });
  };

  return (
    <div>
      <IoIosArrowBack
        onClick={() => navigate("/")}
        className="arrow-back-black"
      />
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
                onClick={() => handlePurchaseClick(product)} // 구매 버튼 클릭 시 상품 정보 전달
              >
                구매
              </button>
            </div>
          ))
        ) : (
          <p>상품이 없습니다.</p>
        )}
      </div>

      <Nav className="nav" />
    </div>
  );
};

export default ProductList;
