import { useEffect, useState } from "react";
import productService from "../../services/product.service";
import ProductCard from "../../components/product/ProductCard";
import "./Products.css";

const ITEMS_PER_PAGE=8;


function Products() {
  const [products,setProducts]=useState([]);
  const [totalPages,setTotalPages]=useState(1);
  const [totalProducts,setTotalProducts]=useState(0);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [search,setSearch]=useState("");
  const [sortBy,setSortBy]=useState("createdAt");
  const [sortOrder,setSortOrder]=useState("desc");
  const [currentPage,setCurrentPage]=useState(1);

  // fetch the products from backend with parames
  const fetchProducts=async(page,searchValue,sort,order)=>{
    setLoading(true);
    setError("");
    try {
      const response=await productService.getAllProducts(page,ITEMS_PER_PAGE,searchValue,sort,order);
      if(response.success){
        setProducts(response.data);
        setTotalPages(response.pagination.totalPages);
        setTotalProducts(response.pagination.total);
      }
    }
    catch (err){
      setError("Failed to load products please try again");
    }
    finally{
      setLoading(false);
    }
  };

 
  useEffect(() => {
    fetchProducts(currentPage, search, sortBy, sortOrder);
  },[currentPage,sortBy,sortOrder]);

 // if serach changes rerender the code
  useEffect(() => {
      setCurrentPage(1);
      fetchProducts(1, search, sortBy, sortOrder);
  },[search]);

  
  const handleSortChange=(e)=>{
    const value=e.target.value;
    if(value==="price-low"){
      setSortBy("price");
      setSortOrder("asc"); 
    }
    else if(value==="price-high")
    { setSortBy("price");
      setSortOrder("desc");
    }
    else if(value==="name-az")
    { 
      setSortBy("name");
      setSortOrder("asc");
    }
    else if(value==="name-za")
    {
      setSortBy("name");
      setSortOrder("desc");
    }
    else if(value==="discount")
    {
      setSortBy("discount");
      setSortOrder("desc");
    }
    else
    {
      setSortBy("createdAt");
      setSortOrder("desc"); 
    }
    setCurrentPage(1);
  };

 
  const handlePageChange=(page)=>{
    setCurrentPage(page);
    console.log("scrolling...");
    window.scrollTo({ top: 0, behavior: "smooth" });// smooth animaltion
  };
  const handleSearchChange=(e)=>{
    setSearch(e.target.value);
  };

  const startIndex=(currentPage-1)*ITEMS_PER_PAGE;//pages have 1 index 

  return (
    <div className="products-page">

      {/* heading and product count */}
      <div className="products-page-header">
        <h1>All Products</h1>
        <span className="products-count">
          {totalProducts} products found
        </span>
      </div>

      {/* search and sort */}
      <div className="products-toolbar">
        <div className="products-search">
          <input type="search" placeholder="search products " value={search} onChange={handleSearchChange}/>
        </div>
        <div className="products-sort">
          <select onChange={handleSortChange}>
            <option value="default">Sort By</option>
            <option value="price-low">Price - Low to High</option>
            <option value="price-high">Price - High to Low</option>
            <option value="name-az">Name - A to Z</option>
            <option value="name-za">Name - Z to A</option>
            <option value="discount">Highest Discount</option>
          </select>
        </div>
      </div>

      {/* loading state */}
      {loading&&(
        <div className="loader-wrapper">
          <p>loading products</p>
        </div>
      )}

      {/* error state */}
      {!loading&&error&&(
        <div className="error-message">{error}</div>
      )}

      {/*empty state */}
      {!loading&&!error&&products.length===0&&(
        <div className="loader-wrapper">
          <p>no products found </p>
        </div>
      )}

      {/* products box */}
      {!loading&&!error&&products.length>0&&(
        <div className="products-page-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* pagination */}
      {!loading && !error && totalPages > 1 && (
        <>
          <div className="pagination">

            {/* previous btn */}
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage-1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {/* page number buttons */}
            {Array.from({ length: totalPages }, (value, i) => i+1).map((page) => (
              <button key={page} className={`pagination-btn ${currentPage===page?"active":""}`} onClick={() => handlePageChange(page)}>
                {page}
              </button>
            ))}

            {/* next btn */}
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage+1)}
              disabled={currentPage===totalPages}
            >
              Next
            </button>

          </div>

          {/* Pagination info */}
          <div className="pagination-info">
            Showing {startIndex+1} to {Math.min(startIndex+ITEMS_PER_PAGE,totalProducts)} of {totalProducts} products
          </div>
        </>
      )}

    </div>
  );
}

export default Products;