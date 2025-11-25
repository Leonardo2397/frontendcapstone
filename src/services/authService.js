import axiosInstance from "./axiosInstance";

// LOGIN - riceve cookie JWT
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );

    return response.data; // { token, type, email, role }
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// REGISTRAZIONE
export const register = async (firstName, lastName, email, password) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// OTTIENI UTENTE AUTENTICATO DAL COOKIE
export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/me", {
      withCredentials: true,
    });
    return response.data; // { email, role }
  } catch (error) {
    return null; // se non è loggato ritorna null
  }
};

// LOGOUT - cancella cookie quando implementerai /logout
export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
  } catch (error) {
    console.error("Logout fallito", error);
  }
};
