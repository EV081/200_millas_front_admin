export const isMockEnabled = () => {
    // Por defecto habilitamos mock si la variable de entorno no está definida
    // Para deshabilitar en producción, establecer VITE_USE_MOCK=false
    // import.meta.env es inyectado por Vite
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const env = (import.meta as any).env || {};
    const val = env.VITE_USE_MOCK;
    if (typeof val === 'undefined') return true;
    return String(val).toLowerCase() === 'true';
};
