import api from "./api";

/**
 * Obtener todos los servicios desde Json Server
 */
export const getServices = async () => {
  const response = await api.get("/db.json");
  return response.data.services;
};

/**
 * Obtener servicio por ID
 */
export const getServiceById = async (serviceId) => {
  const response = await api.get(`/services/${serviceId}`);
  return response.data;
};

/**
 * Crear reserva
 */
export const createReservation = async (reservationData) => {
  const response = await api.post("/reservations", reservationData);
  return response.data;
};

/**
 * Crear orden
 */
export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};
