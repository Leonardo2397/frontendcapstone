import axios from "axios";

// URL del backend
const API_URL = "http://localhost:8080/api/auth/";

export const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
