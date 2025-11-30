# Implementación de Analytics - 200 Millas

## 📊 Vista de Analytics Completada

Se ha implementado una vista completa de Analytics con datos mockeados, respetando el tipado TypeScript y todas las acciones disponibles en la colección Postman.

## 🎯 Características Implementadas

### 1. **Página de Analytics** (`src/pages/Analytics.tsx`)

#### Secciones Principales:

**A. Controles**
- Input para cambiar el Local ID
- Botón "Actualizar Datos" - Recarga todas las analíticas
- Botón "Exportar Datos" - Ejecuta la ingesta de datos (POST /analytics/export)
- Feedback visual del estado de exportación

**B. Resumen General (Tarjetas)**
- 📦 **Total Pedidos**: Muestra el total de pedidos del local
- 💰 **Ganancias Totales**: Muestra ganancias totales y promedio por pedido
- ⏱️ **Tiempo Promedio**: Muestra tiempo promedio, mínimo y máximo de entrega

**C. Tabla de Tiempo por Estado**
- Muestra todos los estados del pedido (procesando, cocinando, empacando, enviando, recibido)
- Columnas:
  - Estado
  - Total de pedidos
  - Tiempo promedio (minutos)
  - Tiempo mínimo (minutos)
  - Tiempo máximo (minutos)
  - Desviación estándar
- Diseño responsive con scroll horizontal en móviles

**D. Análisis Detallado de Tiempo**
- Detalles por local
- Visualización de tiempos en tarjetas con colores:
  - Azul: Tiempo promedio
  - Verde: Tiempo mínimo
  - Rojo: Tiempo máximo
- Información de paginación

### 2. **Endpoints Integrados**

Todos los endpoints de la colección Postman están integrados:

```typescript
// 1. Exportar datos para ingesta
POST /analytics/export
→ exportAnalytics()

// 2. Total de pedidos por local
POST /analytics/pedidos-por-local
→ getPedidosPorLocal({ local_id })

// 3. Ganancias por local
POST /analytics/ganancias-por-local
→ getGananciasPorLocal({ local_id })

// 4. Tiempo de pedido
POST /analytics/tiempo-pedido
→ getTiempoPedido({ local_id })

// 5. Promedio por estado
POST /analytics/promedio-por-estado
→ getPromedioPorEstado({ local_id })
```

### 3. **Integración con el Sistema**

#### Rutas
- **URL**: `/analytics`
- **Protección**: Solo Admin y Gerente
- **Redirección**: Empleados son redirigidos a `/dashboard/employee`

#### Navegación
- Enlace en el Header (solo visible para Admin/Gerente)
- Tarjeta en el AdminDashboard
- Navegación móvil incluida

## 🎨 Diseño UI/UX

### Paleta de Colores
- **Azul**: Pedidos y datos generales
- **Verde**: Ganancias y tiempos mínimos
- **Púrpura**: Tiempos promedio
- **Rojo**: Tiempos máximos

### Componentes Visuales
- Tarjetas con gradientes para métricas principales
- Tabla responsive con hover effects
- Estados de carga con spinner animado
- Feedback visual para acciones (exportar)
- Badges de colores para estados

### Responsive Design
- Grid adaptativo (1 columna en móvil, 3 en desktop)
- Tabla con scroll horizontal en móviles
- Botones apilados en móviles, en fila en desktop

## 📊 Datos Mockeados

Los mocks generan datos realistas:

### Pedidos por Local
```json
{
  "local_id": "LOCAL-001",
  "total_pedidos": 25 // Aleatorio entre 5-55
}
```

### Ganancias por Local
```json
{
  "local_id": "LOCAL-001",
  "total_pedidos": 25,
  "ganancias_totales": 3500.50,
  "ganancia_promedio": 140.02
}
```

### Tiempo de Pedido
```json
{
  "local_id": "LOCAL-001",
  "total_pedidos": 25,
  "tiempo_promedio_minutos": 45,
  "tiempo_minimo_minutos": 30,
  "tiempo_maximo_minutos": 65
}
```

### Promedio por Estado
```json
{
  "estado": "procesando",
  "total_pedidos": 10,
  "tiempo_promedio_minutos": 8.5,
  "tiempo_minimo_minutos": 2,
  "tiempo_maximo_minutos": 15,
  "desviacion_estandar": 4.2
}
```

## 🔧 Uso

### Acceso
1. Inicia sesión como Admin o Gerente:
   - `admin@200millas.com` / `admin123`
   - `gerente@200millas.com` / `gerente123`

