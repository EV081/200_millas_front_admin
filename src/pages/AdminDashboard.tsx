import Header from '@components/Header';
import { useAuth } from '@hooks/useAuth';
import { Link } from 'react-router-dom';
import { listEmpleados } from '@services/empleado';
import { listProducts } from '@services/product';
import { useEffect, useState } from 'react';
import type { Empleado } from '@interfaces/empleado';
import type { Product } from '@interfaces/product';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [employees, setEmployees] = useState<Empleado[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        const load = async () => {
            try {
                const [empResponse, prodResponse] = await Promise.all([
                    listEmpleados({ local_id: 'LOCAL-001' }),
                    listProducts({ local_id: 'LOCAL-001' })
                ]);
                
                if (!active) return;
                
                setEmployees(empResponse.data.contents || []);
                setProducts(prodResponse.data.contents || []);
            } catch (error) {
                console.error('Error cargando datos:', error);
            } finally {
                setLoading(false);
            }
        };
        load();
        return () => { active = false; };
    }, []);

    const userRole = (user as any)?.role || (user as any)?.rol || '';

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="container mx-auto p-6">
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
                    <p className="text-gray-600">
                        Bienvenido, <strong>{user?.nombre}</strong> — Rol: <span className="text-blue-600 font-semibold">{userRole}</span>
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Cargando datos...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <Link 
                                to="#" 
                                className="bg-white p-6 border-2 border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-400 transition-all"
                            >
                                <div className="text-4xl mb-2">👥</div>
                                <h3 className="font-semibold text-lg">Gestión de Empleados</h3>
                                <p className="text-3xl font-bold text-blue-600">{employees.length}</p>
                                <p className="text-sm text-gray-500">empleados registrados</p>
                            </Link>
                            
                            <Link 
                                to="/products" 
                                className="bg-white p-6 border-2 border-gray-200 rounded-lg hover:shadow-lg hover:border-green-400 transition-all"
                            >
                                <div className="text-4xl mb-2">🍽️</div>
                                <h3 className="font-semibold text-lg">Gestión de Productos</h3>
                                <p className="text-3xl font-bold text-green-600">{products.length}</p>
                                <p className="text-sm text-gray-500">productos en catálogo</p>
                            </Link>
                            
                            <Link 
                                to="/analytics" 
                                className="bg-white p-6 border-2 border-gray-200 rounded-lg hover:shadow-lg hover:border-purple-400 transition-all"
                            >
                                <div className="text-4xl mb-2">📊</div>
                                <h3 className="font-semibold text-lg">Analytics</h3>
                                <p className="text-sm text-gray-500 mt-2">Ver reportes y estadísticas</p>
                            </Link>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <span>👥</span>
                                Empleados Registrados
                            </h2>
                            {employees.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No hay empleados registrados</p>
                            ) : (
                                <div className="space-y-2">
                                    {employees.map((e) => (
                                        <div key={e.dni} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center hover:bg-gray-50">
                                            <div>
                                                <span className="font-semibold">{e.nombre} {e.apellido}</span>
                                                <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                    {e.role}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-500">DNI: {e.dni}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
