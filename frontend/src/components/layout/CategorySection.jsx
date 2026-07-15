import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import categoryService from "../../services/category.service";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";
import "./CategorySection.css";

function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAllCategories();
        if (response.success) {
          setCategories(response.data);
        }
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="category-section">
      <div className="section-header">
        <h2>Shop by Category</h2>
        <Link to="/categories">View All</Link>
      </div>

      {error && <p>{error}</p>}

      {!error && categories.length === 0 && (
        <EmptyState message="No categories available" />
      )}

      {!error && categories.length > 0 && (
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              to={`/products?category=${category._id}`}
              key={category._id}
              className="category-card"
            >
              <div className="category-icon"><i className="fa-solid fa-tag"></i></div>
              <div className="category-name">{category.name}</div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default CategorySection;