import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '@context/context';
import type { LoginRequest } from '@interfaces/auth';
import { useNavigate } from 'react-router-dom';
import MockCredentialsHelper from '@components/MockCredentialsHelper';

const Login = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginRequest>();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    if (!auth) {
        return <div>Auth context no disponible</div>;
    }

    const onSubmit = async (data: LoginRequest) => {
        setErrorMessage(null);
        try {
            await auth.login(data);
            
            // Redirigir según el rol del usuario
            const userRole = (auth.user as any)?.role || (auth.user as any)?.rol || '';
            const isAdminOrGerente = ['admin', 'gerente'].includes(userRole.toLowerCase());
            
            if (isAdminOrGerente) {
                navigate('/dashboard');
            } else {
                navigate('/dashboard/employee');
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setErrorMessage(err?.response?.data?.message || err?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded shadow">
                <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>

                {errorMessage && (
                    <div className="bg-red-100 text-red-800 p-2 rounded mb-4">{errorMessage}</div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                        <input
                            type="email"
                            className={`w-full border rounded px-3 py-2 ${errors.correo ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('correo', {
                                required: 'El correo es requerido',
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo inválido' }
                            })}
                        />
                        {errors.correo && <p className="text-red-600 text-sm mt-1">{errors.correo.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            className={`w-full border rounded px-3 py-2 ${errors.contrasena ? 'border-red-500' : 'border-gray-300'}`}
                            {...register('contrasena', { required: 'La contraseña es requerida' })}
                        />
                        {errors.contrasena && <p className="text-red-600 text-sm mt-1">{errors.contrasena.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded hover:opacity-95 disabled:opacity-60"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Iniciando...' : 'Iniciar sesión'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">Contacto de TI para crear cuentas de Admin/Empleado.</p>

                <MockCredentialsHelper />
            </div>
        </div>
    );
};

export default Login;