import axios from "./axiosInstance";

//  Recupera lista completa dei tour
export const getAllTours = async () => {
  const res = await axios.get("/tours");
  return res.data;
};

// Recupera un singolo tour
export const getTourById = async (id) => {
  const res = await axios.get(`/tours/${id}`);
  return res.data;
};

//  Effettua una prenotazione
export const bookTour = async (bookingData) => {
  const res = await axios.post("/bookings", bookingData);
  return res.data;
};
