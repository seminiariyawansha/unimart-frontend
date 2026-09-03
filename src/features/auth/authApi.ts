import { baseApi } from '../../services/baseApi';
import type { AuthResponse, LoginRequest, RegisterRequest } from './authTypes';

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<AuthResponse, LoginRequest>({
            query: (body) => ({ url: 'auth/login', method: 'POST', body }),
        }),
        register: build.mutation<void, RegisterRequest>({
            query: (body) => ({ url: 'auth/register', method: 'POST', body }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;