import { useState } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useAuth } from '@hooks/useAuth';
import { changePassword } from '@services/auth';

const Profile = () => {
    const { user, refreshUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nombre: user?.nombre || '',
        contrasena: ''
    });
    const [passwordData, setPasswordData] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await refreshUser();
            setMessage({ type: 'success', text: 'Perfil actualizado correctamente' });
            setIsEditing(false);
        } catch (error) {
            setMessage({ type: 'error', text: 'Error al actualizar perfil' });
            console.error(error);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.new !== passwordData.confirm) {
            setMessage({ type: 'error', text: 'Las contraseñas nuevas no coinciden' });
            return;
        }
        try {
            await changePassword({
                contrasena_actual: passwordData.current,
                contrasena_nueva: passwordData.new
            });
            setMessage({ type: 'success', text: 'Contraseña actualizada correctamente' });
            setPasswordData({ current: '', new: '', confirm: '' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Error al cambiar contraseña' });
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-secondary)]">
            <Header />
            <main className="flex-grow pt-24 pb-12 px-4 container mx-auto max-w-5xl">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-2">
                        Hola, {user?.nombre?.split(' ')[0]} 👋
                    </h1>
                    <p className="text-[var(--color-text-light)] text-lg">
                        Bienvenido a tu espacio personal en 200 Millas
                    </p>
                </div>

                {message.text && (
                    <div className={`p-4 rounded-lg mb-8 shadow-sm border flex items-center gap-3 ${message.type === 'success'
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-red-50 border-red-200 text-red-700'
                        }`}>
                        <span className="text-xl">{message.type === 'success' ? '✅' : '⚠️'}</span>
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Personal Info Card */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                            <div className="bg-blue-50 p-3 rounded-full text-2xl">👤</div>
                            <div>
                                <h2 className="text-xl font-bold text-[var(--color-text)]">Información Personal</h2>
                                <p className="text-sm text-[var(--color-text-light)]">Gestiona tus datos básicos</p>
                            </div>
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleUpdateProfile} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Nombre Completo</label>
                                    <input
                                        type="text"
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="submit" className="flex-1 bg-[var(--color-primary)] text-white px-4 py-2.5 rounded-lg hover:bg-[var(--color-primary-hover)] font-medium transition-colors">
                                        Guardar Cambios
                                    </button>
                                    <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors">
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-6">
                                <div className="group">
                                    <p className="text-xs uppercase tracking-wider text-[var(--color-text-light)] mb-1">Nombre</p>
                                    <p className="font-medium text-lg text-[var(--color-text)]">{user?.nombre}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-[var(--color-text-light)] mb-1">Correo Electrónico</p>
                                    <p className="font-medium text-lg text-[var(--color-text)]">{user?.correo}</p>
                                </div>

                                <button
                                    onClick={() => {
                                        setFormData({ ...formData, nombre: user?.nombre || '' });
                                        setIsEditing(true);
                                    }}
                                    className="w-full mt-4 py-2.5 border-2 border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white font-bold transition-all text-sm uppercase tracking-wide"
                                >
                                    Editar Mis Datos
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Security Card */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                            <div className="bg-orange-50 p-3 rounded-full text-2xl">🔒</div>
                            <div>
                                <h2 className="text-xl font-bold text-[var(--color-text)]">Seguridad</h2>
                                <p className="text-sm text-[var(--color-text-light)]">Actualiza tu contraseña</p>
                            </div>
                        </div>

                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Contraseña Actual</label>
                                <input
                                    type="password"
                                    value={passwordData.current}
                                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        value={passwordData.new}
                                        onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">Confirmar</label>
                                    <input
                                        type="password"
                                        value={passwordData.confirm}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-black font-bold transition-colors mt-2 shadow-md hover:shadow-lg transform active:scale-[0.98] duration-200">
                                Actualizar Contraseña
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;