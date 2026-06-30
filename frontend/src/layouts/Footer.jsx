import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-column">
            <h4>ShopEase</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>

          <div className="footer-column">
            <h4>Help</h4>
            <Link to="/orders">Track Order</Link>
            <Link to="/contact">Returns & Refunds</Link>
            <Link to="/contact">Shipping Info</Link>
            <Link to="/contact">FAQs</Link>
          </div>

          <div className="footer-column">
            <h4>Shop</h4>
            <Link to="/products">All Products</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/products?sort=new">New Arrivals</Link>
            <Link to="/products?sort=offers">Best Offers</Link>
          </div>

          <div className="footer-column">
            <h4>Account</h4>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/profile">My Profile</Link>
            <Link to="/wishlist">My Wishlist</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;