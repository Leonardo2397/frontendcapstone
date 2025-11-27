import axios from "./axiosInstance";

// Recupera tutti gli utenti (solo admin)
export const getAllUsers = async () => {
  const res = await axios.get("/users", { withCredentials: true });
  return res.data;
};

// Aggiorna utente, compreso il ruolo
export const updateUser = async (id, userData) => {
  const res = await axios.put(`/users/${id}`, userData, {
    withCredentials: true,
  });
  return res.data;
};

// Elimina utente
export const deleteUser = async (id) => {
  const res = await axios.delete(`/users/${id}`, { withCredentials: true });
  return res.data;
};
