import axiosInstance from "./axiosInstance";

export const createTour = async (tourData) => {
  try {
    const response = await axiosInstance.post("/tours", tourData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getAllTours = async () => {
  try {
    const res = await axiosInstance.get("/tours");
    return res.data; // aspettati una lista di TourDto
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getTourById = async (id) => {
  const res = await axiosInstance.get(`/tours/${id}`);
  return res.data;
};

export const bookTour = async (tourId) => {
  const res = await axiosInstance.post(`/bookings/${tourId}`);
  return res.data;
};
