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
} from "@interfaces/analytics";
import Api from "@services/api";

export const exportAnalytics = async () => {
    const api = await Api.getInstance("analytic");
    const response = await api.post<undefined, ExportAnalyticsResponse>(undefined, { url: "/analytics/export" });
    return response.data;
};

export const getPedidosPorLocal = async (request: PedidosPorLocalRequest) => {
    const api = await Api.getInstance("analytic");
    const response = await api.post<PedidosPorLocalRequest, PedidosPorLocalResponse>(request, { url: "/analytics/pedidos-por-local" });
    return response.data;
};

export const getGananciasPorLocal = async (request: GananciasPorLocalRequest) => {
    const api = await Api.getInstance("analytic");
    const response = await api.post<GananciasPorLocalRequest, GananciasPorLocalResponse>(request, { url: "/analytics/ganancias-por-local" });
    return response.data;
};

export const getTiempoPedido = async (request: TiempoPedidoRequest) => {
    const api = await Api.getInstance("analytic");
    const response = await api.post<TiempoPedidoRequest, TiempoPedidoResponse>(request, { url: "/analytics/tiempo-pedido" });
    return response.data;
};

export const getPromedioPorEstado = async (request: PromedioPorEstadoRequest) => {
    const api = await Api.getInstance("analytic");
    const response = await api.post<PromedioPorEstadoRequest, PromedioPorEstadoResponse>(request, { url: "/analytics/promedio-por-estado" });
    return response.data;
}
