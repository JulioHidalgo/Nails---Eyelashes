<template>
  <Header :cart-count="totalItems" @open-cart="showCart = true" />
  <router-view />
  <CartOffcanvas
    :items="items"
    :is-open="showCart"
    :subtotal="subtotal"
    @close="showCart = false"
    @remove-item="removeItem"
    @send-whatsapp="sendWhatsApp"
  />
</template>

<script setup>
import { ref, provide } from "vue";
import { useCart } from "./composables/useCart";
import Header from "./components/Header.vue";
import CartOffcanvas from "./components/CartOffcanvas.vue";

const { items, totalItems, subtotal, addItem, removeItem } = useCart();
const showCart = ref(false);

// Proporcionar el carrito y funciones para que los componentes hijos puedan acceder
provide("cartItems", items);
provide("addToCart", (producto) => {
  addItem(producto);
  showCart.value = true;
});

function sendWhatsApp() {
  if (!items.value.length) return;

  let mensaje = "💅 ABI NAILS 💅\n\n";

  items.value.forEach((p, i) => {
    mensaje += `${i + 1}. ${p.nombre} x${p.cantidad}\n`;
  });

  mensaje += `\nTotal: $${subtotal.value.toLocaleString()}`;

  const url = `https://wa.me/56947618468?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
</script>

<style>
body {
  background-color: #1c0f1a !important;
  font-family: "Poppins", sans-serif;
}

.text-abi {
  color: #ff4fa3;
  text-decoration-line: underline;
}
</style>
