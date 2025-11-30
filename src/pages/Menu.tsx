import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '@services/product';
import type { Product } from '@interfaces/product';

const CATEGORIES = [
    'Todos',
    'Promos Fast',
    'Express',
    'Promociones',
    'Sopas Power',
    'Bowls Del Tigre',
    'Leche de Tigre',
    'Ceviches',
    'Fritazo',
    'Mostrimar',
    'Box Marino',
    'Duos Marinos',
    'Trios Marinos',
    'Dobles',
    'Rondas Marinas',
    'Mega Marino',
    'Familiares'
];

const Menu = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState<{ id: string, name: string, price: number, quantity: number }[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await getProducts();
                setProducts(response.contents);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredItems = products.filter(item => {
        const matchesSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' || item.categoria === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const addToCart = (item: Product) => {
        setCart(prev => {
            // Use item.nombre + item.local_id as a unique key if id is missing, or just use local_id + name
            // The API definition says PK is local_id and SK is nombre.
            // For the cart, we need a unique identifier.
            const itemId = `${item.local_id}-${item.nombre}`;

            const existing = prev.find(i => i.id === itemId);
            if (existing) {
                return prev.map(i => i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { id: itemId, name: item.nombre, price: item.precio, quantity: 1 }];
        });
    };

    const goToOrder = () => {
        navigate('/order', { state: { cart } });
    };

    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-secondary)]">
            <Header />
            <main className="flex-grow pt-24 pb-12 px-4 container mx-auto">
                <h1 className="text-4xl font-bold text-[var(--color-text)] mb-8 text-center">Nuestra Carta</h1>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                    <div className="w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder="Buscar platos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[var(--color-surface)] border border-gray-300 rounded px-4 py-2 text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center max-h-40 overflow-y-auto p-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm transition-colors whitespace-nowrap ${selectedCategory === cat
                                    ? 'bg-[var(--color-primary)] text-white font-bold'
                                    : 'bg-[var(--color-surface)] text-[var(--color-text-light)] hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto"></div>
                        <p className="mt-4 text-[var(--color-text-light)]">Cargando carta...</p>
                    </div>
                )}

                {/* Menu Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map((item, index) => (
                            <div key={`${item.local_id}-${item.nombre}-${index}`} className="bg-[var(--color-surface)] rounded-lg overflow-hidden border border-gray-200 hover:border-[var(--color-primary)] transition-colors group shadow-sm hover:shadow-md">
                                <div className="h-48 overflow-hidden relative">
                                    {item.imagen_url ? (
                                        <img
                                            src={item.imagen_url}
                                            alt={item.nombre}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                            <span className="text-4xl">🍽️</span>
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 bg-[var(--color-primary)] text-white px-3 py-1 rounded-full text-sm font-bold">
                                        S/ {item.precio}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">{item.nombre}</h3>
                                    <p className="text-[var(--color-text-light)] text-sm mb-4 line-clamp-2">{item.descripcion}</p>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="w-full py-2 border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors rounded text-sm uppercase tracking-wider font-semibold"
                                    >
                                        Agregar al Pedido
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Floating Cart Button */}
                {cart.length > 0 && (
                    <div className="fixed bottom-8 right-8 z-50">
                        <button
                            onClick={goToOrder}
                            className="bg-[var(--color-primary)] text-white px-6 py-4 rounded-full shadow-lg font-bold flex items-center gap-3 hover:bg-[var(--color-primary-hover)] transition-transform hover:scale-105"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Ver Pedido ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                        </button>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Menu;