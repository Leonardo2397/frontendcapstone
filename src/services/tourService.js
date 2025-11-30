import axios from "./axiosInstance";

export const getAllTours = async () => {
  console.log(" GET /tours");
  try {
    const res = await axios.get("/tours", { withCredentials: true });
    console.log(" Risposta GET /tours:", res.data);
    return res.data;
  } catch (err) {
    console.error(" Errore GET /tours:", err.response || err);
    throw err;
  }
};

export const getTourById = async (id) => {
  console.log(" GET /tours/" + id);
  try {
    const res = await axios.get(`/tours/${id}`, { withCredentials: true });
    console.log(" Risposta GET /tours/" + id, res.data);
    return res.data;
  } catch (err) {
    console.error(" Errore GET /tours/" + id, err.response || err);
    throw err;
  }
};

export const bookTour = async (bookingData) => {
  console.log(" POST /bookings", bookingData);
  try {
    const res = await axios.post("/bookings", bookingData, {
      withCredentials: true,
    });
    console.log(" Risposta POST /bookings:", res.data);
    return res.data;
  } catch (err) {
    console.error(" Errore POST /bookings:", err.response || err);
    throw err;
  }
};

export const createTour = async (tourData) => {
  console.log(" POST /tours", tourData);
  try {
    const res = await axios.post("/tours", tourData, { withCredentials: true });
    console.log(" Risposta POST /tours:", res.data);
    return res.data;
  } catch (err) {
    console.error(" Errore POST /tours:", err.response || err);
    throw err;
  }
};

export const updateTour = async (id, tourData) => {
  console.log("➡️ PUT /tours/" + id, tourData);
  try {
    const res = await axios.put(`/tours/${id}`, tourData, {
      withCredentials: true,
    });
    console.log(" Risposta PUT /tours/" + id, res.data);
    return res.data;
  } catch (err) {
    console.error(" Errore PUT /tours/" + id, err.response || err);
    throw err;
  }
};

// DELETE TOUR (ADMIN)
export const deleteTour = async (id) => {
  console.log(" DELETE /tours/" + id);
  try {
    const res = await axios.delete(`/tours/${id}`, { withCredentials: true });
    console.log(" Risposta DELETE /tours/" + id, res.data);
    return res.data;
  } catch (err) {
    console.error(" Errore DELETE /tours/" + id, err.response || err);
    throw err;
  }
};
