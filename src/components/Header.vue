<template>
  <header
    class="p-3 bg-light d-flex justify-content-between align-items-center"
  >
    <h3 class="text-abi fw-bold">💖 Abi Nails</h3>

    <button class="btn btn-light position-relative" @click="$emit('open-cart')">
      <i class="bi bi-bag-heart-fill fs-4 text-abi"></i>
      <span
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
      >
        {{ cartCount }}
      </span>
    </button>
  </header>
</template>

<script setup>
defineProps({
  cartCount: {
    type: Number,
    default: 0,
  },
});

defineEmits(["open-cart"]);
</script>
