import "./Header.css";

function Header() {
  return (
    <div className="top-header">
      <div className="container">
        <p>Free shipping on orders above ₹999</p>
        <div className="top-header-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/orders">Track Order</a>
        </div>
      </div>
    </div>
  );
}

export default Header;