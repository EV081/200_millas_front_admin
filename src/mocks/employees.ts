import { MOCK_EMPLOYEES } from './data/employees';
import type {
    CreateEmpleadoRequest,
    CreateEmpleadoResponse,
    UpdateEmpleadoRequest,
    UpdateEmpleadoResponse,
    DeleteEmpleadoRequest,
    DeleteEmpleadoResponse,
    ListEmpleadosRequest,
    ListEmpleadosResponse
} from '@interfaces/empleado';

const DELAY = 300;

export const listEmployees = async (request: ListEmpleadosRequest): Promise<{ data: ListEmpleadosResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const contents = MOCK_EMPLOYEES.filter(e => e.local_id === request.local_id);
            const response: ListEmpleadosResponse = {
                contents,
                page: 0,
                size: contents.length,
                totalElements: contents.length,
                totalPages: 1,
                solicitado_por: 'mock@200millas.com',
                rol_solicitante: 'Gerente'
            };
            resolve({ data: response });
        }, DELAY);
    });
};

export const createEmployee = async (request: CreateEmpleadoRequest): Promise<{ data: CreateEmpleadoResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const response: CreateEmpleadoResponse = {
                message: 'Empleado registrado',
                local_id: request.local_id,
                dni: request.dni,
                created_by: 'mock@200millas.com',
                creator_role: 'Gerente'
            };
            resolve({ data: response });
        }, DELAY);
    });
};

export const updateEmployee = async (request: UpdateEmpleadoRequest): Promise<{ data: UpdateEmpleadoResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const empleado = MOCK_EMPLOYEES.find(
                e => e.local_id === request.local_id && e.dni === request.dni
            );
            const response: UpdateEmpleadoResponse = {
                message: 'Empleado actualizado correctamente',
                empleado: empleado ? { ...empleado, ...request } : {
                    local_id: request.local_id,
                    dni: request.dni,
                    nombre: request.nombre || '',
                    apellido: request.apellido || '',
                    role: request.role || ''
                },
                modificado_por: 'mock@200millas.com',
                rol_solicitante: 'Gerente'
            };
            resolve({ data: response });
        }, DELAY);
    });
};

export const deleteEmployee = async (request: DeleteEmpleadoRequest): Promise<{ data: DeleteEmpleadoResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const response: DeleteEmpleadoResponse = {
                message: 'Empleado eliminado correctamente',
                eliminado_por: 'mock@200millas.com',
                rol_solicitante: 'Gerente'
            };
            resolve({ data: response });
        }, DELAY);
    });
};
