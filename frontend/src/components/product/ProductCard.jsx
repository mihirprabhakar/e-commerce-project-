import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  const finalPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  return (
    <Link to={`/products/${product._id}`} className="product-card">
      <div className="product-image"><i className="fa-solid fa-box"></i></div>
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-price-row">
          <span className="product-price">₹{finalPrice.toLocaleString("en-IN")}</span>
          {product.discount > 0 && (
            <>
              <span className="product-original-price">₹{product.price.toLocaleString("en-IN")}</span>
              <span className="product-discount">{product.discount}% off</span>
            </>
          )}
        </div>
        <div className={`product-stock ${product.stock === 0 ? "product-out-of-stock" : ""}`}>
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;