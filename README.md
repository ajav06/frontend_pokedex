# 🧪 Frontend Pokédex

🌐 **Demo en vivo**: [favorite-pokemons.netlify.app](https://favorite-pokemons.netlify.app/)

Aplicación web desarrollada con **Vue 3**, **TypeScript**, **TailwindCSS** y **@tanstack/vue-query** que permite consultar, buscar y explorar Pokémon desde una API pública. La aplicación cuenta con un buscador en tiempo real, una vista de favoritos persistente y modales para detalles de cada Pokémon.

Este proyecto forma parte de una prueba técnica y está enfocado en demostrar buenas prácticas de arquitectura, manejo de datos y UI escalable con Vue 3.

## 🚀 Tecnologías utilizadas

- [Vue 3 + Composition API](https://vuejs.org/) - Framework progresivo para interfaces.
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático para mayor seguridad y mantenibilidad.
- [Pinia](https://pinia.vuejs.org/) - Manejo de estado simple y efectivo.
- [Vue Router](https://router.vuejs.org/) - Navegación entre vistas.
- [TailwindCSS](https://tailwindcss.com/) - Utilidades CSS para estilos consistentes y modernos.
- [Axios](https://axios-http.com/) - Cliente HTTP para consumir APIs.
- [@tanstack/vue-query](https://tanstack.com/query/latest/docs/framework/vue/overview) - Manejo avanzado de consultas con cacheo automático y reactividad.
- [Vite](https://vitejs.dev/) - Herramienta moderna de construcción para Vue.
- [ESLint + Prettier](https://eslint.org/) - Linting y formateo automático del código.

## ☁️ Despliegue

Esta aplicación fue desplegada en [Netlify](https://www.netlify.com/), permitiendo actualizaciones automáticas con cada push a la rama principal.

## 🧠 Decisiones técnicas y principios aplicados

- **KISS (Keep It Simple, Stupid)**: Componentes pequeños y reutilizables (`Input`, `Button`, `Modal`).
- **DRY (Don't Repeat Yourself)**: Reutilización de lógica de consultas en `queries/pokemon.ts`, y uso de constantes desde `helpers/const.ts`.
- **SOLID**:
  - _Single Responsibility_: cada archivo tiene una responsabilidad clara (API, vista, store, etc.).
  - _Open/Closed_: se pueden extender componentes o lógica sin modificar los existentes.
- **Escalabilidad**: arquitectura basada en carpetas modulares como `api/`, `queries/`, `models/`, `components/`, etc.
- **Consultas reactivas y cacheo automático**: uso de @tanstack/vue-query para manejar datos remotos con eficiencia y actualización reactiva.
- **Scroll infinito y manejo de estados separados**: implementación de scroll infinito para carga progresiva de Pokémon, separación clara de estados como `pokemonName` y `modalPokemonName` para un manejo óptimo de la UI.

## 📁 Estructura del proyecto

```
src/
├── api/                # Módulos para llamadas HTTP
├── assets/             # Imágenes, íconos y estilos
├── components/         # Componentes reutilizables (UI)
├── helpers/            # Constantes y funciones auxiliares
├── models/             # Tipos y modelos de datos
├── queries/            # Consultas con @tanstack/vue-query
├── router/             # Definición de rutas
├── stores/             # Pinia store
├── views/              # Vistas principales (Home, Pokédex)
└── App.vue             # Entrada principal de la app
```

## ⚙️ Scripts disponibles

```bash
# Iniciar la app en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build
npm run preview

# Lint con fix automático
npm run lint

# Formatear código con Prettier
npm run format

# Chequeo de tipos TypeScript
npm run type-check
```
