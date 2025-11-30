import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

export const ProtectedRoute = () => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Block client users — this frontend is only for admin/empleado
    const role = (user as any)?.role || (user as any)?.rol;
    if (!role || role.toLowerCase() === 'cliente') {
        // logout or redirect to login
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};