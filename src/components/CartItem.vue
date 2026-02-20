<template>
  <div class="d-flex justify-content-between align-items-center border-bottom py-2">
    <div>
      <strong>{{ item.nombre }}</strong>
      <p class="mb-0">${{ (item.precio * item.cantidad).toLocaleString() }}</p>
    </div>
    <div>
      {{ item.cantidad }}
      <button 
        class="btn btn-danger btn-sm ms-2" 
        @click="$emit('remove', item.id)"
      >
        <i class="bi bi-trash"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})

defineEmits(['remove'])
</script>

