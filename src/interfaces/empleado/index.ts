// Interfaces para Empleados

export interface Empleado {
    local_id: string;
    dni: string;
    nombre: string;
    apellido: string;
    role: string;
}

export interface CreateEmpleadoRequest {
    local_id: string;
    dni: string;
    nombre: string;
    apellido: string;
    role: string;
}

export interface CreateEmpleadoResponse {
    message: string;
    local_id: string;
    dni: string;
    created_by: string;
    creator_role: string;
}

export interface UpdateEmpleadoRequest {
    local_id: string;
    dni: string;
    nombre?: string;
    apellido?: string;
    role?: string;
}

export interface UpdateEmpleadoResponse {
    message: string;
    empleado: Empleado;
    modificado_por: string;
    rol_solicitante: string;
}

export interface DeleteEmpleadoRequest {
    local_id: string;
    dni: string;
}

export interface DeleteEmpleadoResponse {
    message: string;
    eliminado_por: string;
    rol_solicitante: string;
}

export interface ListEmpleadosRequest {
    local_id: string;
}

export interface ListEmpleadosResponse {
    contents: Empleado[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    solicitado_por: string;
    rol_solicitante: string;
}

// Acciones de empleado
export interface EmpleadoActionRequest {
    order_id: string;
    empleado_id: string;
}

export interface EmpleadoActionResponse {
    message: string;
    order_id: string;
}
