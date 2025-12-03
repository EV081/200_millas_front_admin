import type {
    ProductListRequest,
    ProductListResponse,
    ProductByIdRequest,
    Product,
    CreateProductRequest,
    CreateProductResponse,
    UpdateProductRequest,
    UpdateProductResponse,
    DeleteProductRequest
} from "@interfaces/product";
import Api from "@services/api";

export const listProducts = async (request: ProductListRequest) => {
    const api = await Api.getInstance("products");
    const response = await api.post<ProductListRequest, ProductListResponse>(request, { url: "/productos/list" });
    return response.data;
};

export const getProductById = async (request: ProductByIdRequest) => {
    const api = await Api.getInstance("products");
    const response = await api.post<ProductByIdRequest, Product>(request, { url: "/productos/id" });
    return response.data;
};

export const createProduct = async (request: CreateProductRequest) => {
    const api = await Api.getInstance("products");
    const response = await api.post<CreateProductRequest, CreateProductResponse>(request, { url: "/productos/create" });
    return response.data;
};

export const updateProduct = async (request: UpdateProductRequest) => {
    const api = await Api.getInstance("products");
    const response = await api.put<UpdateProductRequest, UpdateProductResponse>(request, { url: "/productos/update" });
    return response.data;
};

export const deleteProduct = async (request: DeleteProductRequest) => {
    const api = await Api.getInstance("products");
    const response = await api.delete({ url: "/productos/delete", data: request });
    return response.data;
};