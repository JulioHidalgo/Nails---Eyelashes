async function createReservation(data) {
  const response = await api.post("/reservations", data);
  return response.data;
}

async function createOrder(data) {
  const response = await api.post("/orders", data);
  return response.data;
}

async function getReservations() {
  const response = await api.get("/reservations");
  return response.data;
}
