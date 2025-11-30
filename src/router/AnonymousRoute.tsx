import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

export const AnonymousRoute = () => {
    const { isAuthenticated, user } = useAuth();

    if (isAuthenticated) {
        // Redirect authenticated users to the appropriate dashboard
        const role = (user as any)?.role || (user as any)?.rol || '';
        const lower = role.toLowerCase();
        if (lower === 'gerente' || lower === 'admin') {
            return <Navigate to="/dashboard" replace />;
        }
        // other staff roles go to employee dashboard
        return <Navigate to="/dashboard/employee" replace />;
    }

    return <Outlet />;
};