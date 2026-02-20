import axios from "axios";

// Configuración base de axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/",
  timeout: 10000, // 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    // Respuesta exitosa
    return response;
  },
  (error) => {
    // Manejo de errores global
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("No autorizado");
          break;
        case 404:
          console.error("Recurso no encontrado");
          break;
        case 500:
          console.error("Error del servidor");
          break;
        default:
          console.error("Error:", error.response.status);
      }
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor");
    } else {
      console.error("Error al configurar la petición:", error.message);
    }
    return Promise.reject(error);
  },
);

export default api;
