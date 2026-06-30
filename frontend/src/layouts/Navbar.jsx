import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="navbar-logo">ShopEase</Link>

          <div className="navbar-search">
            <input type="search" placeholder="Search for products, brands and more" />
          </div>

          <div className="navbar-links">
            <Link to="/login" className="navbar-icon-link">
              <span>👤</span>
              <span>Login</span>
            </Link>
            <Link to="/wishlist" className="navbar-icon-link">
              <span>♡</span>
              <span>Wishlist</span>
            </Link>
            <Link to="/cart" className="navbar-icon-link">
              <span>🛒</span>
              <span>Cart</span>
              <span className="cart-badge">0</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="navbar-categories">
        <div className="container">
          <Link to="/categories">All Categories</Link>
          <Link to="/products?category=electronics">Electronics</Link>
          <Link to="/products?category=fashion">Fashion</Link>
          <Link to="/products?category=mobiles">Mobiles</Link>
          <Link to="/products?category=home">Home & Furniture</Link>
          <Link to="/products?category=beauty">Beauty</Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;