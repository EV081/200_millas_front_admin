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
} from "@interfaces/product";
import Api from "@services/api";

export const listProducts = async (request: ProductListRequest) => {
    const api = await Api.getInstance("products");
    return api.post<ProductListRequest, ProductListResponse>(request, { url: "/productos/list" });
};

export const getProductById = async (request: ProductByIdRequest) => {
    const api = await Api.getInstance("products");
    return api.post<ProductByIdRequest, Product>(request, { url: "/productos/id" });
};

export const createProduct = async (request: CreateProductRequest) => {
    const api = await Api.getInstance("products");
    return api.post<CreateProductRequest, CreateProductResponse>(request, { url: "/productos/create" });
};

export const updateProduct = async (request: UpdateProductRequest) => {
    const api = await Api.getInstance("products");
    return api.put<UpdateProductRequest, UpdateProductResponse>(request, { url: "/productos/update" });
};

export const deleteProduct = async (request: DeleteProductRequest) => {
    const api = await Api.getInstance("products");
    return api.delete({ url: "/productos/delete", data: request });
};