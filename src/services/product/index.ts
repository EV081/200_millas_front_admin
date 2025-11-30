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
import { isMockEnabled } from "@mocks/mockManager";
import * as productMock from "@mocks/products";

export const listProducts = async (request: ProductListRequest) => {
    if (isMockEnabled()) {
        return productMock.listProducts(request);
    }
    const api = await Api.getInstance("products");
    return api.post<ProductListRequest, ProductListResponse>(request, { url: "/productos/list" });
};

export const getProductById = async (request: ProductByIdRequest) => {
    if (isMockEnabled()) {
        return productMock.getProductById(request);
    }
    const api = await Api.getInstance("products");
    return api.post<ProductByIdRequest, Product>(request, { url: "/productos/id" });
};

export const createProduct = async (request: CreateProductRequest) => {
    if (isMockEnabled()) {
        return productMock.createProduct(request);
    }
    const api = await Api.getInstance("products");
    return api.post<CreateProductRequest, CreateProductResponse>(request, { url: "/productos/create" });
};

export const updateProduct = async (request: UpdateProductRequest) => {
    if (isMockEnabled()) {
        return productMock.updateProduct(request);
    }
    const api = await Api.getInstance("products");
    return api.put<UpdateProductRequest, UpdateProductResponse>(request, { url: "/productos/update" });
};

export const deleteProduct = async (request: DeleteProductRequest) => {
    if (isMockEnabled()) {
        return productMock.deleteProduct(request);
    }
    const api = await Api.getInstance("products");
    return api.delete({ url: "/productos/delete", data: request });
};