import { useParams, Link } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';

const OrderStatus = () => {
    const { orderId } = useParams();

    // Mock status steps
    const steps = [
        { status: 'Recibido', completed: true, time: '12:30 PM' },
        { status: 'En Preparación', completed: true, time: '12:35 PM' },
        { status: 'Listo para Servir', completed: false, time: '--:--' },
    ];

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
                        <div className="h-full bg-[var(--color-primary)] w-2/3"></div>
                    </div>

                    <div className="space-y-8 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-200 -z-10"></div>

                        {steps.map((step, index) => (
                            <div key={index} className="flex items-start gap-6">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${step.completed
                                    ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                                    : 'bg-white border-gray-300 text-gray-400'
                                    }`}>
                                    {step.completed ? (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <span className="text-sm font-bold">{index + 1}</span>
                                    )}
                                </div>
                                <div className="flex-grow pt-1">
                                    <h3 className={`text-lg font-bold ${step.completed ? 'text-[var(--color-primary)]' : 'text-gray-500'}`}>
                                        {step.status}
                                    </h3>
                                    <p className="text-sm text-gray-500">{step.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
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