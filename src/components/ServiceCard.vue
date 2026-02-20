<template>
  <div class="col-md-3 col-sm-6 col-12">
    <div class="card h-100">
      <img 
        :src="`assets/img-products/${service.image}.jpg`" 
        class="card-img-top" 
        :alt="service.name"
      >

      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ service.name }}</h5>
        <p>{{ service.category }}</p>
        <p class="fw-bold text-abi">${{ service.price.toLocaleString() }}</p>

        <button class="btn btn-cart mt-auto" @click="handleAddToCart">
          Agregar servicio
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const props = defineProps({
  service: {
    type: Object,
    required: true
  }
})

const addToCart = inject('addToCart')

function handleAddToCart() {
  const producto = {
    id: props.service.name.replace(/\s+/g, "_"),
    nombre: props.service.name,
    precio: props.service.price,
    imagen: `assets/img-products/${props.service.image}.jpg`
  }
  addToCart(producto)
}
</script>

<style scoped>
.btn-cart {
  background-color: #ff4fa3;
  color: white;
}

.btn-cart:hover {
  background-color: #e60073;
}
</style>

