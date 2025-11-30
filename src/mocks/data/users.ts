// Usuarios mock para autenticación
// NOTA: En producción, NUNCA almacenar contraseñas en texto plano

export const MOCK_AUTH_USERS = [
    {
        correo: 'admin@200millas.com',
        contrasena: 'admin123',
        nombre: 'Admin Principal',
        role: 'Admin',
        local_id: 'LOCAL-001',
        dni: '12345678'
    },
    {
        correo: 'empleado1@200millas.com',
        contrasena: 'empleado123',
        nombre: 'Juan Pérez',
        role: 'Empleado',
        local_id: 'LOCAL-001',
        dni: '26422537'
    },
    {
        correo: 'empleado2@200millas.com',
        contrasena: 'empleado123',
        nombre: 'María García',
        role: 'Empleado',
        local_id: 'LOCAL-001',
        dni: '32993013'
    },
    {
        correo: 'empleado3@200millas.com',
        contrasena: 'empleado123',
        nombre: 'Carlos López',
        role: 'Empleado',
        local_id: 'LOCAL-001',
        dni: '68432197'
    }
];

// Credenciales de prueba para documentación
export const TEST_CREDENTIALS = {
    admin: { correo: 'admin@200millas.com', contrasena: 'admin123' },
    empleado1: { correo: 'empleado1@200millas.com', contrasena: 'empleado123' },
    empleado2: { correo: 'empleado2@200millas.com', contrasena: 'empleado123' },
    empleado3: { correo: 'empleado3@200millas.com', contrasena: 'empleado123' }
};
