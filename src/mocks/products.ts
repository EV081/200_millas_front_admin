import { MOCK_PRODUCTS } from './data/products';
import type {
    ProductListRequest,
    ProductListResponse,
    ProductByIdRequest,
    Product,
    CreateProductRequest,
    CreateProductResponse,
    UpdateProductRequest,
    UpdateProductResponse,
    DeleteProductRequest,
    DeleteProductResponse
} from '@interfaces/product';

const DELAY = 300;

export const listProducts = async (request: ProductListRequest): Promise<{ data: ProductListResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const contents = MOCK_PRODUCTS.filter(p => p.local_id === request.local_id);
            const response: ProductListResponse = {
                contents,
                page: 0,
                size: contents.length
            };
            resolve({ data: response });
        }, DELAY);
    });
};

export const getProductById = async (request: ProductByIdRequest): Promise<{ data: Product }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = MOCK_PRODUCTS.find(
                p => p.local_id === request.local_id && p.producto_id === request.producto_id
            );
            if (product) {
                resolve({ data: product });
            } else {
                reject(new Error('Producto no encontrado'));
            }
        }, DELAY);
    });
};

export const createProduct = async (request: CreateProductRequest): Promise<{ data: CreateProductResponse }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const producto: Product = {
                ...request,
                producto_id: 'mock-' + Date.now(),
                imagen_url: request.imagen_b64 
                    ? `https://mock-s3.amazonaws.com/${request.local_id}-${request.nombre.toLowerCase().replace(/\s+/g, '-')}.${request.file_type || 'png'}`
                    : 'https://placehold.co/600x400.png',
                descripcion: request.descripcion || ''
            };
            const response: CreateProductResponse = {
                message: 'Producto creado correctamente',
                producto
            };
            resolve({ data: response });
        }, DELAY);
    });
};

export const updateProduct = async (request: UpdateProductRequest): Promise<{ data: UpdateProductResponse }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = MOCK_PRODUCTS.find(
                p => p.local_id === request.local_id && p.producto_id === request.producto_id
            );
            if (product) {
                const updatedProduct: Product = {
                    ...product,
                    ...request
                };
                const response: UpdateProductResponse = {
                    ok: true,
                    item: updatedProduct
                };
                resolve({ data: response });
            } else {
                reject(new Error('Producto no encontrado'));
            }
        }, DELAY);
    });
};

export const deleteProduct = async (request: DeleteProductRequest): Promise<{ data: DeleteProductResponse }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = MOCK_PRODUCTS.find(
                p => p.local_id === request.local_id && p.producto_id === request.producto_id
            );
            if (product) {
                const response: DeleteProductResponse = {
                    ok: true,
                    deleted: product
                };
                resolve({ data: response });
            } else {
                reject(new Error('Producto no encontrado'));
            }
        }, DELAY);
    });
};
