# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

## **Api: Uso por microservicio**

Este proyecto incluye una clase `Api` en `src/services/Api.ts` diseñada para manejar múltiples base URLs (una por microservicio) y un token global compartido.

- **Instancias por servicio**: Solicita una instancia usando `Api.getInstance(type)` donde `type` puede ser:
  - `"default"`, `"users"`, `"products"`, `"clientes"`, `"empleado"`, `"analytic"`.

- **Variables de entorno**: Vite expone variables que comienzan con `VITE_`. Añade las siguientes en tu `.env` o en el entorno donde despliegues:

```
VITE_API_URL=                 # (opcional) base por defecto
VITE_API_USERS_URL=https://zq0fbveqte.execute-api.us-east-1.amazonaws.com
VITE_API_PRODUCTS_URL=https://y6am9ly97g.execute-api.us-east-1.amazonaws.com
VITE_API_CLIENTES_URL=https://2tkz55hms1.execute-api.us-east-1.amazonaws.com
VITE_API_EMPLEADO_URL=https://cmkk23rz22.execute-api.us-east-1.amazonaws.com
VITE_API_ANALYTIC_URL=https://9chtp1assj.execute-api.us-east-1.amazonaws.com
```

- **Token global**: Usa `Api.setGlobalToken(token)` para establecer (o limpiar) el JWT que será propagado a todas las instancias.

### Ejemplos

- Establecer token global después del login:

```ts
import Api from 'src/services/Api';

// después de recibir token
Api.setGlobalToken('mi.jwt.token');
```

- Obtener una instancia y hacer peticiones:

```ts
import Api from 'src/services/Api';

async function listarUsuarios() {
  const usersApi = await Api.getInstance('users');
  const res = await usersApi.get<any, any>({ url: '/users', params: { page: 1 } });
  return res.data;
}

async function crearProducto(producto) {
  const productsApi = await Api.getInstance('products');
  const res = await productsApi.post<typeof producto, any>(producto, { url: '/products' });
  return res.data;
}
```

### Notas y recomendaciones

- Los valores `fallback` están incluidos en el código para facilitar el desarrollo local; en producción se recomienda definir explícitamente las variables `VITE_...` y eliminar o actualizar los fallbacks si lo consideras necesario.
- Si necesitas instancias dinámicas por URL, puedo añadir `getInstanceByUrl(url: string)` para crear instancias ad-hoc.

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
