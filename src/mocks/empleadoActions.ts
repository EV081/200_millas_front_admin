import type { EmpleadoActionRequest, EmpleadoActionResponse } from '@interfaces/empleado';

const DELAY = 200;

export const cocinaIniciar = async (request: EmpleadoActionRequest): Promise<{ data: EmpleadoActionResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const response: EmpleadoActionResponse = {
                message: 'EnPreparacion event published',
                order_id: request.order_id
            };
            resolve({ data: response });
        }, DELAY);
    });
};

export const cocinaCompletar = async (request: EmpleadoActionRequest): Promise<{ data: EmpleadoActionResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const response: EmpleadoActionResponse = {
                message: 'CocinaCompleta event published',
                order_id: request.order_id
            };
            resolve({ data: response });
        }, DELAY);
    });
};

export const empaqueCompletar = async (request: EmpleadoActionRequest): Promise<{ data: EmpleadoActionResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const response: EmpleadoActionResponse = {
                message: 'Empaquetado event published',
                order_id: request.order_id
            };
            resolve({ data: response });
        }, DELAY);
    });
};

export const deliveryIniciar = async (request: EmpleadoActionRequest): Promise<{ data: EmpleadoActionResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const response: EmpleadoActionResponse = {
                message: 'PedidoEnCamino event published',
                order_id: request.order_id
            };
            resolve({ data: response });
        }, DELAY);
    });
};

export const deliveryEntregar = async (request: EmpleadoActionRequest): Promise<{ data: EmpleadoActionResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const response: EmpleadoActionResponse = {
                message: 'EntregaDelivery event published',
                order_id: request.order_id
            };
            resolve({ data: response });
        }, DELAY);
    });
};
