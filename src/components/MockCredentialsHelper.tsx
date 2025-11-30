import { useState } from 'react';
import { isMockEnabled } from '@mocks/mockManager';
import { TEST_CREDENTIALS } from '@mocks/data/users';

const MockCredentialsHelper = () => {
    const [isOpen, setIsOpen] = useState(false);

    if (!isMockEnabled()) {
        return null;
    }

    const credentials = [
        { label: 'Admin', ...TEST_CREDENTIALS.admin, role: 'Admin' },
        { label: 'Gerente', ...TEST_CREDENTIALS.gerente, role: 'Gerente' },
        { label: 'Cocinero', ...TEST_CREDENTIALS.cocinero, role: 'Cocinero' },
        { label: 'Repartidor', ...TEST_CREDENTIALS.repartidor, role: 'Repartidor' },
        { label: 'Despachador', ...TEST_CREDENTIALS.despachador, role: 'Despachador' }
    ];

    return (
        <div className="mt-6 border-t pt-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-2"
            >
                <span>🧪</span>
                <span>{isOpen ? 'Ocultar' : 'Ver'} Credenciales de Prueba (Mock)</span>
                <span>{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-xs text-blue-800 mb-3 font-semibold">
                        ℹ️ Modo Mock Activo - Usa estas credenciales para testing:
                    </p>
                    <div className="space-y-2">
                        {credentials.map((cred) => (
                            <div key={cred.label} className="bg-white rounded p-2 text-xs border border-blue-100">
                                <div className="font-semibold text-blue-900 mb-1">
                                    {cred.label} <span className="text-gray-500 font-normal">({cred.role})</span>
                                </div>
                                <div className="text-gray-700 space-y-0.5">
                                    <div>📧 {cred.correo}</div>
                                    <div>🔑 {cred.contrasena}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-blue-700 mt-3">
                        💡 Tip: Copia y pega las credenciales en el formulario
                    </p>
                </div>
            )}
        </div>
    );
};

export default MockCredentialsHelper;
