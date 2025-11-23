import axios from "axios";

const API_URL = "http://localhost:8080/api/bookings";

export const getUserBookings = async () => {
  const res = await axios.get(`${API_URL}/user/me`, {
    withCredentials: true,
  });
  return res.data;
};
