import Banner from "../../components/layout/Banner";
import CategorySection from "../../components/layout/CategorySection";
import ProductsSection from "../../components/layout/ProductsSection";
import BrandsSection from "../../components/layout/BrandsSection";

function Home() {
  return (
    <div className="container">
      <Banner />
      <CategorySection />
      <ProductsSection />
      <BrandsSection />
    </div>
  );
}

export default Home;