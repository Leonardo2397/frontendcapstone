import axiosInstance from "./axiosInstance";

export const createTour = async (tourData) => {
  try {
    const response = await axiosInstance.post("/tours", tourData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
