import axios from "axios";

// Crea un'istanza Axios preconfigurata
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // Cambia se il tuo backend è su un altro host/porta
});

// Interceptor per aggiungere automaticamente il token JWT
axiosInstance.interceptors.request.use(
  (config) => {
    // Prendi il token dal localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Aggiungi Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
