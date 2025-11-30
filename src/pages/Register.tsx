import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@hooks/useAuth';
import type { RegisterRequest } from '@interfaces/auth';

const Register = () => {
    const navigate = useNavigate();
    const { register: registerService, login: loginService } = useAuth();
    const { register, handleSubmit,  formState: { errors, isSubmitting } } = useForm<RegisterRequest & { confirmPassword?: string; nombre?: string }>();
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: RegisterRequest & { confirmPassword?: string; nombre?: string }) => {
        setError(null);
        if (data.contrasena !== data.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const payload: RegisterRequest = {
                nombre: data.nombre || '',
                correo: data.correo,
                contrasena: data.contrasena,
                role: 'Cliente'
            };
            await registerService(payload);
            // Auto-login after registration
            await loginService({ correo: data.correo, contrasena: data.contrasena });
            navigate('/profile');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err?.response?.data?.message || err?.message || 'Error al registrarse. Intente nuevamente.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary px-4">
            <div className="bg-surface p-8 md:p-12 rounded-lg shadow-2xl w-full max-w-md border border-gray-200">
                <div className="text-center mb-8">
                    <Link to="/" className="text-2xl font-bold tracking-wider text-primary block mb-2">200 MILLAS</Link>
                    <h2 className="text-xl text-text font-light">Crear Cuenta</h2>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">{error}</div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-text-light mb-2">Nombre Completo</label>
                        <input id="nombre" {...register('nombre', { required: 'El nombre es requerido' })} className={`w-full bg-white border border-gray-300 rounded px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors ${errors.nombre ? 'border-red-500' : ''}`} placeholder="Juan Pérez" />
                        {errors.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="correo" className="block text-sm font-medium text-text-light mb-2">Correo Electrónico</label>
                        <input id="correo" type="email" {...register('correo', { required: 'El correo es requerido', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo inválido' } })} className={`w-full bg-white border border-gray-300 rounded px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors ${errors.correo ? 'border-red-500' : ''}`} placeholder="tu@email.com" />
                        {errors.correo && <p className="text-red-600 text-sm mt-1">{errors.correo.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="contrasena" className="block text-sm font-medium text-text-light mb-2">Contraseña</label>
                        <input id="contrasena" type="password" {...register('contrasena', { required: 'La contraseña es requerida', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })} className={`w-full bg-white border border-gray-300 rounded px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors ${errors.contrasena ? 'border-red-500' : ''}`} placeholder="••••••••" />
                        {errors.contrasena && <p className="text-red-600 text-sm mt-1">{errors.contrasena.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-light mb-2">Confirmar Contraseña</label>
                        <input id="confirmPassword" type="password" {...register('confirmPassword', { required: 'Confirma la contraseña' })} className={`w-full bg-white border border-gray-300 rounded px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors ${errors.confirmPassword ? 'border-red-500' : ''}`} placeholder="••••••••" />
                        {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white font-bold py-3 px-4 rounded hover:bg-primary-hover transition-colors uppercase tracking-widest text-sm mt-4 disabled:opacity-50">{isSubmitting ? 'Registrando...' : 'Registrarse'}</button>
                </form>

                <div className="mt-6 text-center text-sm text-text-light">¿Ya tienes una cuenta? <Link to="/login" className="text-primary hover:underline">Inicia Sesión</Link></div>

                <div className="mt-4 text-center"><Link to="/" className="text-sm text-gray-500 hover:text-primary transition-colors">← Volver al Inicio</Link></div>
            </div>
        </div>
    );
};

export default Register;