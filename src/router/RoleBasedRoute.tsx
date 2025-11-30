import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

interface RoleBasedRouteProps {
    allowedRoles: string[];
    redirectTo?: string;
}

export const RoleBasedRoute = ({ allowedRoles, redirectTo = '/dashboard' }: RoleBasedRouteProps) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const userRole = (user as any)?.role || (user as any)?.rol || '';
    const hasAccess = allowedRoles.some(role => 
        userRole.toLowerCase() === role.toLowerCase()
    );

    if (!hasAccess) {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />;
};
