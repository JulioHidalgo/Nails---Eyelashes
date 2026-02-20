import { ref, onMounted } from 'vue'
import api from '../services/api'

export function useServices() {
  const services = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchServices() {
    loading.value = true
    error.value = null
    
    try {
      // Usando axios para obtener los servicios
      const response = await api.get('/assets/data/data_nails.json')
      services.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Error al cargar los servicios'
      console.error('Error fetching services:', err)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchServices()
  })

  return {
    services,
    loading,
    error,
    fetchServices
  }
}

