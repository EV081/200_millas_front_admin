import { useState, useEffect } from 'react';
import Header from '@components/Header';
import { useAuth } from '@hooks/useAuth';
import { listProducts, createProduct, updateProduct, deleteProduct } from '@services/product';
import type { Product, CreateProductRequest, UpdateProductRequest } from '@interfaces/product';

const Products = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        descripcion: '',
        categoria: '',
        stock: '',
        imagen_b64: '',
        file_type: 'png'
    });

    const userRole = (user as any)?.role || (user as any)?.rol || '';
    const isAdmin = userRole === 'Admin';
    const localId = 'LOCAL-001';

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const response = await listProducts({ local_id: localId });
            setProducts(response.data.contents || []);
        } catch (error) {
            console.error('Error cargando productos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                nombre: product.nombre,
                precio: product.precio.toString(),
                descripcion: product.descripcion || '',
                categoria: product.categoria,
                stock: product.stock.toString(),
                imagen_b64: '',
                file_type: 'png'
            });
        } else {
            setEditingProduct(null);
            setFormData({
                nombre: '',
                precio: '',
                descripcion: '',
                categoria: '',
                stock: '',
                imagen_b64: '',
                file_type: 'png'
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProduct(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            if (editingProduct) {
                // Actualizar producto
                const updateData: UpdateProductRequest = {
                    local_id: localId,
                    producto_id: editingProduct.producto_id,
                    precio: parseFloat(formData.precio),
                    descripcion: formData.descripcion,
                    stock: parseInt(formData.stock)
                };
                await updateProduct(updateData);
            } else {
                // Crear producto
                const createData: CreateProductRequest = {
                    local_id: localId,
                    nombre: formData.nombre,
                    precio: parseFloat(formData.precio),
                    descripcion: formData.descripcion,
                    categoria: formData.categoria,
                    stock: parseInt(formData.stock),
                    imagen_b64: formData.imagen_b64 || undefined,
                    file_type: formData.file_type as 'png' | 'jpg' | 'jpeg'
                };
                await createProduct(createData);
            }
            
            handleCloseModal();
            loadProducts();
        } catch (error) {
            console.error('Error guardando producto:', error);
            alert('Error al guardar el producto');
        }
    };

    const handleDelete = async (productId: string) => {
        if (!confirm('¿Estás seguro de eliminar este producto?')) return;
        
        try {
            await deleteProduct({ local_id: localId, producto_id: productId });
            loadProducts();
        } catch (error) {
            console.error('Error eliminando producto:', error);
            alert('Error al eliminar el producto');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="container mx-auto p-6">
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Gestión de Productos</h1>
                            <p className="text-gray-600">
                                {isAdmin ? 'Administra' : 'Consulta'} el catálogo de productos
                            </p>
                        </div>
                        {isAdmin && (
                            <button
                                onClick={() => handleOpenModal()}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <span>➕</span>
                                Nuevo Producto
                            </button>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Cargando productos...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <div className="text-6xl mb-4">🍽️</div>
                        <p className="text-gray-500 text-lg">No hay productos registrados</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product.producto_id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                                {product.imagen_url && (
                                    <img 
                                        src={product.imagen_url} 
                                        alt={product.nombre}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                )}
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg">{product.nombre}</h3>
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                            {product.categoria}
                                        </span>
                                    </div>
                                    
                                    {product.descripcion && (
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                            {product.descripcion}
                                        </p>
                                    )}
                                    
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-2xl font-bold text-green-600">
                                            S/ {product.precio.toFixed(2)}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Stock: {product.stock}
                                        </span>
                                    </div>

                                    {isAdmin && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleOpenModal(product)}
                                                className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                                            >
                                                ✏️ Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.producto_id)}
                                                className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                            >
                                                🗑️ Eliminar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal para crear/editar producto */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-4">
                                    {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                                </h2>
                                
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nombre del Producto *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.nombre}
                                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                            disabled={!!editingProduct}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Precio (S/) *
                                            </label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={formData.precio}
                                                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Stock *
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.stock}
                                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Categoría *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.categoria}
                                            onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                                            disabled={!!editingProduct}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                            placeholder="Ej: Ceviches, Bebidas, Postres"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Descripción
                                        </label>
                                        <textarea
                                            value={formData.descripcion}
                                            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Descripción del producto"
                                        />
                                    </div>

                                    {!editingProduct && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Imagen (Base64)
                                            </label>
                                            <textarea
                                                value={formData.imagen_b64}
                                                onChange={(e) => setFormData({ ...formData, imagen_b64: e.target.value })}
                                                rows={2}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                                                placeholder="Pega aquí la imagen en formato Base64 (opcional)"
                                            />
                                        </div>
                                    )}

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            {editingProduct ? 'Actualizar' : 'Crear'} Producto
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Products;
