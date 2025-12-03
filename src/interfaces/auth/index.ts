export interface User {
    nombre: string;
    correo: string;
    role?: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

export interface LoginRequest {
    correo: string;
    contrasena: string;
}

export interface LoginResponse {
    token: string;
    expires: string;
    correo: string;
    rol: string;
}

export interface RegisterRequest {
    nombre: string;
    correo: string;
    contrasena: string;
    rol: string;
}

export interface RegisterResponse {
    message: string;
    correo: string;
    rol: string;
}


export interface ChangePasswordRequest {
    contrasena_actual: string;
    contrasena_nueva: string;
}