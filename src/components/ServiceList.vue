<template>
  <div class="row g-4 mt-4 justify-content-center">
    <div v-if="loading" class="col-12 text-center">
      <p>Cargando servicios...</p>
    </div>
    <div v-else-if="error" class="col-12 text-center text-danger">
      <p>Error: {{ error }}</p>
    </div>
    <template v-else>
      <template v-for="categoria in services" :key="categoria.title">
        <div class="col-12 mt-5">
          <h3 class="text-center text-abi">{{ categoria.title }}</h3>
        </div>
        <ServiceCard
          v-for="item in categoria.items"
          :key="item.name"
          :service="item"
        />
      </template>
    </template>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useServices } from '../composables/useServices'
import ServiceCard from './ServiceCard.vue'

const { services, loading, error, fetchServices } = useServices()

onMounted(() => {
  fetchServices()
})
</script>

