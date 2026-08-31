declare module 'axios' {
  export interface AxiosRequestConfig { headers?: Record<string, string>; baseURL?: string; [key: string]: unknown; }
  export interface AxiosResponse<T = unknown> { data: T; status: number; }
  export interface AxiosError<T = unknown> extends Error { response?: { status: number; data: T }; }
  export interface AxiosInstance {
    get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    interceptors: { request: { use: (fn: (config: AxiosRequestConfig) => AxiosRequestConfig) => void }; response: { use: (success: (response: AxiosResponse) => AxiosResponse, failure: (error: unknown) => Promise<never>) => void } };
  }
  const axios: { create(config?: AxiosRequestConfig): AxiosInstance };
  export default axios;
}