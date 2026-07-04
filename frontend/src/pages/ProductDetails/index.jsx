import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../../services/product.service";
import "./ProductDetails.css";

function ProductDetails() {
  
  const { id }=useParams();
  const navigate=useNavigate();

  const [product,setProduct]=useState(null);
  const [loading,setLoading]=useState(true);
  const [addedCart,setAddedCart]=useState(false);
  const [error,setError]=useState("");
  const [cartMessage, setCartMessage] = useState("");

  // get prod by id when page loads
  useEffect(()=>{
    const fetchProduct=async ()=>{
      setLoading(true);
      try{
        const response=await productService.getProductById(id);
        if(response.success){
          setProduct(response.data);
        }
      }catch(err){
        setError("Product not found or failed to load.");
      }finally{
        setLoading(false);
      }
    };
    fetchProduct();
  },[id]);

  // get final price after discnt
  const getFinalPrice=()=>{
    if(!product) return 0;
    if (product.discount>0){
      return product.price-(product.price*product.discount)/100;
    }
    return product.price;
  };

  // fromat price in rupees with commas
  const formatPrice=(price)=>{
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  const addToCart = () => {
    if (addedCart) {
      setCartMessage("removed");
    } else {
      setCartMessage("added");
    }
    setAddedCart(!addedCart);
  };

  // loading state
  if(loading){
    return(
      <div className="product-details-page">
        <div className="loader-wrapper">
          <p>loading product </p>
        </div>
      </div>
    );
  }

  // error state
  if (error) {
    return (
      <div className="product-details-page">
        <div className="error-message">
          <p>{error}</p>
          <button className="back-btn" onClick={() => navigate("/products")}>
            ← Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details-page">

      {/* back btn */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {product && (
        <div className="product-details-card">
        {/* prod img */}
        <div className="product-details-image">
            📦
        </div>

        {/* prod info */}
        <div className="product-details-info">
          {/* {console.log(product.categoryId)} */}
          {product.categoryId&&(
            <span className="product-details-category">
                  {product.categoryId.name}
            </span>

          )}

          {/* prod name */}

          <h1 className="product-details-name">{product.name}</h1>

          {/* price */}
          <div className="product-details-price-row">
            <span className="product-details-price">
              {formatPrice(getFinalPrice())}
            </span>
            {product.discount>0&&(
              <>
                <span className="product-details-original-price">
                  {formatPrice(product.price)}
                </span>

                <span className="product-details-discount">
                  {product.discount} % off
                </span>

              </>
            )}
            

          </div>

          <hr className="product-details-divider" />
          {/* description */}


          {product.description&&(
            <p className="product-details-description">
              {product.description}
            </p> 
          )}


          <hr className="product-details-divider" />


          {/* product meta */}
          <div className="product-details-meta">
              <div className="product-details-meta-row">
                <span className="meta-label">Availability</span>
                <span className={`meta-value ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
                </span>
              </div>


              {product.vendorId && (
                <div className="product-details-meta-row">
                  <span className="meta-label">Vendor</span>
                  <span className="meta-value">{product.vendorId.name}</span>
                </div>
              )}


              {product.tax > 0 && (
                <div className="product-details-meta-row">
                  <span className="meta-label">Tax</span>
                  <span className="meta-value">{product.tax}%</span>
                </div>
              )}


              <div className="product-details-meta-row">
                <span className="meta-label">SKU</span>
                <span className="meta-value">{product.slug}</span>
              </div>
            </div>


            <hr className="product-details-divider" />
 


            {/* Action Buttons */}
            <div className="product-details-actions">
              <button
                className={`btn-add-cart ${addedCart ? "btn-remove-cart" : ""}`}
                disabled={product.stock === 0}
                onClick={addToCart}
              >
                {product.stock === 0 ? "Out of Stock" :addedCart?"Remove from cart": "Add to Cart"}
              </button>
              <button className="btn-wishlist"><i className="fa-solid fa-heart"></i>Wishlist</button>
            </div>
            {/* {addedCart&&(
            <p style={{color:"green"}}>Added to Cart</p> */}
            {/* )} */}
            {cartMessage === "added" && (
              <p style={{ color: "green" }}> Added to Cart</p>
            )}
            {cartMessage === "removed" && (
              <p style={{ color: "red" }}> Removed from Cart</p>
            )}
            
          
          </div>
          

          
        </div>
      )}
    </div>
  );
}

export default ProductDetails;