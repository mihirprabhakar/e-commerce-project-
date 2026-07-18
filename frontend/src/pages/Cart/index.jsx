import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartService from "../../services/cart.service";
import "./Cart.css";

function Cart() {
  const navigate=useNavigate();
  const [cart,setCart] = useState(null);
  const [loading,setLoading] = useState(true);

  // Error message
  const [error, setError] = useState("");

  // Fetch cart on page load
  useEffect(() => {
    const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await cartService.getCart();
      if (response.success) {
        setCart(response.data);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Failed to load cart. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
    fetchCart();
  }, []);

  // const fetchCart = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await cartService.getCart();
  //     if (response.success) {
  //       setCart(response.data);
  //     }
  //   } catch (err) {
  //     if (err.response?.status === 401) {
  //       navigate("/login");
  //     } else {
  //       setError("Failed to load cart. Please try again.");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Handle quantity update
  const handleQuantityUpdate = async (productId, newQuantity) => {
    try {
      const response = await cartService.updateCartItem(productId, newQuantity);
      if (response.success) {
        setCart(response.data);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update quantity");
    }
  };

  // Handle remove item
  const handleRemove = async (productId) => {
    try {
      const response = await cartService.removeFromCart(productId);
      if (response.success) {
        setCart(response.data);
      }
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  // Handle clear cart
  const handleClearCart = async () => {
    if (!window.confirm("Are you sure you want to clear the cart?")) return;
    try {
      const response = await cartService.clearCart();
      if (response.success) {
        setCart(response.data);
      }
    } catch (err) {
      alert("Failed to clear cart");
    }
  };

  // Format price
  const formatPrice = (price) => {
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="cart-page">
        <div className="loader-wrapper">
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="cart-page">
        <div className="loader-wrapper">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Empty cart
  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-page">
        <h1>My Cart</h1>
        <div className="empty-cart">
          <p><i className="fa-solid fa-cart-shopping"></i> Your cart is empty</p>
          <Link to="/products" className="shop-now-btn">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>My Cart ({cart.totalItems} items)</h1>

      <div className="cart-layout">

        {/* Cart Items */}
        <div className="cart-items">
          {cart.items.map((item) => (
            <div className="cart-item-card" key={item.productId}>

              {/* Image */}
              <div className="cart-item-image">📦</div>

              {/* Info */}
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>

                {/* Price */}
                <div className="cart-item-price-row">
                  <span className="cart-item-final-price">
                    {formatPrice(item.finalPrice)}
                  </span>
                  {item.discount > 0 && (
                    <>
                      <span className="cart-item-original-price">
                        {formatPrice(item.price)}
                      </span>
                      <span className="cart-item-discount">
                        {item.discount}% off
                      </span>
                    </>
                  )}
                </div>

                {/* Quantity and Remove */}
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button
                      className="qty-btn"
                      onClick={() => handleQuantityUpdate(item.productId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => handleQuantityUpdate(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Item Total */}
              <div style={{ fontWeight: 700, fontSize: "var(--font-lg)", minWidth: 80, textAlign: "right" }}>
                {formatPrice(item.finalPrice * item.quantity)}
              </div>

            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items ({cart.totalItems})</span>
            <span>{formatPrice(cart.totalPrice)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span style={{ color: "var(--color-success)" }}>FREE</span>
          </div>

          <div className="summary-row total">
            <span>Total Amount</span>
            <span>{formatPrice(cart.totalPrice)}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>

          <button
            className="clear-cart-btn"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default Cart;