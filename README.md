# 🧪 Frontend Pokédex

Aplicación web desarrollada con **Vue 3**, **TypeScript** y **TailwindCSS** que permite consultar, buscar y explorar Pokémon desde una API pública. La aplicación cuenta con un buscador en tiempo real, una vista de favoritos persistente y modales para detalles de cada Pokémon.

## 🚀 Tecnologías utilizadas

- [Vue 3 + Composition API](https://vuejs.org/) - Framework progresivo para interfaces.
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático para mayor seguridad y mantenibilidad.
- [Pinia](https://pinia.vuejs.org/) - Manejo de estado simple y efectivo.
- [Vue Router](https://router.vuejs.org/) - Navegación entre vistas.
- [TailwindCSS](https://tailwindcss.com/) - Utilidades CSS para estilos consistentes y modernos.
- [Axios](https://axios-http.com/) - Cliente HTTP para consumir APIs.
- [Vite](https://vitejs.dev/) - Herramienta moderna de construcción para Vue.
- [ESLint + Prettier](https://eslint.org/) - Linting y formateo automático del código.

## 🧠 Decisiones técnicas y principios aplicados

- **KISS (Keep It Simple, Stupid)**: Componentes pequeños y reutilizables (`Input`, `Button`, `Modal`).
- **DRY (Don't Repeat Yourself)**: Composición de lógica con `usePokemon.ts`, constantes reutilizadas desde `helpers/const.ts`.
- **SOLID**:
  - _Single Responsibility_: cada archivo tiene una responsabilidad clara (API, vista, store, etc.).
  - _Open/Closed_: se pueden extender componentes o lógica sin modificar los existentes.
- **Escalabilidad**: arquitectura basada en carpetas modulares como `api/`, `composable/`, `models/`, `components/`, etc.
- **Separación de responsabilidades**: lógica de negocio en `composable` y `store`, vistas limpias.

## 📁 Estructura del proyecto

```
src/
├── api/                # Módulos para llamadas HTTP
├── assets/             # Imágenes, íconos y estilos
├── components/         # Componentes reutilizables (UI)
├── composable/         # Hooks personalizados (usePokemon)
├── helpers/            # Constantes y funciones auxiliares
├── models/             # Tipos y modelos de datos
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
