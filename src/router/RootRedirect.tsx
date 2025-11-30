import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { getDefaultRoute } from '@utils/roleUtils';

export const RootRedirect = () => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const userRole = (user as any)?.role || (user as any)?.rol || '';
    const defaultRoute = getDefaultRoute(userRole);

    return <Navigate to={defaultRoute} replace />;
};
