Mocks
=====

Ubicación: `src/mocks`

## ✅ Estado: VERIFICADO Y FUNCIONANDO

Qué contiene:
- `mockManager.ts`: helper para saber si el modo mock está activo (lee `VITE_USE_MOCK`).
- `data/`: datos estáticos de ejemplo (`employees.ts`, `products.ts`, `users.ts`).
- `auth.ts`: funciones mock para autenticación (login, register, changePassword). ⭐ NUEVO
- `employees.ts`: funciones mock para listar/crear/actualizar/eliminar empleados.
- `products.ts`: funciones mock para listar/crear/actualizar/eliminar productos.
- `empleadoActions.ts`: funciones mock para acciones de empleado (cocina, empaque, delivery).
- `testMocks.ts`: script de pruebas para verificar todos los mocks (incluye auth).

Cómo funciona ahora:
- El servicio de autenticación (`src/services/auth/index.ts`) usa automáticamente los mocks cuando `VITE_USE_MOCK=true`.
- Las páginas de `AdminDashboard` y `EmployeeDashboard` usan estas funciones mock para mostrar datos y probar flujos.
- Página de pruebas disponible en `/test-mocks` para verificar todos los servicios mockeados.
- Credenciales de prueba documentadas en `MOCK_CREDENTIALS.md` en la raíz del proyecto.

Cómo quitar los mocks cuando la API real esté funcionando:
1. En el archivo `.env` o variables de entorno, establece:

   VITE_USE_MOCK=false

   (Por defecto, si no está definida, el mock está habilitado en este repo.)

2. Sustituir las llamadas a las funciones mock por los servicios reales:
   - Reemplaza importaciones como `import { listEmployees } from '@mocks/employees'` por las llamadas al servicio real, por ejemplo `import { listEmployees } from '@services/users'` o usando `Api.getInstance('users')...` según la implementación del servicio real.

3. Elimina la carpeta `src/mocks` (opcional):
   - `git rm -r src/mocks` (o borrar manualmente).

4. Verifica que `VITE_API_USERS_URL`, `VITE_API_PRODUCTS_URL`, `VITE_API_EMPLEADO_URL`, y demás variables estén configuradas correctamente con las URLs de tu entorno.

5. Probar la app en modo dev:

```bash
npm run dev
```

6. Opcional: Si prefieres mantener la opción de mocks para desarrollo, puedes mantener `src/mocks` y modificar los servicios para elegir entre mock/real según `VITE_USE_MOCK`. Actualmente las dashboards importan directamente los mocks; después de migrar puedes cambiar las importaciones.

Notas:
- Los mocks responden con Promises y delays pequeños para simular latencia.
- Si quieres que integraremos los mocks dentro de `src/services` (para que toda la app pueda alternar mock/real automáticamente), dime y lo implemento (cambiaría llamadas del servicio de `product`/`users`).
