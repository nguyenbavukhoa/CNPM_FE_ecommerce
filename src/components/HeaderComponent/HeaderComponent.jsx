import logo from "../../assets/images/logo/logo_v1.jpeg";
import styles from "./HeaderComponent.module.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useCategory, useCategories } from "../../Hooks/useCategory";
// import { useCart } from "../../context/CartProvider";
// import { useAuth } from "../../context/AuthContext";

export default function HeaderComponent() {
  // 1. LẤY HÀM `getAmountCart` TỪ CONTEXT
  // const { openCart, getAmountCart } = useCart();
  // const { auth, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Gọi hàm để lấy tổng số lượng, nếu kết quả là null/undefined thì mặc định là 0
  // const totalAmount = getAmountCart() ?? 0;

  // Lấy thông tin về trang hiện tại
  const location = useLocation();

  // Thêm các đường dẫn bạn muốn ẩn HeaderBottom vào mảng này
  const hideHeaderBottomOnPaths = ["/order-history", "/checkout"];
  const isHeaderBottomVisible = !hideHeaderBottomOnPaths.includes(
    location.pathname
  );
  return (
    <>
      <header>
        {/* Header top */}
        <div className="header-top">
          <div className="container">
            <div className="header-top-left">
              <ul className="header-top-list">
                <li>
                  <a href="">
                    <i className="fa-regular fa-phone"></i> 0123 456 789 (miễn
                    phí)
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fa-light fa-location-dot"></i> Xem vị trí cửa
                    hàng
                  </a>
                </li>
              </ul>
            </div>
            <div className="header-top-right">
              <ul className="header-top-list">
                <li>
                  <a href="">Giới thiệu</a>
                </li>
                <li>
                  <a href="">Cửa hàng</a>
                </li>
                <li>
                  <a href="">Chính sách</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Header middle */}
        <div className="header-middle">
          <div className="container">
            {/* Logo */}
            <div className="header-middle-left">
              <div className={styles.headerLogo}>
                <a href="/">
                  <img src={logo} alt="" className={styles.headerLogoImg} />
                </a>
              </div>
            </div>

            {/* Search */}
            <div className="header-middle-center">
              <form action="" className="form-search">
                <span className="search-btn">
                  <i className="fa-light fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  className="form-search-input"
                  placeholder="Tìm kiếm món ăn..."
                />
                <button type="button" className="filter-btn">
                  <i className="fa-light fa-filter-list"></i>
                  <span>Lọc</span>
                </button>
              </form>
            </div>

            {/* Right menu */}
            <div className="header-middle-right">
              <ul className="header-middle-right-list">
                {/* User */}
                <li className="header-middle-right-item dropdown open">
                  <i className="fa-light fa-user"></i>
                  <div className="auth-container">
                    {/* {!isLoggedIn ? (
                      <>
                        <span className="text-dndk">Đăng nhập / Đăng ký</span>
                        <span className="text-tk">
                          Tài khoản{" "}
                          <i className="fa-sharp fa-solid fa-caret-down"></i>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-dndk">Tài khoản</span>
                        <span className="text-tk">
                          {auth.accountName}{" "}
                          <i className="fa-sharp fa-solid fa-caret-down"></i>
                        </span>
                      </>
                    )} */}
                  </div>
                  {/* <ul className="header-middle-right-menu">
                    {!isLoggedIn ? (
                      <>
                        <li>
                          <Link id="login" to="/auth?action=login">
                            <i className="fa-light fa-right-to-bracket"></i>{" "}
                            Đăng nhập
                          </Link>
                        </li>
                        <li>
                          <Link id="signup" to="/auth?action=register">
                            <i className="fa-light fa-user-plus"></i> Đăng ký
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <a href="/user-info">
                            <i className="fa-light fa-circle-user"></i> Tài
                            khoản của tôi
                          </a>
                        </li>
                        <li>
                          <a href="/order-history">
                            <i className="fa-regular fa-bags-shopping"></i> Đơn
                            hàng đã mua
                          </a>
                        </li>
                        <li className="border">
                          <a
                            id="logout"
                            href="javascript:;"
                            onClick={(e) => {
                              e.preventDefault(); // chặn reload
                              logout();
                              navigate("/");
                            }}
                          >
                            <i className="fa-light fa-right-from-bracket"></i>{" "}
                            Thoát tài khoản
                          </a>
                        </li>
                      </>
                    )}
                  </ul> */}
                </li>

                {/* Cart */}
                {/* <li
                  className="header-middle-right-item open"
                  onClick={openCart}
                >
                  <div className="cart-icon-menu">
                    <i className="fa-light fa-basket-shopping"></i> */}
                {/* Hiển thị số lượng một cách an toàn */}
                {/* <span className="count-product-cart">{totalAmount}</span>
                  </div>
                  <span>Giỏ hàng</span>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </header>
      {isHeaderBottomVisible && <HeaderBottom />}
    </>
  );
}

function HeaderBottom() {
  const [selectedCategory, showCategory] = useCategory();
  const { data: categories = [] } = useCategories(); // mặc định mảng rỗng
  const location = useLocation();
  const navigate = useNavigate();

  const handleCategoryChange = (e, cat) => {
    e.preventDefault();
    showCategory(cat);

    if (location.pathname === "/") {
      document
        .getElementById("home-service")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/`);
    }
  };

  return (
    <nav className="header-bottom">
      <div className="container">
        <ul className="menu-list">
          <li className="menu-list-item">
            <a
              href="/products?category=all"
              className={`menu-link ${
                selectedCategory === "all" ? "active" : ""
              }`}
              onClick={(e) => handleCategoryChange(e, "all")}
            >
              Trang chủ
            </a>
          </li>

          {categories.map((cat) => (
            <li key={cat.id} className="menu-list-item">
              <a
                href={`/products?category=${cat.name}`}
                className={`menu-link ${
                  selectedCategory === cat.id ? "active" : ""
                }`}
                onClick={(e) => handleCategoryChange(e, cat.id)}
              >
                {cat.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
