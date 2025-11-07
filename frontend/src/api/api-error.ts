import { AxiosError } from "axios";

export type ApiErrorPayload = {
    message?: string;
    detail?: string; 
    errors?: Record<string, string[] | string>;
    [k: string]: unknown;
};

export type ApiError = AxiosError<ApiErrorPayload>;

export function getErrorMessage(err: unknown, fallback = "Something went wrong"){
    const e = err as ApiError;
    return (
        e?.response?.data?.message ??
        e?.response?.data?.detail ??
        (typeof e?.response?.data === "string" ? e.response!.data : undefined) ??
        e?.message ?? 
        fallback
    );
}
