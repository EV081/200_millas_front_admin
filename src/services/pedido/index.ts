import type {
    CreatePedidoRequest,
    CreatePedidoResponse,
    PedidoStatusResponse,
    ConfirmarPedidoRequest,
    ConfirmarPedidoResponse
} from "@interfaces/pedido";
import Api from "@services/api";
import { isMockEnabled } from "@mocks/mockManager";
import * as pedidoMock from "@mocks/pedidos";

export const createPedido = async (request: CreatePedidoRequest) => {
    if (isMockEnabled()) {
        return pedidoMock.createPedido(request);
    }
    const api = await Api.getInstance("clientes");
    return api.post<CreatePedidoRequest, CreatePedidoResponse>(request, { url: "/pedido/create" });
};

export const getPedidoStatus = async (local_id: string, pedido_id: string) => {
    if (isMockEnabled()) {
        return pedidoMock.getPedidoStatus(local_id, pedido_id);
    }
    const api = await Api.getInstance("clientes");
    return api.get<void, PedidoStatusResponse>({
        url: `/pedido/status?local_id=${local_id}&pedido_id=${pedido_id}`
    });
};

export const confirmarPedido = async (request: ConfirmarPedidoRequest) => {
    if (isMockEnabled()) {
        return pedidoMock.confirmarPedido(request);
    }
    const api = await Api.getInstance("clientes");
    return api.post<ConfirmarPedidoRequest, ConfirmarPedidoResponse>(request, { url: "/pedido/confirmar" });
};
