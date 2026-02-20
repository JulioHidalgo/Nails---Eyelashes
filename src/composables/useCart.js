import { ref, computed } from 'vue'

export function useCart() {
  const items = ref([])

  const totalItems = computed(() => {
    return items.value.reduce((acc, item) => acc + item.cantidad, 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
  })

  function addItem(producto) {
    const existe = items.value.find((p) => p.id === producto.id)

    if (existe) {
      existe.cantidad++
    } else {
      items.value.push({
        ...producto,
        cantidad: 1
      })
    }
  }

  function removeItem(id) {
    items.value = items.value
      .map((p) => (p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p))
      .filter((p) => p.cantidad > 0)
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    totalItems,
    subtotal,
    addItem,
    removeItem,
    clearCart
  }
}

