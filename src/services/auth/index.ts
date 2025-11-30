import type { ChangePasswordRequest, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@interfaces/auth";
import Api from "@services/api";
import { isMockEnabled } from "@mocks/mockManager";
import * as authMock from "@mocks/auth";

export const login = async (data: LoginRequest) => {
    if (isMockEnabled()) {
        return authMock.login(data);
    }
    const api = await Api.getInstance();
    return api.post<LoginRequest, LoginResponse>(data, { url: "/users/login" });
};

export const register = async (data: RegisterRequest) => {
    if (isMockEnabled()) {
        return authMock.register(data);
    }
    const api = await Api.getInstance();
    return api.post<RegisterRequest, RegisterResponse>(data, { url: "/users/register" });
};

export const changePassword = async (data: ChangePasswordRequest) => {
    if (isMockEnabled()) {
        return authMock.changePassword(data);
    }
    const api = await Api.getInstance();
    const response = await api.post<ChangePasswordRequest, { message: string }>(data, { url: '/users/password/change' });
    return response.data;
}