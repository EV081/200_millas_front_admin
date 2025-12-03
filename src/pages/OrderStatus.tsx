/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { getPedidoStatus } from '@services/pedido';
import { useLocation as useAppLocation } from '@hooks/useLocation';

const OrderStatus = () => {
    const { orderId } = useParams();
    const { currentLocation } = useAppLocation();
    const [currentStatus, setCurrentStatus] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadOrderStatus = async () => {
            if (!orderId) return;
            
            setLoading(true);
            try {
                const response = await getPedidoStatus(currentLocation.id, orderId);
                setCurrentStatus(response.estado);
            } catch (err: any) {
                setError(err.message || 'Error al cargar el estado del pedido');
            } finally {
                setLoading(false);
            }
        };
        
        loadOrderStatus();
    }, [orderId, currentLocation.id]);

    const getProgressPercentage = (estado: string) => {
        const currentState = estado.toLowerCase();
        switch (currentState) {
            case 'procesando': return 25;
            case 'en_preparacion': return 37.5;
            case 'cocina_completa': return 50;
            case 'empaquetando': return 62.5;
            case 'pedido_en_camino': return 75;
            case 'entrega_delivery': return 87.5;
            case 'recibido': return 100;
            case 'cancelado': return 0;
            default: return 0;
        }
    };

    // Estados reales del API con labels simplificados para UI
    const allSteps = [
        { key: 'procesando', label: 'Procesando', icon: '🔄' },
        { key: 'en_preparacion', label: 'Cocinando', icon: '🔥' },
        { key: 'cocina_completa', label: 'Cocina Lista', icon: '✅' },
        { key: 'empaquetando', label: 'Empaquetando', icon: '📦' },
        { key: 'pedido_en_camino', label: 'En Camino', icon: '🚚' },
        { key: 'entrega_delivery', label: 'Entregando', icon: '🏁' },
        { key: 'recibido', label: 'Recibido', icon: '✨' }
    ];

    const currentProgress = getProgressPercentage(currentStatus);
    const currentStepIndex = allSteps.findIndex(s => s.key === currentStatus.toLowerCase());

    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-secondary)]">
            <Header />
            <main className="flex-grow pt-24 pb-12 px-4 container mx-auto max-w-2xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">Estado del Pedido</h1>
                    <p className="text-[var(--color-primary)] text-xl">#{orderId}</p>
                </div>

                <div className="bg-[var(--color-surface)] rounded-lg p-8 border border-gray-200 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
                        <div 
                            className="h-full bg-[var(--color-primary)] transition-all duration-500"
                            style={{ width: `${currentProgress}%` }}
                        ></div>
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
                            <p className="mt-4 text-gray-600">Cargando estado del pedido...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-8">
                            <p className="text-red-600">❌ {error}</p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-8 relative">
                                {/* Vertical Line */}
                                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-200 -z-10"></div>

                                {allSteps.map((step, index) => {
                                    const isCompleted = index <= currentStepIndex;
                                    const isCurrent = index === currentStepIndex;
                                    
                                    return (
                                        <div key={step.key} className="flex items-start gap-6">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                                                isCompleted
                                                    ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                                                    : 'bg-white border-gray-300 text-gray-400'
                                                } ${isCurrent ? 'ring-4 ring-[var(--color-primary)]/20 scale-110' : ''}`}>
                                                {isCompleted ? (
                                                    <span className="text-lg">{step.icon}</span>
                                                ) : (
                                                    <span className="text-sm font-bold">{index + 1}</span>
                                                )}
                                            </div>
                                            <div className="flex-grow pt-1">
                                                <h3 className={`text-lg font-bold ${isCompleted ? 'text-[var(--color-primary)]' : 'text-gray-500'}`}>
                                                    {step.label}
                                                    {isCurrent && <span className="ml-2 text-sm font-normal">(Actual)</span>}
                                                </h3>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>

                <div className="text-center mt-12">
                    <Link
                        to="/"
                        className="text-[var(--color-primary)] hover:underline"
                    >
                        Volver al Inicio
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default OrderStatus;