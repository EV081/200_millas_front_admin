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
import { isMockEnabled } from "@mocks/mockManager";
import * as empleadoMock from "@mocks/employees";
import * as empleadoActionsMock from "@mocks/empleadoActions";

// Gestión de empleados (Admin/Gerente)
export const listEmpleados = async (request: ListEmpleadosRequest) => {
    if (isMockEnabled()) {
        return empleadoMock.listEmployees(request);
    }
    const api = await Api.getInstance("users");
    return api.post<ListEmpleadosRequest, ListEmpleadosResponse>(request, { url: "/users/employees/list" });
};

export const createEmpleado = async (request: CreateEmpleadoRequest) => {
    if (isMockEnabled()) {
        return empleadoMock.createEmployee(request);
    }
    const api = await Api.getInstance("users");
    return api.post<CreateEmpleadoRequest, CreateEmpleadoResponse>(request, { url: "/users/employee" });
};

export const updateEmpleado = async (request: UpdateEmpleadoRequest) => {
    if (isMockEnabled()) {
        return empleadoMock.updateEmployee(request);
    }
    const api = await Api.getInstance("users");
    return api.put<UpdateEmpleadoRequest, UpdateEmpleadoResponse>(request, { url: "/users/employee" });
};

export const deleteEmpleado = async (request: DeleteEmpleadoRequest) => {
    if (isMockEnabled()) {
        return empleadoMock.deleteEmployee(request);
    }
    const api = await Api.getInstance("users");
    return api.delete({ url: "/users/employee", data: request });
};

// Acciones de empleado (Cocina, Empaque, Delivery)
export const cocinaIniciar = async (request: EmpleadoActionRequest) => {
    if (isMockEnabled()) {
        return empleadoActionsMock.cocinaIniciar(request);
    }
    const api = await Api.getInstance("empleado");
    return api.post<EmpleadoActionRequest, EmpleadoActionResponse>(request, { url: "/empleados/cocina/iniciar" });
};

export const cocinaCompletar = async (request: EmpleadoActionRequest) => {
    if (isMockEnabled()) {
        return empleadoActionsMock.cocinaCompletar(request);
    }
    const api = await Api.getInstance("empleado");
    return api.post<EmpleadoActionRequest, EmpleadoActionResponse>(request, { url: "/empleados/cocina/completar" });
};

export const empaqueCompletar = async (request: EmpleadoActionRequest) => {
    if (isMockEnabled()) {
        return empleadoActionsMock.empaqueCompletar(request);
    }
    const api = await Api.getInstance("empleado");
    return api.post<EmpleadoActionRequest, EmpleadoActionResponse>(request, { url: "/empleados/empaque/completar" });
};

export const deliveryIniciar = async (request: EmpleadoActionRequest) => {
    if (isMockEnabled()) {
        return empleadoActionsMock.deliveryIniciar(request);
    }
    const api = await Api.getInstance("empleado");
    return api.post<EmpleadoActionRequest, EmpleadoActionResponse>(request, { url: "/empleados/delivery/iniciar" });
};

export const deliveryEntregar = async (request: EmpleadoActionRequest) => {
    if (isMockEnabled()) {
        return empleadoActionsMock.deliveryEntregar(request);
    }
    const api = await Api.getInstance("empleado");
    return api.post<EmpleadoActionRequest, EmpleadoActionResponse>(request, { url: "/empleados/delivery/entregar" });
};
