import { ref, onMounted } from "vue";
import { getServices } from "../services/servicesApi";

export function useServices() {
  const services = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchServices() {
    loading.value = true;
    error.value = null;

    try {
      services.value = await getServices();
    } catch (err) {
      error.value = "Error al cargar los servicios";
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  onMounted(fetchServices);

  return {
    services,
    loading,
    error,
    fetchServices,
  };
}
