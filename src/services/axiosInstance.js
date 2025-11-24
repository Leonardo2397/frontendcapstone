import axios from "axios";

// Crea un'istanza Axios con la base URL del backend
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Interceptor per aggiungere automaticamente il token JWT
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // NON aggiungere Authorization per login e registrazione
    const isAuthEndpoint =
      config.url.includes("/auth/login") ||
      config.url.includes("/auth/register");

    if (token && !isAuthEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor opzionale per gestire errori 401 globali
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se il token scade o è invalido puoi fare logout automatico
    if (error.response && error.response.status === 401) {
      console.warn("Token scaduto o invalido → logout automatico");

      localStorage.removeItem("token");

      // Ricarica la pagina o fai redirect al login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
