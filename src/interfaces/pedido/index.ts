// Interfaces para Pedidos (Clientes)

export interface ProductoPedido {
    producto_id: string;
    cantidad: number;
}

export interface Pedido {
    local_id: string;
    pedido_id: string;
    correo: string; // Correo del cliente
    productos: ProductoPedido[];
    costo: number;
    direccion: string;
    estado: string;
    created_at: string;
}

export interface CreatePedidoRequest {
    local_id: string;
    productos: ProductoPedido[];
    costo: number;
    direccion: string;
    estado: string;
}

export interface CreatePedidoResponse {
    message: string;
    pedido: Pedido;
}

export interface PedidoStatusResponse {
    local_id: string;
    pedido_id: string;
    estado: string;
}

export interface ConfirmarPedidoRequest {
    order_id: string;
    empleado_id: string;
}

export interface ConfirmarPedidoResponse {
    message: string;
    order_id: string;
}

// Interfaces para listar pedidos del restaurante (Empleados)
export interface ListPedidosRequest {
    local_id: string;
    estado?: string; // Filtro opcional por estado
    next_token?: string; // Para paginación
}

export interface ListPedidosResponse {
    pedidos: Pedido[];
    size: number;
    next_token?: string;
    local_id: string;
}

// Interfaces para acciones de cambio de estado
export interface CambiarEstadoPedidoRequest {
    order_id: string;
    dni: string; // DNI del empleado
    local_id: string; // Local del pedido
}

export interface CambiarEstadoPedidoResponse {
    message: string;
    order_id: string;
}

// Alias para mayor claridad en el código
export type IniciarCocinaRequest = CambiarEstadoPedidoRequest;
export type IniciarCocinaResponse = CambiarEstadoPedidoResponse;

export type CompletarCocinaRequest = CambiarEstadoPedidoRequest;
export type CompletarCocinaResponse = CambiarEstadoPedidoResponse;

export type CompletarEmpaqueRequest = CambiarEstadoPedidoRequest;
export type CompletarEmpaqueResponse = CambiarEstadoPedidoResponse;

export type IniciarDeliveryRequest = CambiarEstadoPedidoRequest;
export type IniciarDeliveryResponse = CambiarEstadoPedidoResponse;

export type EntregarPedidoRequest = CambiarEstadoPedidoRequest;
export type EntregarPedidoResponse = CambiarEstadoPedidoResponse;
