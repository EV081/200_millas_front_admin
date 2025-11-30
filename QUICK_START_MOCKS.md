# 🚀 Quick Start - Mocks

## Inicio Rápido en 3 Pasos

### 1️⃣ Activar Mocks
Verifica que en tu archivo `.env` esté:
```env
VITE_USE_MOCK=true
```

### 2️⃣ Iniciar Servidor
```bash
npm run dev
```

### 3️⃣ Iniciar Sesión
Ve a `http://localhost:5173/login` y usa:

**Admin**
- 📧 `admin@200millas.com`
- 🔑 `admin123`

**O haz clic en "Ver Credenciales de Prueba" en la página de login**

---

## 🧪 Probar Todo el Sistema

1. Inicia sesión con cualquier usuario
2. Ve a `/test-mocks`
3. Haz clic en "Ejecutar Pruebas de Mocks"
4. Verás todos los servicios funcionando ✅

---

## 📋 Credenciales Disponibles

| Rol | Correo | Contraseña |
|-----|--------|------------|
| Admin | admin@200millas.com | admin123 |
| Gerente | gerente@200millas.com | gerente123 |
| Cocinero | cocinero@200millas.com | cocinero123 |
| Repartidor | repartidor@200millas.com | repartidor123 |
| Despachador | despachador@200millas.com | despachador123 |

---

## 🔄 Cambiar a APIs Reales

En `.env`:
```env
VITE_USE_MOCK=false
```

Reinicia el servidor y listo.

---

## 📚 Más Información

- **Credenciales completas**: Ver `MOCK_CREDENTIALS.md`
- **Verificación del sistema**: Ver `MOCKS_VERIFICATION.md`
- **Changelog**: Ver `CHANGELOG_MOCKS.md`
