# Implementación Completa de APIs - 200 Millas

## 📋 Resumen

Se ha implementado una arquitectura completa que mapea todos los endpoints de la colección Postman, con soporte para **mocks** y **servicios reales**, alternando automáticamente según la variable `VITE_USE_MOCK`.

## 🏗️ Arquitectura

```
src/
├── interfaces/          # TypeScript interfaces para todas las APIs
│   ├── auth/           # Autenticación y usuarios
│   ├── product/        # Productos
│   ├── empleado/       # Empleados y acciones
│   ├── pedido/         # Pedidos (clientes)
│   └── analytics/      # Analytics
├── mocks/              # Implementaciones mock
│   ├── auth.ts
│   ├── products.ts
│   ├── employees.ts
│   ├── empleadoActions.ts
│   ├── pedidos.ts
│   └── analytics.ts
└── services/           # Servicios reales (APIs)
    ├── auth/
    ├── product/
    ├── empleado/
    ├── pedido/
    └── analytics/
```

## 📡 Endpoints Implementados

### 1. **Autenticación y Usuarios** (`/users`)

#### Públicos
- ✅ `POST /users/register` - Registrar usuario (Cliente/Gerente)
- ✅ `POST /users/login` - Iniciar sesión

#### Protegidos (requieren token)
- ✅ `GET /users/me` - Obtener información del usuario actual
- ✅ `PUT /users/me` - Modificar usuario actual
- ✅ `POST /users/password/change` - Cambiar contraseña
- ✅ `DELETE /users/me` - Eliminar usuario actual

### 2. **Empleados** (`/users/employee`)

Requieren rol Admin o Gerente:
- ✅ `POST /users/employees/list` - Listar empleados por local
- ✅ `POST /users/employee` - Crear empleado
- ✅ `PUT /users/employee` - Actualizar empleado
- ✅ `DELETE /users/employee` - Eliminar empleado

### 3. **Acciones de Empleado** (`/empleados`)

- ✅ `POST /empleados/cocina/iniciar` - Cocina inicia preparación
- ✅ `POST /empleados/cocina/completar` - Cocina completa
- ✅ `POST /empleados/empaque/completar` - Empaquetado completo
- ✅ `POST /empleados/delivery/iniciar` - Delivery inicia
- ✅ `POST /empleados/delivery/entregar` - Delivery entrega

### 4. **Productos** (`/productos`)

#### Públicos
- ✅ `POST /productos/list` - Listar productos por local
- ✅ `POST /productos/id` - Buscar producto por ID

#### Protegidos (Admin/Gerente)
- ✅ `POST /productos/create` - Crear producto (con imagen base64)
- ✅ `PUT /productos/update` - Actualizar producto
- ✅ `DELETE /productos/delete` - Eliminar producto

### 5. **Pedidos** (`/pedido`)

Requieren autenticación (Cliente):
- ✅ `POST /pedido/create` - Crear pedido
- ✅ `GET /pedido/status` - Consultar estado del pedido
- ✅ `POST /pedido/confirmar` - Cliente confirma pedido

### 6. **Analytics** (`/analytics`)

- ✅ `POST /analytics/export` - Exportar datos para ingesta
- ✅ `POST /analytics/pedidos-por-local` - Total de pedidos por local
- ✅ `POST /analytics/ganancias-por-local` - Ganancias por local
- ✅ `POST /analytics/tiempo-pedido` - Tiempo promedio de pedidos
- ✅ `POST /analytics/promedio-por-estado` - Tiempo promedio por estado

## 🔧 Uso de los Servicios

### Ejemplo: Listar Productos

```typescript
import { listProducts } from '@services/product';

// Automáticamente usa mock o API real según VITE_USE_MOCK
const response = await listProducts({ local_id: 'LOCAL-001' });
console.log(response.data.contents); // Array de productos
```

### Ejemplo: Crear Pedido

```typescript
import { createPedido } from '@services/pedido';

const response = await createPedido({
    local_id: 'LOCAL-001',
    productos: [
        { producto_id: 'abc-123', cantidad: 2 }
    ],
    costo: 125.50,
    direccion: 'Av. Principal 123',
    estado: 'procesando'
});

console.log(response.data.pedido.pedido_id);
```

### Ejemplo: Acciones de Empleado

