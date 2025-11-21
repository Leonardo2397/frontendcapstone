import axios from "./axiosInstance";

export const createBooking = async (bookingData) => {
  const res = await axios.post("/bookings", bookingData);
  return res.data;
};

export const getUserBookings = async (email) => {
  const res = await axios.get(`/bookings/user/${email}`);
  return res.data;
};