2. Navega a Analytics:
   - Desde el Header: Click en "ANALYTICS"
   - Desde el Dashboard: Click en la tarjeta "📊 Analytics"

### Funcionalidades

**Cambiar Local**
```typescript
// Cambiar el input de Local ID
setLocalId('LOCAL-002')
// Click en "Actualizar Datos"
```

**Exportar Datos**
```typescript
// Click en "Exportar Datos"
// Espera el mensaje de confirmación
// Los datos se recargan automáticamente después de 2 segundos
```

**Ver Detalles**
- Scroll en la tabla para ver todos los estados
- Observa los colores para identificar rápidamente:
  - Verde: Mejores tiempos
  - Rojo: Tiempos más largos

## 📱 Responsive Breakpoints

```css
/* Móvil: < 768px */
- 1 columna para tarjetas
- Tabla con scroll horizontal
- Botones apilados verticalmente

/* Tablet: 768px - 1024px */
- 2 columnas para tarjetas
- Tabla completa visible

/* Desktop: > 1024px */
- 3 columnas para tarjetas
- Tabla completa con hover effects
- Botones en fila
```

## 🎯 Casos de Uso

### 1. Gerente revisa rendimiento del local
```
1. Accede a /analytics
2. Ve resumen general en tarjetas
3. Identifica que el tiempo promedio es alto
4. Revisa tabla de estados
5. Detecta que "cocinando" tiene el mayor tiempo
6. Toma acción para optimizar cocina
```

### 2. Admin compara múltiples locales
```
1. Accede a /analytics
2. Ve datos de LOCAL-001
3. Cambia a LOCAL-002
4. Click en "Actualizar Datos"
5. Compara métricas
6. Identifica local con mejor rendimiento
```

### 3. Exportación de datos para análisis externo
```
1. Accede a /analytics
2. Click en "Exportar Datos"
3. Espera confirmación
4. Los datos están listos en S3
5. Crawlers procesan los datos
6. Datos disponibles en Glue Database
```

## 🔐 Seguridad y Permisos

### Validación de Roles
```typescript
// Solo Admin y Gerente pueden acceder
<RoleBasedRoute 
    allowedRoles={[ROLES.ADMIN, ROLES.GERENTE]} 
    redirectTo="/dashboard/employee"
>
    <Analytics />
</RoleBasedRoute>
```

### Visibilidad en UI
```typescript
// El enlace solo aparece si tiene permisos
const showAnalytics = canViewAnalytics(userRole);
{showAnalytics && <Link to="/analytics">Analytics</Link>}
```

## 📈 Métricas Clave

### KPIs Principales
1. **Total de Pedidos**: Volumen de operación
2. **Ganancias Totales**: Rendimiento financiero
3. **Ganancia Promedio**: Ticket promedio
4. **Tiempo Promedio**: Eficiencia operativa
5. **Desviación Estándar**: Consistencia del servicio

### Análisis por Estado
- **Procesando**: Tiempo de confirmación
- **Cocinando**: Eficiencia de cocina
- **Empacando**: Velocidad de empaque
- **Enviando**: Tiempo de delivery
- **Recibido**: Tiempo total de entrega

## 🚀 Mejoras Futuras (Opcionales)

1. **Gráficos Visuales**
   - Gráficos de barras para tiempos
   - Gráficos de línea para tendencias
   - Gráficos de pastel para distribución

2. **Filtros Avanzados**
   - Rango de fechas
   - Filtro por estado
   - Comparación entre locales

3. **Exportación de Reportes**
   - Descargar PDF
   - Descargar Excel
   - Enviar por email

4. **Alertas**
   - Notificaciones si tiempo > umbral
   - Alertas de bajo rendimiento
   - Sugerencias de optimización

## ✅ Checklist de Implementación

- ✅ Página de Analytics creada
- ✅ Todos los endpoints integrados
- ✅ Mocks funcionando correctamente
- ✅ Tipado TypeScript completo
- ✅ Protección de rutas por rol
- ✅ Enlace en Header (condicional)
- ✅ Enlace en AdminDashboard
- ✅ Diseño responsive
- ✅ Estados de carga
- ✅ Manejo de errores
- ✅ Feedback visual
- ✅ Sin errores de diagnóstico

---

**Fecha de implementación**: 2025-11-30  
**Estado**: ✅ Completado y verificado  
**Acceso**: Solo Admin y Gerente
