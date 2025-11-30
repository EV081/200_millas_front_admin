import { useState, useEffect } from 'react';
import Header from '@components/Header';
import { useAuth } from '@hooks/useAuth';
import {
    exportAnalytics,
    getPedidosPorLocal,
    getGananciasPorLocal,
    getTiempoPedido,
    getPromedioPorEstado
} from '@services/analytics';
import type {
    PedidosPorLocalResponse,
    GananciasPorLocalResponse,
    TiempoPedidoResponse,
    PromedioPorEstadoResponse
} from '@interfaces/analytics';

const Analytics = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [localId, setLocalId] = useState('LOCAL-001');
    const [exportStatus, setExportStatus] = useState<string | null>(null);
    
    // Estados para cada tipo de analítica
    const [pedidosData, setPedidosData] = useState<PedidosPorLocalResponse | null>(null);
    const [gananciasData, setGananciasData] = useState<GananciasPorLocalResponse | null>(null);
    const [tiempoData, setTiempoData] = useState<TiempoPedidoResponse | null>(null);
    const [estadosData, setEstadosData] = useState<PromedioPorEstadoResponse | null>(null);

    const loadAllAnalytics = async () => {
        setLoading(true);
        try {
            const [pedidos, ganancias, tiempo, estados] = await Promise.all([
                getPedidosPorLocal({ local_id: localId }),
                getGananciasPorLocal({ local_id: localId }),
                getTiempoPedido({ local_id: localId }),
                getPromedioPorEstado({ local_id: localId })
            ]);

            setPedidosData(pedidos.data);
            setGananciasData(ganancias.data);
            setTiempoData(tiempo.data);
            setEstadosData(estados.data);
        } catch (error) {
            console.error('Error cargando analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllAnalytics();
    }, [localId]);

    const handleExport = async () => {
        setLoading(true);
        setExportStatus(null);
        try {
            const response = await exportAnalytics();
            setExportStatus(`✅ ${response.data.message}`);
            // Recargar datos después de exportar
            setTimeout(() => loadAllAnalytics(), 2000);
        } catch (error: any) {
            setExportStatus(`❌ Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const userRole = (user as any)?.role || (user as any)?.rol || '';

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="container mx-auto p-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h1 className="text-3xl font-bold mb-2">📊 Analytics</h1>
                    <p className="text-gray-600">
                        Panel de análisis y estadísticas — <strong>{user?.nombre}</strong> ({userRole})
                    </p>
                </div>

                {/* Controles */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Local ID
                            </label>
                            <input
                                type="text"
                                value={localId}
                                onChange={(e) => setLocalId(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="LOCAL-001"
                            />
                        </div>
                        <button
                            onClick={loadAllAnalytics}
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                        >
                            {loading ? 'Cargando...' : '🔄 Actualizar Datos'}
                        </button>
                        <button
                            onClick={handleExport}
                            disabled={loading}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                        >
                            📤 Exportar Datos
                        </button>
                    </div>
                    {exportStatus && (
                        <div className={`mt-4 p-3 rounded-lg ${exportStatus.startsWith('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                            {exportStatus}
                        </div>
                    )}
                </div>

                {loading && !pedidosData ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Cargando datos...</p>
                    </div>
                ) : (
                    <>
                        {/* Resumen General */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            {/* Total Pedidos */}
                            {pedidosData && pedidosData.data[0] && (
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-lg font-semibold">Total Pedidos</h3>
                                        <span className="text-3xl">📦</span>
                                    </div>
                                    <p className="text-4xl font-bold">{pedidosData.data[0].total_pedidos}</p>
                                    <p className="text-blue-100 text-sm mt-2">Local: {pedidosData.data[0].local_id}</p>
                                </div>
                            )}

                            {/* Ganancias Totales */}
                            {gananciasData && gananciasData.data[0] && (
                                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-lg font-semibold">Ganancias Totales</h3>
                                        <span className="text-3xl">💰</span>
                                    </div>
                                    <p className="text-4xl font-bold">
                                        S/ {gananciasData.data[0].ganancias_totales.toFixed(2)}
                                    </p>
                                    <p className="text-green-100 text-sm mt-2">
                                        Promedio: S/ {gananciasData.data[0].ganancia_promedio.toFixed(2)}
                                    </p>
                                </div>
                            )}

                            {/* Tiempo Promedio */}
                            {tiempoData && tiempoData.data[0] && (
                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-lg font-semibold">Tiempo Promedio</h3>
                                        <span className="text-3xl">⏱️</span>
                                    </div>
                                    <p className="text-4xl font-bold">
                                        {tiempoData.data[0].tiempo_promedio_minutos} min
                                    </p>
                                    <p className="text-purple-100 text-sm mt-2">
                                        Min: {tiempoData.data[0].tiempo_minimo_minutos} | Max: {tiempoData.data[0].tiempo_maximo_minutos}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Tiempo por Estado */}
                        {estadosData && (
                            <div className="bg-white rounded-lg shadow p-6 mb-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span>⏱️</span>
                                    Tiempo Promedio por Estado
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
                                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Pedidos</th>
                                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Promedio (min)</th>
                                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Mínimo (min)</th>
                                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Máximo (min)</th>
                                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Desv. Est.</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {estadosData.data.map((estado, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                            {estado.estado}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">{estado.total_pedidos}</td>
                                                    <td className="px-4 py-3 text-center font-semibold">
                                                        {estado.tiempo_promedio_minutos.toFixed(1)}
                                                    </td>
                                                    <td className="px-4 py-3 text-center text-green-600">
                                                        {estado.tiempo_minimo_minutos}
                                                    </td>
                                                    <td className="px-4 py-3 text-center text-red-600">
                                                        {estado.tiempo_maximo_minutos}
                                                    </td>
                                                    <td className="px-4 py-3 text-center text-gray-600">
                                                        {estado.desviacion_estandar.toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Detalles de Tiempo de Pedido */}
                        {tiempoData && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <span>📊</span>
                                    Análisis de Tiempo de Pedidos
                                </h2>
                                <div className="space-y-4">
                                    {tiempoData.data.map((item, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex justify-between items-center mb-3">
                                                <h3 className="font-semibold text-lg">Local: {item.local_id}</h3>
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                                    {item.total_pedidos} pedidos
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="text-center p-3 bg-gray-50 rounded">
                                                    <p className="text-sm text-gray-600">Tiempo Promedio</p>
                                                    <p className="text-2xl font-bold text-blue-600">
                                                        {item.tiempo_promedio_minutos} min
                                                    </p>
                                                </div>
                                                <div className="text-center p-3 bg-green-50 rounded">
                                                    <p className="text-sm text-gray-600">Tiempo Mínimo</p>
                                                    <p className="text-2xl font-bold text-green-600">
                                                        {item.tiempo_minimo_minutos} min
                                                    </p>
                                                </div>
                                                <div className="text-center p-3 bg-red-50 rounded">
                                                    <p className="text-sm text-gray-600">Tiempo Máximo</p>
                                                    <p className="text-2xl font-bold text-red-600">
                                                        {item.tiempo_maximo_minutos} min
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Paginación */}
                                {tiempoData.pagination && (
                                    <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                                        <p>
                                            Página {tiempoData.pagination.page} de {tiempoData.pagination.total_pages}
                                        </p>
                                        <p>
                                            Total: {tiempoData.pagination.total_items} registros
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default Analytics;
