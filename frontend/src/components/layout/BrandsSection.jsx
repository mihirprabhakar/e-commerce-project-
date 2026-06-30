import "./BrandsSection.css";

const brands = [
  "Nike", "Adidas", "Samsung", "Apple", "Sony", "Puma"
];

function BrandsSection() {
  return (
    <section className="brands-section">
      <div className="section-header">
        <h2>Top Brands</h2>
      </div>

      <div className="brands-grid">
        {brands.map((brand, index) => (
          <div className="brand-card" key={index}>
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
}

export default BrandsSection;