// import axios from "axios";

// // Crea un'istanza Axios con la base URL del backend
// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8080/api",
//   withCredentials: true, // OBBLIGATORIO per cookie JWT
// });

// // Interceptor REQUEST
// // Non serve aggiungere Authorization perché usiamo cookies
// axiosInstance.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Interceptor RESPONSE
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.warn("Non autenticato → redirect al login");

//       // Nessun token da cancellare — i cookie li gestisce il server
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // fondamentale per cookie JWT
});

// Interceptor REQUEST (puoi aggiungere header custom se necessario)
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Interceptor RESPONSE
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // lista endpoint pubblici: login, register, logout
      const publicPaths = ["/auth/login", "/auth/register", "/auth/logout"];
      const path = error.config.url.replace("/api", "");

      if (!publicPaths.includes(path)) {
        console.warn("Token non valido o scaduto → redirect al login");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
