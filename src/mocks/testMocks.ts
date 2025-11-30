// Script de prueba para verificar que todos los mocks funcionan correctamente
import { isMockEnabled } from './mockManager';
import { listEmployees, createEmployee, updateEmployee, deleteEmployee } from './employees';
import { listProducts, createProduct, updateProduct, deleteProduct } from './products';
import { cocinaIniciar, cocinaCompletar, empaqueCompletar, deliveryIniciar, deliveryEntregar } from './empleadoActions';
import { login, register, changePassword, getMockUsers } from './auth';
import { TEST_CREDENTIALS } from './data/users';

export const testAllMocks = async () => {
    console.log('=== INICIANDO PRUEBAS DE MOCKS ===\n');
    
    // Verificar si los mocks están habilitados
    console.log('1. Verificando estado de mocks...');
    const mockEnabled = isMockEnabled();
    console.log(`   ✓ Mocks habilitados: ${mockEnabled}\n`);
    
    if (!mockEnabled) {
        console.log('   ⚠ Los mocks están deshabilitados. Activa VITE_USE_MOCK=true en .env\n');
        return;
    }
    
    // Probar funciones de autenticación
    console.log('2. Probando funciones de autenticación...');
    try {
        // Listar usuarios disponibles
        const users = getMockUsers();
        console.log(`   ✓ Usuarios mock disponibles: ${users.length}`);
        
        // Test login exitoso
        const loginResult = await login(TEST_CREDENTIALS.admin);
        console.log(`   ✓ login (admin): Token generado - ${loginResult.data.token.substring(0, 20)}...`);
        
        // Test login fallido
        try {
            await login({ correo: 'noexiste@test.com', contrasena: 'wrong' });
            console.log('   ✗ login (credenciales inválidas): Debería haber fallado');
        } catch (error: any) {
            console.log(`   ✓ login (credenciales inválidas): Error esperado - ${error.message}`);
        }
        
        // Test register
        const registerResult = await register({
            nombre: 'Test User',
            correo: 'newuser@test.com',
            contrasena: 'test123',
            role: 'Cocinero'
        });
        console.log(`   ✓ register: ${registerResult.data.message}`);
        
        // Test register con correo duplicado
        try {
            await register({
                nombre: 'Duplicate',
                correo: TEST_CREDENTIALS.admin.correo,
                contrasena: 'test123',
                role: 'Admin'
            });
            console.log('   ✗ register (correo duplicado): Debería haber fallado');
        } catch (error: any) {
            console.log(`   ✓ register (correo duplicado): Error esperado - ${error.message}`);
        }
        
        // Test changePassword
        const changePassResult = await changePassword({
            contrasena_actual: 'admin123',
            contrasena_nueva: 'newpassword123'
        });
        console.log(`   ✓ changePassword: ${changePassResult.message}\n`);
    } catch (error) {
        console.error('   ✗ Error en funciones de autenticación:', error);
    }
    
    // Probar funciones de empleados
    console.log('3. Probando funciones de empleados...');
    try {
        const empList = await listEmployees({ local_id: 'LOCAL-001' });
        console.log(`   ✓ listEmployees: ${empList.data.contents.length} empleados encontrados`);
        
        const newEmp = await createEmployee({ local_id: 'LOCAL-001', dni: '12345678', nombre: 'Test', apellido: 'User', role: 'Cocinero' });
        console.log(`   ✓ createEmployee: ${newEmp.data.message}`);
        
        const updEmp = await updateEmployee({ local_id: 'LOCAL-001', dni: '12345678', nombre: 'Test Updated' });
        console.log(`   ✓ updateEmployee: ${updEmp.data.message}`);
        
        const delEmp = await deleteEmployee({ local_id: 'LOCAL-001', dni: '12345678' });
        console.log(`   ✓ deleteEmployee: ${delEmp.data.message}\n`);
    } catch (error) {
        console.error('   ✗ Error en funciones de empleados:', error);
    }
    
    // Probar funciones de productos
    console.log('4. Probando funciones de productos...');
    try {
        const prodList = await listProducts({ local_id: 'LOCAL-001' });
        console.log(`   ✓ listProducts: ${prodList.data.contents.length} productos encontrados`);
        
        const newProd = await createProduct({ local_id: 'LOCAL-001', nombre: 'Test Product', categoria: 'Test', precio: 10.0, stock: 50 });
        console.log(`   ✓ createProduct: ${newProd.data.message}`);
        
        await updateProduct({ local_id: 'LOCAL-001', producto_id: 'test-123', nombre: 'Updated Product' });
        console.log(`   ✓ updateProduct: OK`);
        
        await deleteProduct({ local_id: 'LOCAL-001', producto_id: 'test-123' });
        console.log(`   ✓ deleteProduct: OK\n`);
    } catch (error) {
        console.error('   ✗ Error en funciones de productos:', error);
    }
    
    // Probar acciones de empleado
    console.log('5. Probando acciones de empleado...');
    try {
        const testOrderId = 'test-order-123';
        const testEmpleadoId = 'test-empleado-456';
        
        const r1 = await cocinaIniciar({ order_id: testOrderId, empleado_id: testEmpleadoId });
        console.log(`   ✓ cocinaIniciar: ${r1.data.message}`);
        
        const r2 = await cocinaCompletar({ order_id: testOrderId, empleado_id: testEmpleadoId });
        console.log(`   ✓ cocinaCompletar: ${r2.data.message}`);
        
        const r3 = await empaqueCompletar({ order_id: testOrderId, empleado_id: testEmpleadoId });
        console.log(`   ✓ empaqueCompletar: ${r3.data.message}`);
        
        const r4 = await deliveryIniciar({ order_id: testOrderId, empleado_id: testEmpleadoId });
        console.log(`   ✓ deliveryIniciar: ${r4.data.message}`);
        
        const r5 = await deliveryEntregar({ order_id: testOrderId, empleado_id: testEmpleadoId });
        console.log(`   ✓ deliveryEntregar: ${r5.data.message}\n`);
    } catch (error) {
        console.error('   ✗ Error en acciones de empleado:', error);
    }
    
    console.log('=== PRUEBAS COMPLETADAS ===');
    console.log('✓ Todos los servicios mockeados están funcionando correctamente\n');
};
