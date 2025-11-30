// Utilidades para manejo de roles - Sistema simplificado con 2 roles

export const ROLES = {
    ADMIN: 'Admin',
    EMPLEADO: 'Empleado',
    CLIENTE: 'Cliente'
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const isAdmin = (role?: string): boolean => {
    return role?.toLowerCase() === ROLES.ADMIN.toLowerCase();
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

export const canViewAnalytics = (role?: string): boolean => {
    return isAdmin(role);
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
    if (isEmpleado(role)) {
        return '/dashboard/employee';
    }
    return '/login';
};
