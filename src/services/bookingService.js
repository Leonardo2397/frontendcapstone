import axios from "axios";

const API_URL = "http://localhost:8080/api/bookings";

export const getUserBookings = async () => {
  try {
    const res = await axios.get(`${API_URL}/user/me`, {
      withCredentials: true, // fondamentale per inviare il cookie JWT
    });
    return res.data;
  } catch (error) {
    console.error("Errore fetch prenotazioni:", error);
    throw error; // rilancia per gestirlo nel componente React
  }
};
