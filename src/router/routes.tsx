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

            // Protected Routes - All authenticated users
            {
                element: <ProtectedRoute />,
                children: [
                    // Admin Dashboard
                    {
                        path: "dashboard",
                        element: (
                            <RoleBasedRoute 
                                allowedRoles={[ROLES.ADMIN]} 
                                redirectTo="/dashboard/employee"
                            />
                        ),
                        children: [
                            { index: true, element: <AdminDashboard /> },
                        ],
                    },

                    // Analytics - Admin only
                    {
                        path: "analytics",
                        element: (
                            <RoleBasedRoute 
                                allowedRoles={[ROLES.ADMIN]} 
                                redirectTo="/dashboard/employee"
                            />
                        ),
                        children: [
                            { index: true, element: <Analytics /> },
                        ],
                    },

                    // Products - Admin and Empleado
                    {
                        path: "products",
                        element: (
                            <RoleBasedRoute 
                                allowedRoles={[ROLES.ADMIN, ROLES.EMPLEADO]} 
                                redirectTo="/dashboard"
                            />
                        ),
                        children: [
                            { index: true, element: <Products /> },
                        ],
                    },

                    // Employee Dashboard - Empleados only
                    {
                        path: "dashboard/employee",
                        element: (
                            <RoleBasedRoute 
                                allowedRoles={[ROLES.EMPLEADO]} 
                                redirectTo="/dashboard"
                            />
                        ),
                        children: [
                            { index: true, element: <EmployeeDashboard /> },
                        ],
                    },
                ],
            },

            // 404 -> go to login by default
            { path: "*", element: <Navigate to="/login" replace /> },
        ],
    },
]);