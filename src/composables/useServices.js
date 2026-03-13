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
      // Siempre usamos getServices, que ya se encarga de
      // intentar Firebase primero y caer al JSON local.
      const data = await getServices();

      const servicesArray = Array.isArray(data)
        ? data
        : Array.isArray(data?.services)
          ? data.services
          : [];

      // Agrupar servicios por categoría
      const grouped = servicesArray.reduce((acc, service) => {
        const categoryExists = acc.find(
          (cat) => cat.title === service.category,
        );

        if (categoryExists) {
          categoryExists.items.push(service);
        } else {
          acc.push({
            title: service.category,
            items: [service],
          });
        }

        return acc;
      }, []);

      services.value = grouped;
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
