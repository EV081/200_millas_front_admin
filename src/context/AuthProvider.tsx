import { useUserStore } from "@store/useUserStore";
import { useTokenStore } from "@store/useTokenStore";
import { AuthContext } from "./context";
import { useEffect, type ReactNode } from "react";
import Api from "@services/api";
import type { LoginRequest, RegisterRequest } from "@interfaces/auth";
import { login as loginService, register as registerService } from "@services/auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { token, setToken } = useTokenStore();
    const { user, setUser } = useUserStore();


    useEffect(() => {
        // Synchronize token with Api instance
        Api.getInstance("default").then(
            () => Api.setGlobalToken(token)
        );
    }, [token]);

    const login = async (data: LoginRequest) => {
        const response = await loginService(data);
        console.log('Login response:', response);
        if (response.token) {
            // detect role key (backend may return 'role' or 'rol')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const role = response.rol || '';
            
            // Block clients — this frontend is only for admin/empleado
            if (role && role.toString().toLowerCase() === 'cliente') {
                throw new Error('Acceso restringido: esta aplicación es sólo para Admin/Gerente y Empleados');
            }

            setToken(response.token);
            setUser({
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                nombre: (response as any).nombre || response.correo.split('@')[0],
                correo: response.correo,
                role: role
            });
        }
    };

    const register = async (data: RegisterRequest) => {
        await registerService(data);
        // Auto-login logic is handled in the component or we can do it here if we want
        // For now, just register.
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    const refreshUser = async () => {
        // Implement if there's a /me endpoint, otherwise rely on stored user
        // For this refactor, we'll keep it simple as per example
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!token,
            login,
            register,
            logout,
            refreshUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};