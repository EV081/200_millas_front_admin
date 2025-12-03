import type {
    CreateEmpleadoRequest,
    CreateEmpleadoResponse,
    UpdateEmpleadoRequest,
    UpdateEmpleadoResponse,
    DeleteEmpleadoRequest,
    ListEmpleadosRequest,
    ListEmpleadosResponse,
    EmpleadoActionRequest,
    EmpleadoActionResponse
} from "@interfaces/empleado";
import type {
    ListPedidosRequest,
    ListPedidosResponse
} from "@interfaces/pedido";
import Api from "@services/api";

// Gestión de empleados (Admin/Gerente)
export const listEmpleados = async (request: ListEmpleadosRequest) => {
    const api = await Api.getInstance("users");
    const response = await api.post<ListEmpleadosRequest, ListEmpleadosResponse>(request, { url: "/users/employees/list" });
    return response.data;
};

export const createEmpleado = async (request: CreateEmpleadoRequest) => {
    const api = await Api.getInstance("users");
    const response = await api.post<CreateEmpleadoRequest, CreateEmpleadoResponse>(request, { url: "/users/employee" });
    return response.data;
};

export const updateEmpleado = async (request: UpdateEmpleadoRequest) => {
    const api = await Api.getInstance("users");
    const response = await api.put<UpdateEmpleadoRequest, UpdateEmpleadoResponse>(request, { url: "/users/employee" });
    return response.data;
};

export const deleteEmpleado = async (request: DeleteEmpleadoRequest) => {
    const api = await Api.getInstance("users");
    const response = await api.delete({ url: "/users/employee", data: request });
    return response.data;
};

// Listar pedidos del restaurante (Empleados)
export const listPedidosRestaurante = async (request: ListPedidosRequest) => {
    const api = await Api.getInstance("empleado");
    const response = await api.post<ListPedidosRequest, ListPedidosResponse>(request, { url: "/empleados/pedidos/restaurante" });
    return response.data;
};

// Acciones de empleado (Cocina, Empaque, Delivery)
export const cocinaIniciar = async (request: EmpleadoActionRequest) => {
    const api = await Api.getInstance("empleado");
    const response = await api.post<EmpleadoActionRequest, EmpleadoActionResponse>(request, { url: "/empleados/cocina/iniciar" });
    return response.data;
};

export const cocinaCompletar = async (request: EmpleadoActionRequest) => {
    const api = await Api.getInstance("empleado");
    const response = await api.post<EmpleadoActionRequest, EmpleadoActionResponse>(request, { url: "/empleados/cocina/completar" });
    return response.data;
};

export const empaqueCompletar = async (request: EmpleadoActionRequest) => {
    const api = await Api.getInstance("empleado");
    const response = await api.post<EmpleadoActionRequest, EmpleadoActionResponse>(request, { url: "/empleados/empaque/completar" });
    return response.data;
};

export const deliveryIniciar = async (request: EmpleadoActionRequest) => {
    const api = await Api.getInstance("empleado");
    const response = await api.post<EmpleadoActionRequest, EmpleadoActionResponse>(request, { url: "/empleados/delivery/iniciar" });
    return response.data;
};

export const deliveryEntregar = async (request: EmpleadoActionRequest) => {
    const api = await Api.getInstance("empleado");
    const response = await api.post<EmpleadoActionRequest, EmpleadoActionResponse>(request, { url: "/empleados/delivery/entregar" });
    return response.data;
};
