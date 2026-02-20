import api from "./api";

/**
 * Servicios API - Funciones para interactuar con endpoints de servicios
 */

/**

 * @returns {Promise} 
 */
export const getServices = async () => {
  try {
    const response = await api.get("/assets/data/data_nails.json");
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Obtiene un servicio por ID
 * @param {string} serviceId
 * @returns {Promise}
 */
export const getServiceById = async (serviceId) => {
  try {
    const response = await api.get(`/api/services/${serviceId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Simula el envío de una reserva a un servidor
 * @param {Object} reservationData
 * @returns {Promise}
 */
export const createReservation = async (reservationData) => {
  try {
    const response = await api.post("/api/reservations", reservationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Simula el envío de un pedido a un servidor
 * @param {Object} orderData
 * @returns {Promise}
 */
export const createOrder = async (orderData) => {
  try {
    const response = await api.post("/api/orders", orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
