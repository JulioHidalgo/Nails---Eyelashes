<template>
  <div>
    <div class="container my-5">
      <h1 class="text-center text-pink fw-bold text-warning fw-bold border-bottom pb-2">
        Nuestros Servicios
      </h1>
      <ServiceList />
    </div>
    <hr>
    <div class="container my-5">
      <h1 class="text-center text-pink fw-bold text-warning fw-bold border-bottom pb-2">
        Agenda Tu Cita
      </h1>
    </div>
    <CalendarSection />
  </div>
</template>

<script setup>
import ServiceList from '../components/ServiceList.vue'
import CalendarSection from '../components/CalendarSection.vue'
</script>

