import { QueryKey, useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from '@tanstack/react-query';
import type { ApiError } from './api-error';
import api from './axios';
import type { AxiosRequestConfig } from 'axios';

// Generic GET with compile-time typing
export function useApiQuery<T>(
    key: QueryKey,
    url: string,
    options?: Omit<UseQueryOptions<T, ApiError, T, QueryKey>, "queryKey" | "queryFn">
) {
    return useQuery<T, ApiError>({
        queryKey: key,
        queryFn: async () => {
            const { data } = await api.get<T>(url);
            return data;
        },
        retry: 1,
        staleTime: 5 * 60 * 1000,
        ...options 
    });
}

// Generic POST/PATCH/DELETE with compile-time typing
export function useApiMutation<TData, TVars>(
    method: "post" | "patch" | "delete",
    url: string | ((vars: TVars) => string),
    config?: AxiosRequestConfig,
    options?: UseMutationOptions<TData, ApiError, TVars>
) {
    return useMutation({
        mutationFn: async (vars: TVars ) => {
            const finalUrl = typeof url === "function" ? url(vars) : url;
            if ( method === "post" ) {
                const { data } = await api.post<TData>(finalUrl, vars as any, config);
                return data;
            }

            if ( method === "patch" ) {
                const { data } = await api.patch<TData>(finalUrl, vars as any, config);
                return data;
            }

            // delete can have body in some backends; adjust if needed
            const { data } = await api.delete<TData>(finalUrl, config);
            return data;
        },
        ...options,
    });
}