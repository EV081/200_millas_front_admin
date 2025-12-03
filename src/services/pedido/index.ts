import type {
    CreatePedidoRequest,
    CreatePedidoResponse,
    PedidoStatusResponse,
    ConfirmarPedidoRequest,
    ConfirmarPedidoResponse,
    ListPedidosRequest,
    ListPedidosResponse,
    IniciarCocinaRequest,
    IniciarCocinaResponse,
    CompletarCocinaRequest,
    CompletarCocinaResponse,
    CompletarEmpaqueRequest,
    CompletarEmpaqueResponse,
    IniciarDeliveryRequest,
    IniciarDeliveryResponse,
    EntregarPedidoRequest,
    EntregarPedidoResponse
} from "@interfaces/pedido";
import Api from "@services/api";

export const createPedido = async (request: CreatePedidoRequest) => {
    const api = await Api.getInstance("clientes");
    const response = await api.post<CreatePedidoRequest, CreatePedidoResponse>(request, { url: "/pedido/create" });
    return response.data;
};

export const getPedidoStatus = async (local_id: string, pedido_id: string) => {
    const api = await Api.getInstance("clientes");
    const response = await api.get<void, PedidoStatusResponse>({
        url: `/pedido/status?local_id=${local_id}&pedido_id=${pedido_id}`
    });
    return response.data;
};

export const confirmarPedido = async (request: ConfirmarPedidoRequest) => {
    const api = await Api.getInstance("clientes");
    const response = await api.post<ConfirmarPedidoRequest, ConfirmarPedidoResponse>(request, { url: "/pedido/confirmar" });
    return response.data;
};

// ========== GESTIÓN DE PEDIDOS (Restaurante) ==========

/**
 * Listar pedidos del restaurante filtrados por estado
 */
export const listPedidosRestaurante = async (request: ListPedidosRequest) => {
    const api = await Api.getInstance("empleado");
    const response = await api.post<ListPedidosRequest, ListPedidosResponse>(
        request,
        { url: "/empleados/pedidos/restaurante" }
    );
    return response.data;
};

// ========== ACCIONES DE CAMBIO DE ESTADO ==========

/**
 * Iniciar preparación en cocina (procesando → cocinando)
 */
export const iniciarCocina = async (request: IniciarCocinaRequest) => {
    const api = await Api.getInstance("empleado");
    const response = await api.post<IniciarCocinaRequest, IniciarCocinaResponse>(
        request,
        { url: "/empleados/cocina/iniciar" }
    );
    return response.data;
};

/**
 * Completar preparación en cocina (cocinando → empacando)
 */
export const completarCocina = async (request: CompletarCocinaRequest) => {
    const api = await Api.getInstance("empleado");
    const response = await api.post<CompletarCocinaRequest, CompletarCocinaResponse>(
        request,
        { url: "/empleados/cocina/completar" }
    );
    return response.data;
};

/**
 * Completar empaquetado (empacando → enviando)
 */
export const completarEmpaque = async (request: CompletarEmpaqueRequest) => {
    const api = await Api.getInstance("empleado");
    const response = await api.post<CompletarEmpaqueRequest, CompletarEmpaqueResponse>(
        request,
        { url: "/empleados/empaque/completar" }
    );
    return response.data;
};

/**
 * Iniciar delivery (enviando → en camino)
 */
export const iniciarDelivery = async (request: IniciarDeliveryRequest) => {
    const api = await Api.getInstance("empleado");
    const response = await api.post<IniciarDeliveryRequest, IniciarDeliveryResponse>(
        request,
        { url: "/empleados/delivery/iniciar" }
    );
    return response.data;
};

/**
 * Entregar pedido (enviando → recibido)
 */
export const entregarPedido = async (request: EntregarPedidoRequest) => {
    const api = await Api.getInstance("empleado");
    const response = await api.post<EntregarPedidoRequest, EntregarPedidoResponse>(
        request,
        { url: "/empleados/delivery/entregar" }
    );
    return response.data;
};
