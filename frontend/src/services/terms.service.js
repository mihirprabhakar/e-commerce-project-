import axios from "axios";

const API_URL=import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const getTerms=async ()=>{
  const response=await axios.get(`${API_URL}/terms`);
  return response.data;
};

const termsService={ getTerms };

export default termsService;