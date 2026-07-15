import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// Place order
const placeOrder = async (orderData) => {
  const response = await axios.post(
    `${API_URL}/orders/place`,
    orderData,
    { headers: getAuthHeader() }
  );
  return response.data;
};

// Get my orders
const getMyOrders = async () => {
  const response = await axios.get(`${API_URL}/orders/my-orders`, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Get order by ID
const getOrderById = async (id) => {
  const response = await axios.get(`${API_URL}/orders/${id}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Cancel order
const cancelOrder = async (id) => {
  const response = await axios.patch(
    `${API_URL}/orders/${id}/cancel`,
    {},
    { headers: getAuthHeader() }
  );
  return response.data;
};

const orderService = { placeOrder, getMyOrders, getOrderById, cancelOrder };

export default orderService;