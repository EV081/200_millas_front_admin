import { useState } from 'react';
import { testAllMocks } from '@mocks/testMocks';
import Header from '@components/Header';

const TestMocks = () => {
    const [testing, setTesting] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    const runTests = async () => {
        setTesting(true);
        setLogs([]);
        
        // Capturar console.log
        const originalLog = console.log;
        const originalError = console.error;
        const capturedLogs: string[] = [];
        
        console.log = (...args: any[]) => {
            const message = args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            capturedLogs.push(message);
            originalLog(...args);
        };
        
        console.error = (...args: any[]) => {
            const message = '❌ ' + args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            capturedLogs.push(message);
            originalError(...args);
        };
        
        try {
            await testAllMocks();
        } catch (error) {
            capturedLogs.push(`❌ Error general: ${error}`);
        }
        
        // Restaurar console.log
        console.log = originalLog;
        console.error = originalError;
        
        setLogs(capturedLogs);
        setTesting(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="container mx-auto p-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-2">Prueba de Servicios Mockeados</h1>
                    <p className="text-gray-600 mb-6">
                        Esta página ejecuta todas las funciones mock para verificar que funcionan correctamente.
                    </p>

                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <button
                            onClick={runTests}
                            disabled={testing}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                                testing
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                        >
                            {testing ? 'Ejecutando pruebas...' : 'Ejecutar Pruebas de Mocks'}
                        </button>
                    </div>

                    {logs.length > 0 && (
                        <div className="bg-gray-900 text-green-400 rounded-lg shadow p-6 font-mono text-sm">
                            <h2 className="text-xl font-bold mb-4 text-white">Resultados:</h2>
                            <div className="space-y-1">
                                {logs.map((log, index) => (
                                    <div key={index} className="whitespace-pre-wrap">
                                        {log}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="font-semibold text-blue-900 mb-2">ℹ️ Información</h3>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Los mocks están configurados en <code className="bg-blue-100 px-1 rounded">src/mocks/</code></li>
                            <li>• Para habilitar/deshabilitar mocks, edita <code className="bg-blue-100 px-1 rounded">VITE_USE_MOCK</code> en el archivo <code className="bg-blue-100 px-1 rounded">.env</code></li>
                            <li>• Los mocks simulan latencia de red (300ms) para una experiencia realista</li>
                            <li>• Revisa la consola del navegador para ver logs detallados</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TestMocks;
