# Credenciales Mock para Testing

## 🔐 Usuarios de Prueba

Cuando `VITE_USE_MOCK=true` está habilitado en el archivo `.env`, puedes usar estas credenciales para iniciar sesión:

### Admin
- **Correo**: `admin@200millas.com`
- **Contraseña**: `admin123`
- **Rol**: Admin
- **Acceso**: Panel completo de administración, Analytics, Gestión de Productos (CRUD completo)

### Empleado 1
- **Correo**: `empleado1@200millas.com`
- **Contraseña**: `empleado123`
- **Rol**: Empleado
- **Nombre**: Juan Pérez
- **DNI**: 26422537
- **Acceso**: Panel de empleado, Consulta de productos

### Empleado 2
- **Correo**: `empleado2@200millas.com`
- **Contraseña**: `empleado123`
- **Rol**: Empleado
- **Nombre**: María García
- **DNI**: 32993013
- **Acceso**: Panel de empleado, Consulta de productos

### Empleado 3
- **Correo**: `empleado3@200millas.com`
- **Contraseña**: `empleado123`
- **Rol**: Empleado
- **Nombre**: Carlos López
- **DNI**: 68432197
- **Acceso**: Panel de empleado, Consulta de productos

## 🧪 Cómo Probar

1. Asegúrate de que `VITE_USE_MOCK=true` en tu archivo `.env`
2. Inicia el servidor: `npm run dev`
3. Ve a la página de login: `http://localhost:5173/login`
4. Usa cualquiera de las credenciales anteriores
5. Explora las funcionalidades según el rol

## 📝 Notas Importantes

- ⚠️ **Estas credenciales son solo para desarrollo/testing**
- Los tokens generados son simulados y tienen formato: `mock-token-{usuario}-{timestamp}`
- Los tokens "expiran" en 24 horas (simulado)
- No se pueden registrar usuarios con rol "Cliente" en esta aplicación
- Los datos se reinician en cada recarga de la aplicación

## 🔄 Funcionalidades Mock Disponibles

### Autenticación
- ✅ Login con validación de credenciales
- ✅ Registro de nuevos usuarios (Admin/Empleado)
- ✅ Cambio de contraseña
- ✅ Validación de roles (Admin y Empleado)
- ✅ Generación de tokens

### Gestión de Empleados (Admin)
- ✅ Listar empleados por local
- ✅ Crear empleado
- ✅ Actualizar empleado
- ✅ Eliminar empleado

### Gestión de Productos
- ✅ Listar productos por local (Admin y Empleado)
- ✅ Crear producto (Solo Admin)
- ✅ Actualizar producto (Solo Admin)
- ✅ Eliminar producto (Solo Admin)
- ✅ Consultar productos (Admin y Empleado)

### Acciones de Empleado
- ✅ Cocina: Iniciar/Completar
- ✅ Empaque: Completar
- ✅ Delivery: Iniciar/Entregar

### Analytics (Solo Admin)
- ✅ Pedidos por local
- ✅ Ganancias por local
- ✅ Tiempo promedio de pedidos
- ✅ Estadísticas por estado

## 🧪 Página de Pruebas

Visita `/test-mocks` (requiere autenticación) para ejecutar todas las pruebas automáticas de los servicios mockeados.
