# Abi Nails - Nails & Eyelashes

Aplicación web desarrollada con Vue.js 3 para la gestión de servicios de manicure y pestañas.

## Características

- Catálogo de servicios con categorías (Manicure y Pestañas)
- Carrito de compras reactivo
- Calendario de reservas con FullCalendar
- Integración con WhatsApp para envío de pedidos y reservas
- Navegación con Vue Router
- Diseño responsive con Bootstrap 5

## Tecnologías

- Vue.js 3 (Composition API)
- Vue Router 4
- Vite
- Axios (para peticiones HTTP)
- Bootstrap 5
- FullCalendar 6
- Bootstrap Icons

## Estructura del Proyecto

```
├── src/
│   ├── components/        # Componentes Vue
│   │   ├── Header.vue
│   │   ├── ServiceCard.vue
│   │   ├── ServiceList.vue
│   │   ├── CartOffcanvas.vue
│   │   ├── CartItem.vue
│   │   └── CalendarSection.vue
│   ├── views/            # Vistas de rutas
│   │   ├── HomeView.vue
│   │   ├── ServiciosView.vue
│   │   └── ReservasView.vue
│   ├── composables/      # Composables reactivos
│   │   ├── useCart.js
│   │   └── useServices.js
│   ├── services/         # Servicios API con Axios
│   │   ├── api.js
│   │   └── servicesApi.js
│   ├── router/           # Configuración de rutas
│   │   └── index.js
│   ├── App.vue           # Componente raíz
│   └── main.js           # Punto de entrada
├── assets/               # Recursos estáticos
│   ├── css/
│   ├── data/
│   └── img-products/
└── index.html
```

## Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar en modo desarrollo:

```bash
npm run dev
```

3. Compilar para producción:

```bash
npm run build
```

4. Vista previa de producción:

```bash
npm run preview
```

## Rutas

- `/` - Página principal (servicios + calendario)
- `/servicios` - Solo catálogo de servicios
- `/reservas` - Solo calendario de reservas

## Funcionalidades Principales

### Carrito de Compras

- Agregar servicios al carrito
- Eliminar servicios del carrito
- Contador reactivo de items
- Cálculo automático del subtotal
- Envío de pedido por WhatsApp

### Calendario de Reservas

- Selección de fecha con FullCalendar
- Selección de horario disponible
- Validación de formulario
- Envío de reserva por WhatsApp con información completa

## Estilos

Los estilos personalizados se mantienen en `assets/css/style.css` con el color principal `#ff4fa3` (rosa).

## API y Datos Externos

El proyecto utiliza **Axios** para manejar peticiones HTTP:

- **Configuración**: `src/services/api.js` - Instancia configurada de Axios con interceptores
- **Servicios**: `src/services/servicesApi.js` - Funciones para interactuar con endpoints
- **Uso**: El composable `useServices.js` utiliza Axios para obtener datos

## Notas

- Los datos de servicios se cargan desde `public/assets/data/data_nails.json`
- Las imágenes de productos están en `public/assets/img-products/`
- FullCalendar se carga desde CDN en el `index.html`
