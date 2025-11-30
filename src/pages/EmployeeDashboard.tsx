import Header from '@components/Header';
import { useAuth } from '@hooks/useAuth';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    cocinaIniciar, 
    cocinaCompletar, 
    empaqueCompletar, 
    deliveryIniciar, 
    deliveryEntregar 
} from '@services/empleado';

const EmployeeDashboard = () => {
    const { user } = useAuth();
    const [lastActionResult, setLastActionResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('mock-order-' + Date.now());

    const userRole = (user as any)?.role || (user as any)?.rol || '';
    const empleadoId = (user as any)?.dni || 'mock-dni';

    const runAction = async (actionFn: any, actionName: string) => {
        setLoading(true);
        try {
            const res = await actionFn({ 
                order_id: orderId, 
                empleado_id: empleadoId 
            });
            setLastActionResult({
                success: true,
                action: actionName,
                data: res.data,
                timestamp: new Date().toISOString()
            });
        } catch (error: any) {
            setLastActionResult({
                success: false,
                action: actionName,
                error: error.message,
                timestamp: new Date().toISOString()
            });
        } finally {
            setLoading(false);
        }
    };

    // Todos los empleados tienen acceso a todas las acciones
    const isEmpleado = userRole === 'Empleado';
    const showAllActions = isEmpleado;

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="container mx-auto p-6">
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Panel de Empleado</h1>
                            <p className="text-gray-600">
                                Hola, <strong>{user?.nombre}</strong> — Rol: <span className="text-blue-600 font-semibold">{userRole}</span>
                            </p>
                        </div>
                        <Link 
                            to="/products"
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                            <span>🍽️</span>
                            Ver Productos
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        ID del Pedido
                    </label>
                    <input
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ingresa el ID del pedido"
                    />
                </div>

                {/* Acciones de Cocina */}
                {showAllActions && (
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <span>👨‍🍳</span>
                            Acciones de Cocina
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={() => runAction(cocinaIniciar, 'Cocina: Iniciar')}
                                disabled={loading}
                                className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
                            >
                                🔥 Iniciar Preparación
                            </button>
                            <button
                                onClick={() => runAction(cocinaCompletar, 'Cocina: Completar')}
                                disabled={loading}
                                className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-colors"
                            >
                                ✅ Completar Preparación
                            </button>
                        </div>
                    </div>
                )}

                {/* Acciones de Empaque */}
                {showAllActions && (
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <span>📦</span>
                            Acciones de Empaque
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                            <button
                                onClick={() => runAction(empaqueCompletar, 'Empaque: Completar')}
                                disabled={loading}
                                className="p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-gray-400 transition-colors"
                            >
                                📦 Completar Empaquetado
                            </button>
                        </div>
                    </div>
                )}

                {/* Acciones de Delivery */}
                {showAllActions && (
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <span>🚚</span>
                            Acciones de Delivery
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={() => runAction(deliveryIniciar, 'Delivery: Iniciar')}
                                disabled={loading}
                                className="p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 transition-colors"
                            >
                                🚚 Iniciar Delivery
                            </button>
                            <button
                                onClick={() => runAction(deliveryEntregar, 'Delivery: Entregar')}
                                disabled={loading}
                                className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition-colors"
                            >
                                ✅ Confirmar Entrega
                            </button>
                        </div>
                    </div>
                )}

                {/* Resultado de la última acción */}
                {lastActionResult && (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            {lastActionResult.success ? '✅' : '❌'}
                            Resultado de la Última Acción
                        </h3>
                        <div className={`p-4 rounded-lg ${lastActionResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                            <pre className="text-sm overflow-auto">
                                {JSON.stringify(lastActionResult, null, 2)}
                            </pre>
                        </div>
                    </div>
                )}

                {!showAllActions && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                        <p className="text-yellow-800">
                            No tienes acciones disponibles para tu rol actual.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default EmployeeDashboard;
