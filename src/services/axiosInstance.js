import axios from "axios";

// Crea un'istanza Axios con la base URL del backend
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // OBBLIGATORIO per cookie JWT
});

// Interceptor REQUEST
// Non serve aggiungere Authorization perché usiamo cookies
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor RESPONSE
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Non autenticato → redirect al login");

      // Nessun token da cancellare — i cookie li gestisce il server
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
