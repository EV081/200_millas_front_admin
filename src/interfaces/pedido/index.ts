// Interfaces para Pedidos (Clientes)

export interface ProductoPedido {
    producto_id: string;
    cantidad: number;
}

export interface Pedido {
    local_id: string;
    pedido_id: string;
    tenant_id_usuario: string;
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
