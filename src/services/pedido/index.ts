import type {
    CreatePedidoRequest,
    CreatePedidoResponse,
    PedidoStatusResponse,
    ConfirmarPedidoRequest,
    ConfirmarPedidoResponse
} from "@interfaces/pedido";
import Api from "@services/api";

export const createPedido = async (request: CreatePedidoRequest) => {
    const api = await Api.getInstance("clientes");
    return api.post<CreatePedidoRequest, CreatePedidoResponse>(request, { url: "/pedido/create" });
};

export const getPedidoStatus = async (local_id: string, pedido_id: string) => {
    const api = await Api.getInstance("clientes");
    return api.get<void, PedidoStatusResponse>({
        url: `/pedido/status?local_id=${local_id}&pedido_id=${pedido_id}`
    });
};

export const confirmarPedido = async (request: ConfirmarPedidoRequest) => {
    const api = await Api.getInstance("clientes");
    return api.post<ConfirmarPedidoRequest, ConfirmarPedidoResponse>(request, { url: "/pedido/confirmar" });
};
