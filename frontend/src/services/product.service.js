import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const getAllProducts=async(page=1,limit=8,search="",sortBy="createdAt",sortOrder="desc") => {
  const response=await axios.get(`${API_URL}/products`,{
    params:{page,limit,search,sortBy,sortOrder}
  });
  return response.data;
};

const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

const productService = { getAllProducts, getProductById };

export default productService;