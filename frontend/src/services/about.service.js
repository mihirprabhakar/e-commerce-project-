import axios from "axios";

const API_URL=import.meta.env.VITE_API_BASE_URL||"http://localhost:5000/api";

const getAbout=async ()=>{
  const response=await axios.get(`${API_URL}/about`);
  return response.data;
};

const aboutService = { getAbout };

export default aboutService;