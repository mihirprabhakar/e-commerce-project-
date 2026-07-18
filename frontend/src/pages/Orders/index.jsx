import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import orderService from "../../services/order.service";
import "./Orders.css";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orderService.getMyOrders();
      if (response.success) {
        setOrders(response.data);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Failed to load orders. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // handle cancel order
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      const response = await orderService.cancelOrder(orderId);
      if (response.success) {
        // Update order status in state
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { ...order, status: "cancelled" }
              : order
          )
        );
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder((prev) => ({ ...prev, status: "cancelled" }));
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel order");
    }
  };

  // format price
  const formatPrice = (price) => {
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  // format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  // get status badge class
  const getStatusClass = (status) => {
    const classes = {
      pending: "status-pending",
      confirmed: "status-confirmed",
      processing: "status-processing",
      shipped: "status-shipped",
      delivered: "status-delivered",
      cancelled: "status-cancelled"
    };
    return classes[status] || "status-pending";
  };

  // loading state
  if (loading) {
    return (
      <div className="orders-page">
        <div className="loader-wrapper">
          <p>Loading orders</p>
        </div>
      </div>
    );
  }

  // error state
  if (error) {
    return (
      <div className="orders-page">
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {/* empty state */}
      {orders.length === 0 && (
        <div className="empty-orders">
          <p>🛍️ You have not placed any orders yet</p>
          <Link to="/products" className="shop-now-btn">
            Start Shopping
          </Link>
        </div>
      )}

      {/* orders list */}
      {orders.length > 0 && (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>

              {/* order header */}
              <div className="order-card-header">
                <div className="order-id">
                  Order ID: <span>#{order._id.slice(-8).toUpperCase()}</span>
                </div>
                <div className="order-date">
                  Placed on {formatDate(order.createdAt)}
                </div>
                <span className={`order-status-badge ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* order items */}
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div className="order-item-row" key={index}>
                    <div className="order-item-image">📦</div>
                    <div className="order-item-details">
                      <div className="order-item-name">{item.name}</div>
                      <div className="order-item-meta">
                        {formatPrice(item.finalPrice)} × {item.quantity}
                        {item.discount > 0 && ` — ${item.discount}% off`}
                      </div>
                    </div>
                    <div className="order-item-total">
                      {formatPrice(item.finalPrice * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* order footer */}
              <div className="order-card-footer">
                <div className="order-summary-info">
                  <div className="order-total">
                    Total: {formatPrice(order.totalPrice)}
                  </div>
                  <div className="order-payment">
                    Payment: {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"} —{" "}
                    <span style={{
                      color: order.paymentStatus === "paid"
                        ? "var(--color-success)"
                        : "var(--color-warning)"
                    }}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="order-actions">
                  {order.status === "pending" && (
                    <button
                      className="btn-cancel-order"
                      onClick={() => handleCancelOrder(order._id)}
                    >
                      Cancel Order
                    </button>
                  )}
                  <button
                    className="btn-view-details"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View Details
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* order detail Modal */}
      {selectedOrder && (
        <div className="order-detail-modal" onClick={() => setSelectedOrder(null)}>
          <div className="order-detail-content" onClick={(e) => e.stopPropagation()}>

            <div className="order-detail-header">
              <h2>Order Details</h2>
              <button className="close-btn" onClick={() => setSelectedOrder(null)}>✕</button>
            </div>

            {/* Order Info */}
            <div className="detail-section">
              <h3>Order Info</h3>
              <div className="detail-row">
                <span className="detail-label">Order ID</span>
                <span className="detail-value">#{selectedOrder._id.slice(-8).toUpperCase()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date</span>
                <span className="detail-value">{formatDate(selectedOrder.createdAt)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status</span>
                <span className={`order-status-badge ${getStatusClass(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Payment Method</span>
                <span className="detail-value">
                  {selectedOrder.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Payment Status</span>
                <span className="detail-value">{selectedOrder.paymentStatus}</span>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="detail-section">
              <h3>Shipping Address</h3>
              <div className="detail-row">
                <span className="detail-label">Name</span>
                <span className="detail-value">{selectedOrder.shippingAddress.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{selectedOrder.shippingAddress.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Address</span>
                <span className="detail-value">{selectedOrder.shippingAddress.address}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">City</span>
                <span className="detail-value">{selectedOrder.shippingAddress.city}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">State</span>
                <span className="detail-value">{selectedOrder.shippingAddress.state}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Pincode</span>
                <span className="detail-value">{selectedOrder.shippingAddress.pincode}</span>
              </div>
            </div>

            {/* Items */}
            <div className="detail-section">
              <h3>Items Ordered</h3>
              {selectedOrder.items.map((item, index) => (
                <div className="detail-row" key={index}>
                  <span className="detail-label">{item.name} × {item.quantity}</span>
                  <span className="detail-value">{formatPrice(item.finalPrice * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="detail-section">
              <h3>Price Summary</h3>
              <div className="detail-row">
                <span className="detail-label">Total Items</span>
                <span className="detail-value">{selectedOrder.totalItems}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Delivery</span>
                <span className="detail-value" style={{ color: "var(--color-success)" }}>FREE</span>
              </div>
              <div className="detail-row" style={{ fontWeight: 700, fontSize: "var(--font-md)" }}>
                <span className="detail-label">Total Amount</span>
                <span className="detail-value">{formatPrice(selectedOrder.totalPrice)}</span>
              </div>
            </div>

            {/* Cancel button in modal */}
            {selectedOrder.status === "pending" && (
              <button
                className="btn-cancel-order"
                style={{ width: "100%" }}
                onClick={() => handleCancelOrder(selectedOrder._id)}
              >
                Cancel Order
              </button>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default Orders;