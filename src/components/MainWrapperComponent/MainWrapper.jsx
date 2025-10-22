import React, { useState, useEffect } from "react";
import { useCategory } from "../../Hooks/useCategory";
import { useProducts } from "../../Hooks/useProducts";

import banner2 from "../../assets/images/banner-2.png";
import banner3 from "../../assets/images/banner-3.png";
import banner4 from "../../assets/images/banner-4.png";
import banner5 from "../../assets/images/banner-5.png";

import ProductList from "../ProductComponent/ProductListComponent/ProductListComponent";

const banners = [banner2, banner3, banner4, banner5];
export default function MainComponent({ onProductDetail }) {
  const [current, setCurrent] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Get the selected category from the context
  const [selectedCategory] = useCategory();

  // Sử dụng useProducts với selectedCategory
  const { data, isLoading, error } = useProducts(selectedCategory, currentPage);

  const { products, totalPages } = data || { products: [] };

  // Mỗi khi category thay đổi => reset về page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000); // đổi sau 1 giây
    return () => clearInterval(interval);
  }, [banners.length]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <main className="main-wrapper">
      <div className="container" id="trangchu">
        <div className="home-slider">
          <img
            src={banners[current]}
            alt={`banner-${current + 2}`}
            className="w-full rounded-lg transition-all duration-700"
          />
        </div>

        <div className="home-service" id="home-service">
          <div className="home-service-item">
            <div className="home-service-item-icon">
              <i className="fa-light fa-person-carry-box"></i>
            </div>
            <div className="home-service-item-content">
              <h4 className="home-service-item-content-h">GIAO HÀNG NHANH</h4>
              <p className="home-service-item-content-desc">
                Cho tất cả đơn hàng
              </p>
            </div>
          </div>

          <div className="home-service-item">
            <div className="home-service-item-icon">
              <i className="fa-light fa-shield-heart"></i>
            </div>
            <div className="home-service-item-content">
              <h4 className="home-service-item-content-h">SẢN PHẨM AN TOÀN</h4>
              <p className="home-service-item-content-desc">
                Cam kết chất lượng
              </p>
            </div>
          </div>

          <div className="home-service-item">
            <div className="home-service-item-icon">
              <i className="fa-light fa-headset"></i>
            </div>
            <div className="home-service-item-content">
              <h4 className="home-service-item-content-h">HỖ TRỢ 24/7</h4>
              <p className="home-service-item-content-desc">
                Tất cả ngày trong tuần
              </p>
            </div>
          </div>

          <div className="home-service-item">
            <div className="home-service-item-icon">
              <i className="fa-light fa-circle-dollar"></i>
            </div>
            <div className="home-service-item-content">
              <h4 className="home-service-item-content-h">HOÀN LẠI TIỀN</h4>
              <p className="home-service-item-content-desc">
                Nếu không hài lòng
              </p>
            </div>
          </div>
        </div>
        <ProductList products={products} onProductDetail={onProductDetail} />

        <div className="page-nav">
          <ul className="page-nav-list">
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-nav-item ${
                  currentPage === i + 1 ? "active" : ""
                }`}
              >
                <a
                  href="#!"
                  onClick={() => {
                    setCurrentPage(i + 1);
                    document
                      .getElementById("home-service")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {i + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
