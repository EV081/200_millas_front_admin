import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoleBasedRoute } from "./RoleBasedRoute";
import { RootRedirect } from "./RootRedirect";
import { AnonymousRoute } from "./AnonymousRoute";
import Login from "@pages/Login";
import AdminDashboard from "@pages/AdminDashboard";
import EmployeeDashboard from "@pages/EmployeeDashboard";
import Analytics from "@pages/Analytics";
import Products from "@pages/Products";
import Orders from "@pages/Orders";
import App from "../App";
import { ROLES } from "@utils/roleUtils";

export const router = createBrowserRouter([
    {
        element: <App />,
        children: [
            // Root redirect - intelligent routing based on auth status and role
            { 
                index: true, 
                element: <RootRedirect /> 
            },

            // Auth Routes (Anonymous only)
            {
                element: <AnonymousRoute />,
                children: [
                    { path: "login", element: <Login /> },
                ],
            },

            // Protected Routes - All authenticated users (solo requieren token)
            {
                element: <ProtectedRoute />,
                children: [
                    // Admin Dashboard - Solo requiere autenticación
                    {
                        path: "dashboard",
                        element: <AdminDashboard />,
                    },

                    // Analytics - Admin y Gerente únicamente
                    {
                        path: "analytics",
                        element: (
                            <RoleBasedRoute 
                                allowedRoles={[ROLES.ADMIN, ROLES.GERENTE]} 
                                redirectTo="/dashboard"
                            />
                        ),
                        children: [
                            { index: true, element: <Analytics /> },
                        ],
                    },

                    // Products - Solo requiere autenticación
                    {
                        path: "products",
                        element: <Products />,
                    },

                    // Employee Dashboard - Solo requiere autenticación
                    {
                        path: "dashboard/employee",
                        element: <EmployeeDashboard />,
                    },

                    // Orders - Gestión de pedidos, solo requiere autenticación
                    {
                        path: "orders",
                        element: <Orders />,
                    },
                ],
            },

            // 404 -> go to login by default
            { path: "*", element: <Navigate to="/login" replace /> },
        ],
    },
]);