import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartService from "../../services/cart.service";
import orderService from "../../services/order.service";
import "./Checkout.css";

function Checkout(){
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [apiError, setApiError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({});

  // Fetch cart on load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await cartService.getCart();
        if (response.success) {
          setCart(response.data);
          if (!response.data || response.data.items.length === 0) {
            navigate("/cart");
          }
        }
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setApiError("");
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!address.name.trim()) newErrors.name = "Name is required";
    if (!address.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[6-9][0-9]{9}$/.test(address.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (!address.address.trim()) newErrors.address = "Address is required";
    if (!address.city.trim()) newErrors.city = "City is required";
    if (!address.state.trim()) newErrors.state = "State is required";
    if (!address.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^[1-9][0-9]{5}$/.test(address.pincode)) {
      newErrors.pincode = "Invalid pincode";
    }
    return newErrors;
  };

  // Handle place order
  const handlePlaceOrder = async () => {
    setApiError("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setPlacing(true);
    try {
      const response = await orderService.placeOrder({
        shippingAddress: address,
        paymentMethod
      });

      if (response.success) {
        setOrderSuccess(true);
        setOrderId(response.data._id);
      }
    } catch (err) {
      setApiError(
        err.response?.data?.message || "Failed to place order. Please try again."
      );
    } finally {
      setPlacing(false);
    }
  };

  // Format price
  const formatPrice = (price) => {
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="checkout-page">
        <div className="loader-wrapper">
          <p>Loading checkout...</p>
        </div>
      </div>
    );
  }

  // Order success screen
  if (orderSuccess) {
    return (
      <div className="checkout-page">
        <div className="order-success">
          <div className="success-icon"><i className="fa-solid fa-check"></i></div>
          <h2>Order Placed Successfully!</h2>
          <p>Your order has been placed and is being processed.</p>
          <p style={{ fontWeight: 600, color: "var(--color-text)" }}>
            Order ID: {orderId}
          </p>
          <div className="order-success-actions">
            <Link to="/orders" className="btn-primary">
              View My Orders
            </Link>
            <Link to="/products" className="btn-outline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">

        {/* Left — Shipping and Payment */}
        <div>

          {/* Shipping Address Form */}
          <div className="shipping-form">
            <h2>Shipping Address</h2>

            {apiError && <div className="error-banner">{apiError}</div>}

            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={address.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={errors.name ? "error-input" : ""}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="text"
                  name="phone"
                  value={address.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className={errors.phone ? "error-input" : ""}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={address.address}
                onChange={handleChange}
                placeholder="Street address, apartment, etc."
                className={errors.address ? "error-input" : ""}
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  placeholder="Mumbai"
                  className={errors.city ? "error-input" : ""}
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label>State *</label>
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                  placeholder="Maharashtra"
                  className={errors.state ? "error-input" : ""}
                />
                {errors.state && <span className="error-text">{errors.state}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Pincode *</label>
              <input
                type="text"
                name="pincode"
                value={address.pincode}
                onChange={handleChange}
                placeholder="400001"
                className={errors.pincode ? "error-input" : ""}
              />
              {errors.pincode && <span className="error-text">{errors.pincode}</span>}
            </div>
          </div>

          {/* Payment Method */}
          <div className="payment-section">
            <h2>Payment Method</h2>
            <div className="payment-options">
              <div
                className={`payment-option ${paymentMethod === "cod" ? "selected" : ""}`}
                onClick={() => setPaymentMethod("cod")}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <div>
                  <div className="payment-option-label"><i className="fa-brands fa-cash-app"></i> Cash on Delivery</div>
                  <div className="payment-option-desc">Pay when your order arrives</div>
                </div>
              </div>
              <div
                className={`payment-option ${paymentMethod === "online" ? "selected" : ""}`}
                onClick={() => setPaymentMethod("online")}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                <div>
                  <div className="payment-option-label"><i className="fa-regular fa-credit-card"></i> Online Payment</div>
                  <div className="payment-option-desc">Pay now via UPI, Card or Net Banking</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right — Order Summary */}
        {cart && (
          <div className="checkout-summary">
            <h2>Order Summary</h2>

            {/* Items List */}
            {cart.items.map((item) => (
              <div className="checkout-item-row" key={item.productId}>
                <span className="checkout-item-name">{item.name}</span>
                <span className="checkout-item-qty">x{item.quantity}</span>
                <span className="checkout-item-price">
                  {formatPrice(item.finalPrice * item.quantity)}
                </span>
              </div>
            ))}

            <hr className="summary-divider" />

            <div className="summary-row">
              <span>Items ({cart.totalItems})</span>
              <span>{formatPrice(cart.totalPrice)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span style={{ color: "var(--color-success)" }}>FREE</span>
            </div>
            <div className="summary-row">
              <span>Payment</span>
              <span>{paymentMethod === "cod" ? "Cash on Delivery" : "Online"}</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(cart.totalPrice)}</span>
            </div>

            <button
              className="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={placing}
            >
              {placing ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Checkout;