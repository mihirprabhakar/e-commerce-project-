import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const getContact = async () => {
  const response = await axios.get(`${API_URL}/contact`);
  return response.data;
};

const contactService = { getContact };

export default contactService;