<template>
  <section class="calendar-section py-5">
    <div class="calendar-wrapper text-center">
      <div ref="calendarEl"></div>

      <div class="mt-4">
        <h5 class="horario-title">Seleccionar Horario</h5>

        <div class="horarios-container">
          <button
            v-for="hora in horarios"
            :key="hora"
            class="btn-hora"
            :class="{ active: horaSeleccionada === hora }"
            @click="horaSeleccionada = hora"
          >
            {{ hora }}
          </button>
        </div>

        <input
          type="text"
          v-model="nombreCliente"
          class="form-control w-50 mx-auto mt-4"
          placeholder="Tu nombre completo"
        />

        <button
          class="btn btn-abi mt-4"
          @click="confirmarReserva"
          :disabled="!isFormValid"
        >
          Confirmar Reserva por WhatsApp
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, inject, nextTick } from "vue";

const calendarEl = ref(null);
const fechaSeleccionada = ref("");
const horaSeleccionada = ref("");
const nombreCliente = ref("");
const calendar = ref(null);

const horarios = ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"];

// Inyectar el carrito desde el componente padre
const cartItems = inject("cartItems", []);

const isFormValid = computed(() => {
  return (
    fechaSeleccionada.value &&
    horaSeleccionada.value &&
    nombreCliente.value.trim()
  );
});

function calcularSubtotal() {
  return cartItems.value.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );
}

function confirmarReserva() {
  if (!isFormValid.value) {
    if (!fechaSeleccionada.value) {
      alert("Selecciona una fecha");
      return;
    }
    if (!horaSeleccionada.value) {
      alert("Selecciona un horario");
      return;
    }
    if (!nombreCliente.value.trim()) {
      alert("Ingresa tu nombre");
      return;
    }
    return;
  }

  const servicios =
    cartItems.value.length > 0
      ? cartItems.value.map((p) => `${p.nombre} x${p.cantidad}`).join(", ")
      : "No especificado";

  const total = calcularSubtotal();

  let mensaje = `💖 NUEVA RESERVA Abi Nails 💖\n\n`;
  mensaje += `👤 Cliente: ${nombreCliente.value}\n`;
  mensaje += `📅 Fecha: ${fechaSeleccionada.value}\n`;
  mensaje += `⏰ Hora: ${horaSeleccionada.value}\n`;
  mensaje += `💅 Servicios: ${servicios}\n`;
  mensaje += `💳 Total estimado: $${total}\n\n`;
  mensaje += `Confirmar disponibilidad ✨`;

  const url = `https://wa.me/56947618468?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

onMounted(async () => {
  await nextTick();
  if (calendarEl.value && window.FullCalendar) {
    calendar.value = new window.FullCalendar.Calendar(calendarEl.value, {
      initialView: "dayGridMonth",
      locale: "es",
      selectable: true,
      select: function (info) {
        fechaSeleccionada.value = info.startStr;

        // Resaltar día seleccionado
        calendar.value.getEvents().forEach((e) => e.remove());

        calendar.value.addEvent({
          start: fechaSeleccionada.value,
          display: "background",
          backgroundColor: "#ff4fa3",
        });
      },
    });

    calendar.value.render();
  }
});
</script>

<style scoped>
/* ===== SECCIÓN FONDO ===== */
.calendar-section {
  background: linear-gradient(135deg, #2a0d1f, #3b0f2b);
  color: white;
  border-radius: 25px;
  margin: 80px auto;
  max-width: 900px;
  box-shadow: 0 0 40px rgba(255, 79, 163, 0.3);
  padding: 50px 20px;
}

/* ===== CALENDARIO FULLCALENDAR PERSONALIZADO ===== */
:deep(.fc) {
  background: transparent;
  color: white;
}

:deep(.fc .fc-highlight) {
  background: rgb(159 44 31 / 30%) !important;
}

:deep(.fc-toolbar-title) {
  font-size: 1.5rem !important;
  font-weight: 600;
}

:deep(.fc-daygrid-day) {
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

:deep(.fc-daygrid-day-number) {
  color: white;
  font-weight: 500;
}

:deep(.fc-daygrid-day.fc-day-today) {
  background: rgba(128, 0, 128, 0.3) !important;
  position: relative;
}

:deep(.fc-daygrid-day.fc-day-today::after) {
  content: "Hoy";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.75rem;
  background: purple;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: bold;
}

:deep(.fc-daygrid-day.fc-day-selected) {
  background: #ff874f !important;
  color: white !important;
}

:deep(.fc-button) {
  background: transparent !important;
  border: none !important;
  color: white !important;
}

:deep(.fc-button:hover) {
  color: #ff4fa3 !important;
}

/* ===== HORARIOS ===== */
.horario-title {
  margin-top: 30px;
  font-weight: 500;
  position: relative;
}

.horario-title::before,
.horario-title::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
}

.horario-title::before {
  left: 0;
}

.horario-title::after {
  right: 0;
}

.horarios-container {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.btn-hora:hover {
  background: #ff4fa3;
  border-color: #ff4fa3;
}

.btn-hora.active {
  background: #ff4fa3;
  border-color: #ff4fa3;
}

.btn-hora {
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: transparent;
  color: white;
  transition: 0.3s;
}

.btn-abi {
  background-color: #ff4fa3;
  color: white;
}

.btn-abi:hover {
  background-color: #e60073;
  color: white;
}

.btn-abi:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
