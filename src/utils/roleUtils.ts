// Utilidades para manejo de roles - Sistema con Admin, Gerente y Empleado

export const ROLES = {
    ADMIN: 'Admin',
    GERENTE: 'Gerente',
    EMPLEADO: 'Empleado',
    CLIENTE: 'Cliente'
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const isAdmin = (role?: string): boolean => {
    return role?.toLowerCase() === ROLES.ADMIN.toLowerCase();
};

export const isGerente = (role?: string): boolean => {
    return role?.toLowerCase() === ROLES.GERENTE.toLowerCase();
};

export const isEmpleado = (role?: string): boolean => {
    return role?.toLowerCase() === ROLES.EMPLEADO.toLowerCase();
};

export const isCliente = (role?: string): boolean => {
    return role?.toLowerCase() === ROLES.CLIENTE.toLowerCase();
};

// Permisos de Admin
export const canManageEmployees = (role?: string): boolean => {
    return isAdmin(role);
};

export const canManageProducts = (role?: string): boolean => {
    return isAdmin(role);
};

// Analytics - Admin y Gerente
export const canViewAnalytics = (role?: string): boolean => {
    return isAdmin(role) || isGerente(role);
};

// Permisos de Empleado
export const canAccessEmpleadoActions = (role?: string): boolean => {
    return isEmpleado(role);
};

// Redirección por defecto
export const getDefaultRoute = (role?: string): string => {
    if (isAdmin(role)) {
        return '/dashboard';
    }
    if (isGerente(role)) {
        return '/analytics';
    }
    if (isEmpleado(role)) {
        return '/dashboard/employee';
    }
    return '/login';
};
