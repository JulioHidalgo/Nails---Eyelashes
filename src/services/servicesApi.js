import api from "./api";
import { getServicesFromFirebase } from "./firebaseServicesApi";

/**
 * Obtener todos los servicios directamente desde Firebase
 */
export const getServices = async () => {
  return await getServicesFromFirebase();
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
  try {
    const { createOrderInFirebase } = await import("./firebaseOrdersApi");
    return await createOrderInFirebase(orderData);
  } catch (firebaseError) {
    console.error("Error creando orden en Firebase, usando API JSON como respaldo.", firebaseError);
    const response = await api.post("/orders", orderData);
    return response.data;
  }
};
