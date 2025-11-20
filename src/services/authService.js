import axiosInstance from "./axiosInstance";

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const register = async (firstName, lastName, email, password) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
