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
import { isMockEnabled } from "@mocks/mockManager";
import * as analyticsMock from "@mocks/analytics";

export const exportAnalytics = async () => {
    if (isMockEnabled()) {
        return analyticsMock.exportAnalytics();
    }
    const api = await Api.getInstance("analytic");
    return api.post<void, ExportAnalyticsResponse>({}, { url: "/analytics/export" });
};

export const getPedidosPorLocal = async (request: PedidosPorLocalRequest) => {
    if (isMockEnabled()) {
        return analyticsMock.getPedidosPorLocal(request);
    }
    const api = await Api.getInstance("analytic");
    return api.post<PedidosPorLocalRequest, PedidosPorLocalResponse>(request, { url: "/analytics/pedidos-por-local" });
};

export const getGananciasPorLocal = async (request: GananciasPorLocalRequest) => {
    if (isMockEnabled()) {
        return analyticsMock.getGananciasPorLocal(request);
    }
    const api = await Api.getInstance("analytic");
    return api.post<GananciasPorLocalRequest, GananciasPorLocalResponse>(request, { url: "/analytics/ganancias-por-local" });
};

export const getTiempoPedido = async (request: TiempoPedidoRequest) => {
    if (isMockEnabled()) {
        return analyticsMock.getTiempoPedido(request);
    }
    const api = await Api.getInstance("analytic");
    return api.post<TiempoPedidoRequest, TiempoPedidoResponse>(request, { url: "/analytics/tiempo-pedido" });
};

export const getPromedioPorEstado = async (request: PromedioPorEstadoRequest) => {
    if (isMockEnabled()) {
        return analyticsMock.getPromedioPorEstado(request);
    }
    const api = await Api.getInstance("analytic");
    return api.post<PromedioPorEstadoRequest, PromedioPorEstadoResponse>(request, { url: "/analytics/promedio-por-estado" });
};
