// Interfaces para Analytics

export interface ExportAnalyticsResponse {
    message: string;
    timestamp: string;
    duration_seconds: number;
    exports: {
        pedidos: {
            s3_key: string;
            total_items: number;
            crawler_started: boolean;
        };
        historial_estados: {
            s3_key: string;
            total_items: number;
            crawler_started: boolean;
        };
    };
    next_steps: string[];
}

export interface PedidosPorLocalRequest {
    local_id: string;
}

export interface PedidosPorLocalResponse {
    query: string;
    local_id: string;
    data: Array<{
        local_id: string;
        total_pedidos: number;
    }>;
}

export interface GananciasPorLocalRequest {
    local_id: string;
}

export interface GananciasPorLocalResponse {
    query: string;
    local_id: string;
    data: Array<{
        local_id: string;
        total_pedidos: number;
        ganancias_totales: number;
        ganancia_promedio: number;
    }>;
}

export interface TiempoPedidoRequest {
    local_id: string;
}

export interface TiempoPedidoResponse {
    query: string;
    local_id: string;
    pagination: {
        page: number;
        page_size: number;
        total_items: number;
        total_pages: number;
        has_next: boolean;
        has_prev: boolean;
    };
    data: Array<{
        local_id: string;
        total_pedidos: number;
        tiempo_promedio_minutos: number;
        tiempo_minimo_minutos: number;
        tiempo_maximo_minutos: number;
    }>;
}

export interface PromedioPorEstadoRequest {
    local_id: string;
}

export interface PromedioPorEstadoResponse {
    query: string;
    local_id: string;
    data: Array<{
        estado: string;
        total_pedidos: number;
        tiempo_promedio_minutos: number;
        tiempo_minimo_minutos: number;
        tiempo_maximo_minutos: number;
        desviacion_estandar: number;
    }>;
}
