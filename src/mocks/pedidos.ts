import type {
    CreatePedidoRequest,
    CreatePedidoResponse,
    PedidoStatusResponse,
    ConfirmarPedidoRequest,
    ConfirmarPedidoResponse
} from '@interfaces/pedido';

const DELAY = 300;

// Estados posibles de un pedido
const ESTADOS = [
    'procesando',
    'confirmado',
    'en_preparacion',
    'cocina_completa',
    'empaquetado',
    'pedido_en_camino',
    'recibido'
];

// Almacenamiento temporal de pedidos (se reinicia en cada recarga)
const pedidosStorage: Map<string, any> = new Map();

export const createPedido = async (request: CreatePedidoRequest): Promise<{ data: CreatePedidoResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const pedido_id = 'mock-pedido-' + Date.now();
            const pedido = {
                local_id: request.local_id,
                pedido_id,
                tenant_id_usuario: 'mock#user@200millas.com',
                productos: request.productos,
                costo: request.costo.toString(),
                direccion: request.direccion,
                estado: request.estado,
                created_at: new Date().toISOString()
            };
            
            // Guardar en storage temporal
            pedidosStorage.set(pedido_id, pedido);
            
            const response: CreatePedidoResponse = {
                message: 'Pedido registrado',
                pedido
            };
            resolve({ data: response });
        }, DELAY);
    });
};

export const getPedidoStatus = async (local_id: string, pedido_id: string): Promise<{ data: PedidoStatusResponse }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const pedido = pedidosStorage.get(pedido_id);
            if (pedido) {
                const response: PedidoStatusResponse = {
                    local_id: pedido.local_id,
                    pedido_id: pedido.pedido_id,
                    estado: pedido.estado
                };
                resolve({ data: response });
            } else {
                // Si no existe, simular un pedido con estado aleatorio
                const estadoAleatorio = ESTADOS[Math.floor(Math.random() * ESTADOS.length)];
                const response: PedidoStatusResponse = {
                    local_id,
                    pedido_id,
                    estado: estadoAleatorio
                };
                resolve({ data: response });
            }
        }, DELAY);
    });
};

export const confirmarPedido = async (request: ConfirmarPedidoRequest): Promise<{ data: ConfirmarPedidoResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Actualizar estado si existe
            const pedido = pedidosStorage.get(request.order_id);
            if (pedido) {
                pedido.estado = 'confirmado';
                pedidosStorage.set(request.order_id, pedido);
            }
            
            const response: ConfirmarPedidoResponse = {
                message: 'ConfirmarPedidoCliente event published',
                order_id: request.order_id
            };
            resolve({ data: response });
        }, DELAY);
    });
};
