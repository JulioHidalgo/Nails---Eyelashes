import { createReservationInFirebase, getReservationsFromFirebase } from "./firebaseReservationsApi";

async function createReservation(data) {
  try {
    return await createReservationInFirebase(data);
  } catch (firebaseError) {
    console.error("Error creando reserva en Firebase, usando API JSON como respaldo.", firebaseError);
  }

  const response = await api.post("/reservations", data);
  return response.data;
}

async function createOrder(data) {
  const response = await api.post("/orders", data);
  return response.data;
}

async function getReservations(filters) {
  try {
    return await getReservationsFromFirebase(filters);
  } catch (firebaseError) {
    console.error("Error obteniendo reservas desde Firebase, usando API JSON como respaldo.", firebaseError);
    const response = await api.get("/reservations");
    return response.data;
  }
}
