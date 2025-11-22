import axios from "axios";

const API_URL = "http://localhost:8080/api/bookings";

export const getUserBookings = async (email) => {
  const res = await axios.get(`${API_URL}/user/${email}`);
  return res.data;
};
