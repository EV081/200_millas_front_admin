import type {
    CreateEmpleadoRequest,
    CreateEmpleadoResponse,
    UpdateEmpleadoRequest,
    UpdateEmpleadoResponse,
    DeleteEmpleadoRequest,
    DeleteEmpleadoResponse,
    ListEmpleadosRequest,
    ListEmpleadosResponse,
    EmpleadoActionRequest,
    EmpleadoActionResponse
} from "@interfaces/empleado";
import Api from "@services/api";

// Gestión de empleados (Admin/Gerente)
export const listEmpleados = async (request: ListEmpleadosRequest) => {
    const api = await Api.getInstance("users");
    return api.post<ListEmpleadosRequest, ListEmpleadosResponse>(request, { url: "/users/employees/list" });
};

export const createEmpleado = async (request: CreateEmpleadoRequest) => {
    const api = await Api.getInstance("users");
    return api.post<CreateEmpleadoRequest, CreateEmpleadoResponse>(request, { url: "/users/employee" });
};

export const updateEmpleado = async (request: UpdateEmpleadoRequest) => {
    const api = await Api.getInstance("users");
    return api.put<UpdateEmpleadoRequest, UpdateEmpleadoResponse>(request, { url: "/users/employee" });
};

export const deleteEmpleado = async (request: DeleteEmpleadoRequest) => {
    const api = await Api.getInstance("users");
    return api.delete({ url: "/users/employee", data: request });
};

// Acciones de empleado (Cocina, Empaque, Delivery)
export const cocinaIniciar = async (request: EmpleadoActionRequest) => {
    const api = await Api.getInstance("empleado");
    return api.post<EmpleadoActionRequest, EmpleadoActionResponse>(request, { url: "/empleados/cocina/iniciar" });
};

export const cocinaCompletar = async (request: EmpleadoActionRequest) => {
    const api = await Api.getInstance("empleado");
    return api.post<EmpleadoActionRequest, EmpleadoActionResponse>(request, { url: "/empleados/cocina/completar" });
};

export const empaqueCompletar = async (request: EmpleadoActionRequest) => {
    const api = await Api.getInstance("empleado");
    return api.post<EmpleadoActionRequest, EmpleadoActionResponse>(request, { url: "/empleados/empaque/completar" });
};

export const deliveryIniciar = async (request: EmpleadoActionRequest) => {
    const api = await Api.getInstance("empleado");
    return api.post<EmpleadoActionRequest, EmpleadoActionResponse>(request, { url: "/empleados/delivery/iniciar" });
};

export const deliveryEntregar = async (request: EmpleadoActionRequest) => {
    const api = await Api.getInstance("empleado");
    return api.post<EmpleadoActionRequest, EmpleadoActionResponse>(request, { url: "/empleados/delivery/entregar" });
};
