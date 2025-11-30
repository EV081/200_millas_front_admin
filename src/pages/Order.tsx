/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';

const Order = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const cart = location.state?.cart || [];

    const total = cart.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

    const handleCreateOrder = () => {
        // TODO: Implement actual order creation API call
        const orderId = Math.floor(Math.random() * 10000);
        navigate(`/order-status/${orderId}`);
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col bg-[var(--color-secondary)]">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl text-white mb-4">Tu pedido está vacío</h2>
                        <button
                            onClick={() => navigate('/menu')}
                            className="text-[var(--color-primary)] hover:underline"
                        >
                            Volver a la carta
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-secondary)]">
            <Header />
            <main className="flex-grow pt-24 pb-12 px-4 container mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold text-white mb-8">Resumen del Pedido</h1>

                <div className="bg-[var(--color-surface)] rounded-lg p-6 border border-gray-800 mb-8">
                    {cart.map((item: any) => (
                        <div key={item.id} className="flex justify-between items-center py-4 border-b border-gray-800 last:border-0">
                            <div>
                                <h3 className="text-white font-bold">{item.name}</h3>
                                <p className="text-gray-400 text-sm">Cantidad: {item.quantity}</p>
                            </div>
                            <p className="text-[var(--color-primary)] font-bold">S/ {item.price * item.quantity}</p>
                        </div>
                    ))}

                    <div className="mt-6 pt-6 border-t border-gray-700 flex justify-between items-center">
                        <span className="text-xl text-white font-bold">Total</span>
                        <span className="text-2xl text-[var(--color-primary)] font-bold">S/ {total}</span>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => navigate('/menu')}
                        className="px-6 py-3 border border-gray-600 text-gray-300 rounded hover:border-white hover:text-white transition-colors"
                    >
                        Seguir Pidiendo
                    </button>
                    <button
                        onClick={handleCreateOrder}
                        className="px-8 py-3 bg-[var(--color-primary)] text-black font-bold rounded hover:bg-[var(--color-primary-hover)] transition-colors uppercase tracking-widest"
                    >
                        Confirmar Pedido
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Order;