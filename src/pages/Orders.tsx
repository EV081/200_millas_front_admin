/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from '@components/Header';
import { useAuth } from '@hooks/useAuth';
import { useState, useEffect } from 'react';
import { 
    listPedidosRestaurante,
    iniciarCocina,
    completarCocina,
    completarEmpaque,
    iniciarDelivery,
    entregarPedido
} from '@services/pedido';
import type { Pedido } from '@interfaces/pedido';
import { useLocation as useAppLocation } from '@hooks/useLocation';
import type { JSX } from 'react/jsx-runtime';

type EstadoPedido = 'procesando' | 'en_preparacion' | 'cocina_completa' | 'empaquetando' | 'pedido_en_camino' | 'entrega_delivery' | 'recibido';

interface DNIModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (dni: string) => void;
    accion: string;
    pedidoId: string;
}

const DNIModal = ({ isOpen, onClose, onConfirm, accion, pedidoId }: DNIModalProps) => {
    const [dni, setDni] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (dni.trim()) {
            onConfirm(dni.trim());
            setDni('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-xl font-bold mb-4">Confirmar Acción</h3>
                <p className="text-gray-600 mb-2">
                    <strong>Acción:</strong> {accion}
                </p>
                <p className="text-gray-600 mb-4 text-sm">
                    <strong>Pedido:</strong> #{pedidoId.substring(0, 12)}...
                </p>
                <form onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ingresa tu DNI (ID Empleado)
                    </label>
                    <input
                        type="text"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                        placeholder="Ej: 12345678"
                        required
                        autoFocus
                    />
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setDni('');
                                onClose();
                            }}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Orders = () => {
    const { user } = useAuth();
    const { currentLocation } = useAppLocation();
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(false);
    const [estadoFiltro, setEstadoFiltro] = useState<EstadoPedido | 'todos'>('todos');
    const [actionResult, setActionResult] = useState<{message: string; type: 'success' | 'error'} | null>(null);
    
    // Modal DNI
    const [modalOpen, setModalOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<{
        fn: (dni: string) => Promise<void>;
        nombre: string;
        pedidoId: string;
    } | null>(null);

    const localId = currentLocation.id; // Dinámico desde Header

    const loadPedidos = async (estado: EstadoPedido | 'todos') => {
        setLoading(true);
        try {
            const response = await listPedidosRestaurante({
                local_id: localId,
                estado: estado === 'todos' ? undefined : estado
            });
            setPedidos(response.pedidos || []);
        } catch (error: any) {
            console.error('Error cargando pedidos:', error);
            setActionResult({
                message: 'Error al cargar pedidos: ' + (error.message || 'Error desconocido'),
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPedidos(estadoFiltro);
    }, [estadoFiltro]);

    const prepararAccion = (
        actionFn: (req: { order_id: string; dni: string; local_id: string }) => Promise<any>,
        pedidoId: string,
        nombreAccion: string
    ) => {
        setPendingAction({
            fn: async (dni: string) => {
                setLoading(true);
                setActionResult(null);
                try {
                    const result = await actionFn({ order_id: pedidoId, dni, local_id: localId });
                    setActionResult({
                        message: `✅ ${nombreAccion}: ${result.message}`,
                        type: 'success'
                    });
                    // Recargar pedidos después de 1 segundo
                    setTimeout(() => loadPedidos(estadoFiltro), 1000);
                } catch (error: any) {
                    const errorMsg = error.response?.data?.message || error.message;
                    const statusCode = error.response?.status;
                    
                    let mensaje = `❌ Error en ${nombreAccion}: ${errorMsg}`;
                    
                    if (statusCode === 403) {
                        mensaje = `🚫 Acceso denegado: El empleado con DNI proporcionado no tiene permisos para realizar esta acción.`;
                    } else if (statusCode === 400) {
                        mensaje = `⚠️ Error: DNI no válido o no existe en el sistema.`;
                    }
                    
                    setActionResult({
                        message: mensaje,
                        type: 'error'
                    });
                } finally {
                    setLoading(false);
                }
            },
            nombre: nombreAccion,
            pedidoId: pedidoId
        });
        setModalOpen(true);
    };

    const confirmarConDNI = async (dni: string) => {
        setModalOpen(false);
        if (pendingAction) {
            await pendingAction.fn(dni);
            setPendingAction(null);
        }
    };

    const estados: { value: EstadoPedido | 'todos'; label: string; color: string; icon: string }[] = [
        { value: 'todos', label: 'Todos', color: 'bg-gray-100 text-gray-800', icon: '📋' },
        { value: 'procesando', label: 'Procesando', color: 'bg-indigo-100 text-indigo-800', icon: '🔄' },
        { value: 'en_preparacion', label: 'Cocinando', color: 'bg-orange-100 text-orange-800', icon: '🔥' },
        { value: 'cocina_completa', label: 'Cocina Lista', color: 'bg-lime-100 text-lime-800', icon: '✅' },
        { value: 'empaquetando', label: 'Empaquetando', color: 'bg-purple-100 text-purple-800', icon: '📦' },
        { value: 'pedido_en_camino', label: 'En Camino', color: 'bg-yellow-100 text-yellow-800', icon: '🚚' },
        { value: 'entrega_delivery', label: 'Entregando', color: 'bg-amber-100 text-amber-800', icon: '🏁' },
        { value: 'recibido', label: 'Recibido', color: 'bg-green-100 text-green-800', icon: '✨' },
    ];

    const getAccionesPorEstado = (estado: string, pedidoId: string) => {
        const acciones: JSX.Element[] = [];
        
        if (estado === 'procesando') {
            acciones.push(
                <button
                    key="cocina-iniciar"
                    onClick={() => prepararAccion(
                        (req) => iniciarCocina(req),
                        pedidoId,
                        'Iniciar Cocina'
                    )}
                    disabled={loading}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors text-sm"
                >
                    🔥 Iniciar Cocina
                </button>
            );
        }
        
        if (estado === 'en_preparacion') {
            acciones.push(
                <button
                    key="cocina-completar"
                    onClick={() => prepararAccion(
                        (req) => completarCocina(req),
                        pedidoId,
                        'Completar Cocina'
                    )}
                    disabled={loading}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors text-sm"
                >
                    ✅ Completar Cocina
                </button>
            );
        }
        
        if (estado === 'cocina_completa') {
            acciones.push(
                <button
                    key="empaque-completar"
                    onClick={() => prepararAccion(
                        (req) => completarEmpaque(req),
                        pedidoId,
                        'Completar Empaque'
                    )}
                    disabled={loading}
                    className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors text-sm"
                >
                    📦 Completar Empaque
                </button>
            );
        }
        
        if (estado === 'empaquetando') {
            acciones.push(
                <button
                    key="delivery-iniciar"
                    onClick={() => prepararAccion(
                        (req) => iniciarDelivery(req),
                        pedidoId,
                        'Iniciar Delivery'
                    )}
                    disabled={loading}
                    className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400 transition-colors text-sm"
                >
                    🚚 Iniciar Delivery
                </button>
            );
        }
        
        if (estado === 'pedido_en_camino') {
            acciones.push(
                <button
                    key="delivery-entregar"
                    onClick={() => prepararAccion(
                        (req) => entregarPedido(req),
                        pedidoId,
                        'Entregar Pedido'
                    )}
                    disabled={loading}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors text-sm"
                >
                    ✅ Entregar
                </button>
            );
        }
        
        return acciones;
    };

    const formatFecha = (fecha: string) => {
        return new Date(fecha).toLocaleString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="container mx-auto p-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">📦 Gestión de Pedidos</h1>
                            <p className="text-gray-600">
                                Usuario: <strong>{user?.nombre}</strong> — Rol: <span className="text-blue-600 font-semibold">{user?.role || user?.role}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Notificación de resultado */}
                {actionResult && (
                    <div className={`mb-6 p-4 rounded-lg ${actionResult.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'}`}>
                        <div className="flex justify-between items-center">
                            <p className="font-medium">{actionResult.message}</p>
                            <button 
                                onClick={() => setActionResult(null)}
                                className="text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}

                {/* Filtros por Estado */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">Filtrar por Estado</h2>
                    <div className="flex flex-wrap gap-3">
                        {estados.map((estado) => (
                            <button
                                key={estado.value}
                                onClick={() => setEstadoFiltro(estado.value)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                    estadoFiltro === estado.value
                                        ? 'ring-2 ring-blue-500 ' + estado.color
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                <span className="mr-2">{estado.icon}</span>
                                {estado.label}
                                {estadoFiltro === estado.value && (
                                    <span className="ml-2 bg-white px-2 py-0.5 rounded-full text-xs font-bold">
                                        {pedidos.length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Lista de Pedidos */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">
                            {estadoFiltro === 'todos' ? 'Todos los Pedidos' : `Pedidos en Estado: ${estados.find(e => e.value === estadoFiltro)?.label}`}
                        </h2>
                        <button
                            onClick={() => loadPedidos(estadoFiltro)}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                        >
                            {loading ? '🔄 Cargando...' : '🔄 Actualizar'}
                        </button>
                    </div>

                    {loading && pedidos.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            <p className="mt-4 text-gray-600">Cargando pedidos...</p>
                        </div>
                    ) : pedidos.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                {estadoFiltro === 'todos' 
                                    ? 'No hay pedidos disponibles' 
                                    : `No hay pedidos en estado "${estadoFiltro}"`}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {pedidos.map((pedido) => (
                                <div 
                                    key={pedido.pedido_id}
                                    className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-semibold text-lg">
                                                    Pedido #{pedido.pedido_id.substring(0, 8)}...
                                                </h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    estados.find(e => e.value === pedido.estado)?.color || 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {estados.find(e => e.value === pedido.estado)?.icon} {pedido.estado}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                                <p>
                                                    <span className="font-medium">Cliente:</span> {pedido.correo}
                                                </p>
                                                <p>
                                                    <span className="font-medium">Dirección:</span> {pedido.direccion}
                                                </p>
                                                <p>
                                                    <span className="font-medium">Fecha:</span> {formatFecha(pedido.created_at)}
                                                </p>
                                                <p>
                                                    <span className="font-medium">Costo:</span> <span className="text-green-600 font-bold">S/ {pedido.costo.toFixed(2)}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Productos del pedido */}
                                    <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                                        <p className="text-sm font-medium text-gray-700 mb-2">Productos ({pedido.productos.length}):</p>
                                        <ul className="space-y-1">
                                            {pedido.productos.map((prod, idx) => (
                                                <li key={idx} className="text-sm text-gray-600">
                                                    • {prod.producto_id} <span className="font-medium">x{prod.cantidad}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Acciones disponibles */}
                                    {pedido.estado !== 'recibido' && (
                                        <div className="flex gap-2 pt-3 border-t border-gray-200">
                                            {getAccionesPorEstado(pedido.estado, pedido.pedido_id)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Modal DNI */}
            <DNIModal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setPendingAction(null);
                }}
                onConfirm={confirmarConDNI}
                accion={pendingAction?.nombre || ''}
                pedidoId={pendingAction?.pedidoId || ''}
            />
        </div>
    );
};

export default Orders;
