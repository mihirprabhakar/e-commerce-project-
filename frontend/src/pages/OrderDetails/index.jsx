import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import orderService from "../../services/order.service";
import "./OrderDetails.css";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const response = await orderService.getOrderById(id);
      if (response.success) {
        setOrder(response.data);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Order not found or failed to load.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      const response = await orderService.cancelOrder(id);
      if (response.success) {
        setOrder((prev) => ({ ...prev, status: "cancelled" }));
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel order");
    }
  };

  // Generate and download invoice as PDF
  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    const formatPrice = (price) => `Rs. ${Number(price).toLocaleString("en-IN")}`;
    const formatDate = (date) =>
      new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });

    // Colors
    const primaryColor = [37, 99, 235];
    const lightGray = [245, 247, 250];
    const darkText = [30, 41, 59];
    const grayText = [100, 116, 139];

    // Header background
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, "F");

    // Company name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("ShopEase", 14, 18);

    // Invoice label
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("TAX INVOICE", 14, 28);

    // Order ID on right
    doc.setFontSize(10);
    doc.text(`Order ID: #${order._id.slice(-8).toUpperCase()}`, 140, 18);
    doc.text(`Date: ${formatDate(order.createdAt)}`, 140, 26);
    doc.text(`Status: ${order.status.toUpperCase()}`, 140, 34);

    // Divider
    let y = 50;

    // Billing and Shipping section
    doc.setFillColor(...lightGray);
    doc.rect(14, y, 182, 8, "F");
    doc.setTextColor(...darkText);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("SHIPPING ADDRESS", 18, y + 6);
    y += 14;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...darkText);
    doc.setFontSize(10);
    doc.text(`Name: ${order.shippingAddress.name}`, 18, y);
    y += 7;
    doc.text(`Phone: ${order.shippingAddress.phone}`, 18, y);
    y += 7;
    doc.text(`Address: ${order.shippingAddress.address}`, 18, y);
    y += 7;
    doc.text(
      `${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}`,
      18,
      y
    );
    y += 14;

    // Payment info
    doc.setFillColor(...lightGray);
    doc.rect(14, y, 182, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...darkText);
    doc.text("PAYMENT INFO", 18, y + 6);
    y += 14;

    doc.setFont("helvetica", "normal");
    doc.text(
      `Payment Method: ${order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}`,
      18,
      y
    );
    y += 7;
    doc.text(`Payment Status: ${order.paymentStatus.toUpperCase()}`, 18, y);
    y += 14;

    // Items Table Header
    doc.setFillColor(...primaryColor);
    doc.rect(14, y, 182, 9, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("ITEM", 18, y + 6);
    doc.text("QTY", 110, y + 6);
    doc.text("PRICE", 135, y + 6);
    doc.text("DISCOUNT", 155, y + 6);
    doc.text("TOTAL", 190, y + 6, { align: "right" });
    y += 14;

    // Items rows
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...darkText);
    doc.setFontSize(9);

    order.items.forEach((item, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(250, 251, 252);
        doc.rect(14, y - 4, 182, 10, "F");
      }
      doc.text(item.name.substring(0, 35), 18, y + 2);
      doc.text(String(item.quantity), 113, y + 2);
      doc.text(formatPrice(item.finalPrice), 135, y + 2);
      doc.text(item.discount > 0 ? `${item.discount}%` : "-", 160, y + 2);
      doc.text(
        formatPrice(item.finalPrice * item.quantity),
        196,
        y + 2,
        { align: "right" }
      );
      y += 10;
    });

    y += 6;

    // Divider line
    doc.setDrawColor(...grayText);
    doc.line(14, y, 196, y);
    y += 8;

    // Totals
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...grayText);
    doc.text("Subtotal:", 140, y);
    doc.text(formatPrice(order.totalPrice), 196, y, { align: "right" });
    y += 7;

    doc.text("Delivery:", 140, y);
    doc.setTextColor(22, 163, 74);
    doc.text("FREE", 196, y, { align: "right" });
    y += 7;

    // Total box
    doc.setFillColor(...primaryColor);
    doc.rect(130, y, 66, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("TOTAL:", 134, y + 7);
    doc.text(formatPrice(order.totalPrice), 194, y + 7, { align: "right" });
    y += 20;

    // Footer
    doc.setDrawColor(...primaryColor);
    doc.line(14, y, 196, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...grayText);
    doc.text("Thank you for shopping with ShopEase!", 105, y, { align: "center" });
    y += 6;
    doc.text("For support: support@shopease.com | +91 98765 43210", 105, y, { align: "center" });

    // Download
    doc.save(`ShopEase_Invoice_${order._id.slice(-8).toUpperCase()}.pdf`);
  };

  const formatPrice = (price) => {
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
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
      <div className="order-details-page">
        <div className="loader-wrapper">
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-details-page">
        <div className="error-message">
          <p>{error}</p>
          <button className="back-btn" onClick={() => navigate("/orders")}>
            ← Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-details-page">

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/orders")}>
        ← Back to My Orders
      </button>

      {order && (
        <>
          {/* Page Header */}
          <div className="order-details-header">
            <h1>Order #{order._id.slice(-8).toUpperCase()}</h1>
            <div style={{ display: "flex", gap: "var(--spacing-md)", alignItems: "center" }}>
              <span className={`order-status-badge ${getStatusClass(order.status)}`}>
                {order.status}
              </span>
              {/* Download Invoice Button */}
              {order.status !== "cancelled" && (
                <button
                  className="btn-download-invoice"
                  onClick={handleDownloadInvoice}
                >
                  <i className="fa-solid fa-arrow-down"></i> Download Invoice
                </button>
              )}
            </div>
          </div>

          <div className="order-details-grid">

            {/* Left Column */}
            <div>

              {/* Order Items */}
              <div className="order-details-section">
                <h2>Items Ordered</h2>
                {order.items.map((item, index) => (
                  <div className="order-detail-item" key={index}>
                    <div className="order-detail-item-image">📦</div>
                    <div className="order-detail-item-info">
                      <div className="order-detail-item-name">{item.name}</div>
                      <div className="order-detail-item-meta">
                        {formatPrice(item.finalPrice)} per item
                        {item.discount > 0 && ` — ${item.discount}% off`}
                      </div>
                      <div className="order-detail-item-meta">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                    <div className="order-detail-item-total">
                      {formatPrice(item.finalPrice * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Address */}
              <div className="order-details-section">
                <h2>Shipping Address</h2>
                <div className="detail-row">
                  <span className="detail-label">Name</span>
                  <span className="detail-value">{order.shippingAddress.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{order.shippingAddress.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Address</span>
                  <span className="detail-value">{order.shippingAddress.address}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">City</span>
                  <span className="detail-value">{order.shippingAddress.city}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">State</span>
                  <span className="detail-value">{order.shippingAddress.state}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Pincode</span>
                  <span className="detail-value">{order.shippingAddress.pincode}</span>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div>

              {/* Order Info */}
              <div className="order-details-section">
                <h2>Order Info</h2>
                <div className="detail-row">
                  <span className="detail-label">Order ID</span>
                  <span className="detail-value">#{order._id.slice(-8).toUpperCase()}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Placed On</span>
                  <span className="detail-value">{formatDate(order.createdAt)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payment Method</span>
                  <span className="detail-value">
                    {order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payment Status</span>
                  <span className="detail-value" style={{
                    color: order.paymentStatus === "paid"
                      ? "var(--color-success)"
                      : "var(--color-warning)"
                  }}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Price Summary */}
              <div className="order-details-section">
                <h2>Price Summary</h2>
                {order.items.map((item, index) => (
                  <div className="price-summary-row" key={index}>
                    <span>{item.name} × {item.quantity}</span>
                    <span>{formatPrice(item.finalPrice * item.quantity)}</span>
                  </div>
                ))}
                <div className="price-summary-row">
                  <span>Delivery</span>
                  <span style={{ color: "var(--color-success)" }}>FREE</span>
                </div>
                <div className="price-summary-row total">
                  <span>Total Amount</span>
                  <span>{formatPrice(order.totalPrice)}</span>
                </div>

                {order.status === "pending" && (
                  <button
                    className="btn-cancel-order"
                    onClick={handleCancelOrder}
                  >
                    Cancel Order
                  </button>
                )}
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderDetails;