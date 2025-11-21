import axios from "axios";

export const getUserBookings = async (email) => {
  const res = await axios.get(`/api/bookings/user/${email}`);
  return res.data;
};
