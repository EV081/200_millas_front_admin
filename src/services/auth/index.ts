import type { ChangePasswordRequest, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@interfaces/auth";
import Api from "@services/api";

export const login = async (data: LoginRequest) => {
    const api = await Api.getInstance("users");
    return api.post<LoginRequest, LoginResponse>(data, { url: "/users/login" });
};

export const register = async (data: RegisterRequest) => {
    const api = await Api.getInstance("users");
    return api.post<RegisterRequest, RegisterResponse>(data, { url: "/users/register" });
};

export const changePassword = async (data: ChangePasswordRequest) => {
    const api = await Api.getInstance("users");
    const response = await api.post<ChangePasswordRequest, { message: string }>(data, { url: '/users/password/change' });
    return response.data;
}