```typescript
import { cocinaIniciar, cocinaCompletar } from '@services/empleado';

// Iniciar preparación
await cocinaIniciar({
    order_id: 'pedido-123',
    empleado_id: '12345678'
});

// Completar preparación
await cocinaCompletar({
    order_id: 'pedido-123',
    empleado_id: '12345678'
});
```

### Ejemplo: Analytics

```typescript
import { getPedidosPorLocal, getGananciasPorLocal } from '@services/analytics';

// Obtener pedidos por local
const pedidos = await getPedidosPorLocal({ local_id: 'LOCAL-001' });
console.log(pedidos.data.data[0].total_pedidos);

// Obtener ganancias
const ganancias = await getGananciasPorLocal({ local_id: 'LOCAL-001' });
console.log(ganancias.data.data[0].ganancias_totales);
```

## 🎯 Características de los Mocks

### Datos Realistas
- Latencia simulada (200-300ms)
- Validaciones de negocio
- Manejo de errores
- Datos de prueba consistentes

### Funcionalidades Mock
- **Auth**: Login, registro, cambio de contraseña con validaciones
- **Empleados**: CRUD completo con 6 empleados de prueba
- **Productos**: CRUD completo con 2 productos de prueba
- **Pedidos**: Creación, consulta de estado, confirmación
- **Analytics**: Datos estadísticos generados aleatoriamente
- **Acciones**: Simulación de flujo completo de pedido

## 🔄 Alternando entre Mock y Real

### Activar Mocks
```env
VITE_USE_MOCK=true
```

### Usar APIs Reales
```env
VITE_USE_MOCK=false
```

Reinicia el servidor después de cambiar:
```bash
npm run dev
```

## 📝 Variables de Entorno Requeridas

```env
# Modo mock
VITE_USE_MOCK=true

# URLs de APIs (solo necesarias cuando VITE_USE_MOCK=false)
VITE_API_USERS_URL=https://xxx.execute-api.us-east-1.amazonaws.com
VITE_API_PRODUCTS_URL=https://xxx.execute-api.us-east-1.amazonaws.com
VITE_API_CLIENTES_URL=https://xxx.execute-api.us-east-1.amazonaws.com
VITE_API_EMPLEADO_URL=https://xxx.execute-api.us-east-1.amazonaws.com
VITE_API_ANALYTIC_URL=https://xxx.execute-api.us-east-1.amazonaws.com
```

## 🧪 Testing

Ejecuta todas las pruebas:
1. Inicia sesión en la aplicación
2. Ve a `/test-mocks`
3. Haz clic en "Ejecutar Pruebas de Mocks"

O usa el script directamente:
```typescript
import { testAllMocks } from '@mocks/testMocks';
await testAllMocks();
```

## 📊 Interfaces TypeScript

Todas las interfaces están completamente tipadas:

```typescript
// Ejemplo de interfaces
interface CreatePedidoRequest {
    local_id: string;
    productos: ProductoPedido[];
    costo: number;
    direccion: string;
    estado: string;
}

interface Product {
    local_id: string;
    producto_id: string;
    nombre: string;
    precio: number;
    categoria: string;
    stock: number;
    imagen_url: string;
}
```

## 🎨 Integración con UI

Los servicios están listos para integrarse con componentes React:

```typescript
import { useState, useEffect } from 'react';
import { listProducts } from '@services/product';

function ProductList() {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const loadProducts = async () => {
            const response = await listProducts({ local_id: 'LOCAL-001' });
            setProducts(response.data.contents);
        };
        loadProducts();
    }, []);
    
    return (
        <div>
            {products.map(p => (
                <div key={p.producto_id}>{p.nombre} - S/ {p.precio}</div>
            ))}
        </div>
    );
}
```

## ✅ Ventajas de esta Implementación

1. **Desarrollo sin Backend**: Trabaja con mocks mientras el backend está en desarrollo
2. **Type Safety**: TypeScript completo en toda la aplicación
3. **Fácil Testing**: Alterna entre mock y real con una variable
4. **Consistencia**: Misma interfaz para mock y real
5. **Escalable**: Fácil agregar nuevos endpoints
6. **Documentado**: Interfaces claras y documentación completa

## 🚀 Próximos Pasos

1. Integrar servicios en componentes UI
2. Agregar manejo de errores global
3. Implementar caché de datos
4. Agregar interceptores para tokens
5. Crear hooks personalizados (useProducts, usePedidos, etc.)

---

**Fecha de implementación**: 2025-11-30  
**Estado**: ✅ Completado y verificado
