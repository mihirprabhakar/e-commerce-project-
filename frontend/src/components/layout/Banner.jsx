import "./Banner.css";

function Banner() {
  return (
    <div className="banner">
      <div className="banner-content">
        <h2>Big Summer Sale</h2>
        <p>Up to 70% off on top brands. Limited time offer.</p>
        <button className="banner-btn">Shop Now</button>
      </div>
      <div className="banner-emoji"><i className="fa-solid fa-cart-flatbed-suitcase"></i></div>
    </div>
  );
}

export default Banner;