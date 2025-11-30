export interface Product {
    local_id: string;
    producto_id: string;
    nombre: string;
    precio: number;
    descripcion?: string;
    categoria: string;
    stock: number;
    imagen_url: string;
}

export interface ProductListRequest {
    local_id: string;
    limit?: number;
    start_key?: string;
}

export interface ProductListResponse {
    contents: Product[];
    size: number;
    next_token?: string;
    page: number;
}

export interface ProductByIdRequest {
    local_id: string;
    producto_id: string;
}

export interface CreateProductRequest {
    local_id: string;
    nombre: string;
    precio: number;
    descripcion?: string;
    categoria: string;
    stock: number;
    imagen_b64?: string;
    file_type?: string;
}

export interface CreateProductResponse {
    message: string;
    producto: Product;
}

export interface UpdateProductRequest {
    local_id: string;
    producto_id: string;
    nombre?: string;
    precio?: number;
    descripcion?: string;
    categoria?: string;
    stock?: number;
}

export interface UpdateProductResponse {
    ok: boolean;
    item: Product;
}

export interface DeleteProductRequest {
    local_id: string;
    producto_id: string;
}

export interface DeleteProductResponse {
    ok: boolean;
    deleted: Product;
}