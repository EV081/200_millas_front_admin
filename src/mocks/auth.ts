import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ChangePasswordRequest } from '@interfaces/auth';
import { MOCK_AUTH_USERS } from './data/users';

const DELAY = 300;

// Generar token único para cada usuario
const generateToken = (correo: string) => `mock-token-${correo.split('@')[0]}-${Date.now()}`;

export const login = async (data: LoginRequest): Promise<{ data: LoginResponse }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = MOCK_AUTH_USERS.find(u => u.correo === data.correo && u.contrasena === data.contrasena);
            
            if (!user) {
                reject(new Error('Credenciales inválidas'));
                return;
            }

            // Bloquear clientes (aunque no hay en los mocks, por consistencia)
            if (user.role.toLowerCase() === 'cliente') {
                reject(new Error('Acceso restringido: esta aplicación es sólo para Admin/Gerente y Empleados'));
                return;
            }

            const response: LoginResponse = {
                token: generateToken(user.correo),
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
                correo: user.correo,
                role: user.role
            };

            resolve({ data: response });
        }, DELAY);
    });
};

export const register = async (data: RegisterRequest): Promise<{ data: RegisterResponse }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Verificar si el usuario ya existe
            const existingUser = MOCK_AUTH_USERS.find(u => u.correo === data.correo);
            
            if (existingUser) {
                reject(new Error('El correo ya está registrado'));
                return;
            }

            // Bloquear registro de clientes en esta app
            if (data.role.toLowerCase() === 'cliente') {
                reject(new Error('No se pueden registrar clientes en esta aplicación'));
                return;
            }

            const response: RegisterResponse = {
                message: 'Usuario registrado exitosamente',
                correo: data.correo
            };

            // En un mock real, agregaríamos el usuario a MOCK_AUTH_USERS
            // pero como es un array constante, solo simulamos la respuesta
            console.log('[MOCK] Usuario registrado:', { nombre: data.nombre, correo: data.correo, role: data.role });

            resolve({ data: response });
        }, DELAY);
    });
};

export const changePassword = async (data: ChangePasswordRequest): Promise<{ message: string }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Validación básica
            if (!data.contrasena_actual || !data.contrasena_nueva) {
                reject(new Error('Contraseña actual y nueva son requeridas'));
                return;
            }

            if (data.contrasena_nueva.length < 6) {
                reject(new Error('La nueva contraseña debe tener al menos 6 caracteres'));
                return;
            }

            // Simular éxito
            resolve({ message: 'Contraseña actualizada correctamente' });
        }, DELAY);
    });
};

// Función helper para obtener usuarios mock (útil para testing)
export const getMockUsers = () => {
    return MOCK_AUTH_USERS.map(({ contrasena, ...user }) => user);
};
