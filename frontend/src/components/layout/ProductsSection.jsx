import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productService from "../../services/product.service";
import ProductCard from "../product/ProductCard";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import "./ProductsSection.css";

function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAllProducts();
        if (response.success) {
          setProducts(response.data.slice(0, 10)); // show first 10 on home page
        }
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="products-section">
      <div className="section-header">
        <h2>Featured Products</h2>
        <Link to="/products">View All</Link>
      </div>

      {error && <p>{error}</p>}

      {!error && products.length === 0 && (
        <EmptyState message="No products available" />
      )}

      {!error && products.length > 0 && (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductsSection;