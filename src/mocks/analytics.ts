import type {
    ExportAnalyticsResponse,
    PedidosPorLocalRequest,
    PedidosPorLocalResponse,
    GananciasPorLocalRequest,
    GananciasPorLocalResponse,
    TiempoPedidoRequest,
    TiempoPedidoResponse,
    PromedioPorEstadoRequest,
    PromedioPorEstadoResponse
} from '@interfaces/analytics';

const DELAY = 300;

export const exportAnalytics = async (): Promise<{ data: ExportAnalyticsResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const response: ExportAnalyticsResponse = {
                message: 'Exportación completada exitosamente',
                timestamp: new Date().toISOString(),
                duration_seconds: 11.49,
                exports: {
                    pedidos: {
                        s3_key: `pedidos/data_${new Date().toISOString().split('T')[0].replace(/-/g, '')}.json`,
                        total_items: 40,
                        crawler_started: true
                    },
                    historial_estados: {
                        s3_key: `historial_estados/data_${new Date().toISOString().split('T')[0].replace(/-/g, '')}.json`,
                        total_items: 106,
                        crawler_started: true
                    }
                },
                next_steps: [
                    'Los crawlers están procesando los datos (1-2 minutos)',
                    'Las tablas estarán disponibles en Glue Database: millas_analytics_db',
                    'Puedes consultar los endpoints de analytics después'
                ]
            };
            resolve({ data: response });
        }, DELAY);
    });
};

export const getPedidosPorLocal = async (request: PedidosPorLocalRequest): Promise<{ data: PedidosPorLocalResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const response: PedidosPorLocalResponse = {
                query: 'Total de pedidos por local',
                local_id: request.local_id,
                data: [{
                    local_id: request.local_id,
                    total_pedidos: Math.floor(Math.random() * 50) + 5
                }]
            };
            resolve({ data: response });
        }, DELAY);
    });
};

export const getGananciasPorLocal = async (request: GananciasPorLocalRequest): Promise<{ data: GananciasPorLocalResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const totalPedidos = Math.floor(Math.random() * 50) + 5;
            const gananciasTotales = Math.floor(Math.random() * 5000) + 1000;
            const response: GananciasPorLocalResponse = {
                query: 'Ganancias totales por local',
                local_id: request.local_id,
                data: [{
                    local_id: request.local_id,
                    total_pedidos: totalPedidos,
                    ganancias_totales: gananciasTotales,
                    ganancia_promedio: gananciasTotales / totalPedidos
                }]
            };
            resolve({ data: response });
        }, DELAY);
    });
};

export const getTiempoPedido = async (request: TiempoPedidoRequest): Promise<{ data: TiempoPedidoResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const response: TiempoPedidoResponse = {
                query: 'Tiempo total de pedido (procesado -> recibido) por local',
                local_id: request.local_id,
                pagination: {
                    page: 1,
                    page_size: 10,
                    total_items: 1,
                    total_pages: 1,
                    has_next: false,
                    has_prev: false
                },
                data: [{
                    local_id: request.local_id,
                    total_pedidos: Math.floor(Math.random() * 20) + 5,
                    tiempo_promedio_minutos: Math.floor(Math.random() * 30) + 30,
                    tiempo_minimo_minutos: Math.floor(Math.random() * 20) + 20,
                    tiempo_maximo_minutos: Math.floor(Math.random() * 20) + 50
                }]
            };
            resolve({ data: response });
        }, DELAY);
    });
};

export const getPromedioPorEstado = async (request: PromedioPorEstadoRequest): Promise<{ data: PromedioPorEstadoResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const estados = ['procesando', 'cocinando', 'empacando', 'enviando', 'recibido'];
            const response: PromedioPorEstadoResponse = {
                query: 'Promedio de tiempo por estado',
                local_id: request.local_id,
                data: estados.map(estado => ({
                    estado,
                    total_pedidos: Math.floor(Math.random() * 20) + 5,
                    tiempo_promedio_minutos: Math.floor(Math.random() * 15) + 5,
                    tiempo_minimo_minutos: Math.floor(Math.random() * 5) + 2,
                    tiempo_maximo_minutos: Math.floor(Math.random() * 10) + 10,
                    desviacion_estandar: Math.random() * 5 + 2
                }))
            };
            resolve({ data: response });
        }, DELAY);
    });
};
