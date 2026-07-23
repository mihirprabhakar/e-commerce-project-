import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import orderService from "../../services/order.service";
import "./Orders.css";

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      const response = await orderService.cancelOrder(orderId);
      if (response.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { ...order, status: "cancelled" }
              : order
          )
        );
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel order");
    }
  };

  const formatPrice = (price) => {
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

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

  if (loading) {
    return (
      <div className="orders-page">
        <div className="loader-wrapper">
          <p>Loading orders</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="error-message"><p>{error}</p></div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 && (
        <div className="empty-orders">
          <p>🛍️ You have not placed any orders yet</p>
          <Link to="/products" className="shop-now-btn">
            Start Shopping
          </Link>
        </div>
      )}

      {orders.length > 0 && (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>

              {/* Order Header */}
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

              {/* Order Items */}
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

              {/* Order Footer */}
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
                  {/* Navigate to separate order details page */}
                  <button
                    className="btn-view-details"
                    onClick={() => navigate(`/orders/${order._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;