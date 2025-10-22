// src/components/ProductDetailsComponent/ProductDetailsComponent.jsx
import React, { useState, useEffect, useCallback } from "react";
import { vnd } from "../../../utils/vnd"; // Hàm format tiền tệ
// import { useCart } from "../../../context/CartProvider";
import ImageWithFallback from "../../ImageWithFallbackComponent/ImageWithFallback";
import VariantOptions from "../../VariantOptionComponent/VariantOptions";
import useProductDetail from "../../../Hooks/useProductDetail";

const ProductDetailsComponent = ({
  productId,
  onClose,
  onAddToCart,
  onOrderNow,
}) => {
  const { product, loading, error } = useProductDetail(productId);
  //const { addItemToCart, openCart } = useCart(); // 👈 Lấy hàm addItemToCart từ context
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [optionsPrice, setOptionsPrice] = useState(0);

  // State mới để lưu mảng các ID của tùy chọn
  const [selectedValueIds, setSelectedValueIds] = useState([]);

  // Cập nhật hàm callback để nhận cả mảng ID
  const handleSelectionChange = useCallback(
    (selection, priceOfOptions, ids) => {
      // Các hàm set state từ useState được React đảm bảo là ổn định
      // và không cần đưa vào dependency array của useCallback.
      setOptionsPrice(priceOfOptions);
      setSelectedValueIds(ids);
    },
    []
  ); // Dependency array rỗng vì hàm này không phụ thuộc vào props hay state nào khác;

  useEffect(() => {
    if (product) {
      const finalPrice = (product.basePrice + optionsPrice) * quantity;
      setTotalPrice(finalPrice);
    }
  }, [quantity, optionsPrice, product]);

  const handleIncrease = () => {
    if (quantity < 100) setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  // Hàm xử lý khi nhấn nút "Thêm vào giỏ hàng"
  const handleAddToCart = async () => {
    const cartItemData = {
      productId: product.id.toString(),
      optionValueId: selectedValueIds,
      quantity: quantity.toString(),
      note: note,
    };

    //await addItemToCart(cartItemData);
    // Tùy chọn: hiển thị thông báo thành công, sau đó mở giỏ hàng
    alert("Đã thêm vào giỏ hàng!");
    //openCart();
    onClose(); // Đóng modal chi tiết sản phẩm
  };

  if (loading) return <div>Đang tải sản phẩm...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!product) return null;

  return (
    <>
      <div className="modal-header">
        <ImageWithFallback
          className="product-image"
          src={product.imgUrl}
          alt={product.name}
        />
      </div>
      <div className="modal-body">
        <h2 className="product-title">{product.name}</h2>
        <div className="product-control">
          <div className="priceBox">
            <span className="current-price">{vnd(product.basePrice)}</span>
          </div>
          <div className="buttons_added">
            <input
              className="minus is-form"
              type="button"
              value="-"
              onClick={handleDecrease}
            />
            <input
              className="input-qty"
              max="100"
              min="1"
              type="number"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val >= 1 && val <= 100) setQuantity(val);
              }}
            />
            <input
              className="plus is-form"
              type="button"
              value="+"
              onClick={handleIncrease}
            />
          </div>
        </div>
        <p className="product-description">{product.description}</p>
      </div>
      <div className="modal-variants">
        {/* Cập nhật VariantOptions để truyền callback mới */}
        <VariantOptions
          optionGroups={product.optionGroups}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <div className="notebox">
        <p className="notebox-title">Ghi chú</p>
        <textarea
          className="text-note"
          placeholder="Nhập thông tin cần lưu ý..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      <div className="modal-footer">
        <div className="price-total">
          <span className="thanhtien">Thành tiền</span>
          <span className="price">{vnd(totalPrice)}</span>
        </div>
        <div className="modal-footer-control">
          {/*Chưa xử lý BE xong*/}
          {/* <button
            className="button-dathangngay"
            onClick={() =>
              onOrderNow({
                productId,
                quantity,
                note,
                selections: currentSelection,
              })
            }
          >
            Đặt hàng ngay
          </button> */}
          <button className="button-dat" onClick={handleAddToCart}>
            <i className="fa-light fa-basket-shopping"></i> Thêm vào giỏ
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsComponent;
