<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRight"
    ref="offcanvasEl"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Servicios seleccionados</h5>
      <button
        type="button"
        class="btn-close"
        @click="handleClose"
        data-bs-dismiss="offcanvas"
      ></button>
    </div>

    <div class="offcanvas-body">
      <div v-if="items.length === 0" class="text-center">
        <p>No hay servicios agregados.</p>
      </div>
      <template v-else>
        <CartItem
          v-for="item in items"
          :key="item.id"
          :item="item"
          @remove="$emit('remove-item', $event)"
        />
      </template>

      <div class="mt-4">
        <h5>
          Total: <span>${{ subtotal.toLocaleString() }}</span>
        </h5>
        <button class="btn btn-abi w-100 mt-3" @click="$emit('send-whatsapp')">
          <i class="bi bi-whatsapp"></i> Enviar por WhatsApp
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import CartItem from "./CartItem.vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  subtotal: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["close", "remove-item", "send-whatsapp"]);
const offcanvasEl = ref(null);
let bsOffcanvas = null;

function handleClose() {
  if (bsOffcanvas) {
    bsOffcanvas.hide();
  }
  emit("close");
}

watch(
  () => props.isOpen,
  async (newVal) => {
    await nextTick();
    if (offcanvasEl.value && window.bootstrap) {
      if (!bsOffcanvas) {
        bsOffcanvas = new window.bootstrap.Offcanvas(offcanvasEl.value);
      }
      if (newVal) {
        bsOffcanvas.show();
      } else {
        bsOffcanvas.hide();
      }
    }
  },
);

onMounted(() => {
  if (offcanvasEl.value && window.bootstrap) {
    bsOffcanvas = new window.bootstrap.Offcanvas(offcanvasEl.value);

    offcanvasEl.value.addEventListener("hidden.bs.offcanvas", () => {
      emit("close");
    });
  }
});
</script>

<style scoped>
.btn-pink {
  background-color: #ff4fa3;
  color: white;
}

.btn-pink:hover {
  background-color: #e60073;
  color: white;
}

.offcanvas-header {
  background-color: #ffe0f0;
}

/* ===== OFFCANVAS ANIMACIÓN PERSONALIZADA ===== */
.offcanvas {
  transform: translateX(100%);
  opacity: 0;
  transition:
    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.4s ease;
}

/* Cuando se muestra */
.offcanvas.show {
  transform: translateX(0);
  opacity: 1;
}

/* Backdrop más suave */
:deep(.offcanvas-backdrop) {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  transition: opacity 0.4s ease;
}

/* Animación del contenido interno */
.offcanvas-body {
  animation: fadeSlideIn 0.5s ease forwards;
}

@keyframes fadeSlideIn {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
