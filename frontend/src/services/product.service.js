import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

const productService = { getAllProducts, getProductById };

export default productService;