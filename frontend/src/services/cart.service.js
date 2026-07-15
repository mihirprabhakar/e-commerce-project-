import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// Get cart
const getCart = async () => {
  const response = await axios.get(`${API_URL}/cart`, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Add item to cart
const addToCart = async (productId, quantity = 1) => {
  const response = await axios.post(
    `${API_URL}/cart/add`,
    { productId, quantity },
    { headers: getAuthHeader() }
  );
  return response.data;
};

// Update item quantity
const updateCartItem = async (productId, quantity) => {
  const response = await axios.put(
    `${API_URL}/cart/update`,
    { productId, quantity },
    { headers: getAuthHeader() }
  );
  return response.data;
};

// Remove item from cart
const removeFromCart = async (productId) => {
  const response = await axios.delete(`${API_URL}/cart/remove/${productId}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Clear cart
const clearCart = async () => {
  const response = await axios.delete(`${API_URL}/cart/clear`, {
    headers: getAuthHeader()
  });
  return response.data;
};

const cartService = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };

export default cartService;