import { api } from './client';
import type { Product, ProductType } from '@/types';
export interface ProductPayload { productName: string; productType: ProductType; description: string; coverageAmount: number; basePremium: number; }
export const productApi = {
  list: (type?: ProductType) => api.get<Product[]>('/products', { params: type ? { type } : undefined }).then((r) => r.data),
  get: (id: string | number) => api.get<Product>(`/products/${id}`).then((r) => r.data),
  create: (payload: ProductPayload) => api.post<Product>('/products', payload).then((r) => r.data),
  update: (id: number, payload: ProductPayload) => api.put<Product>(`/products/${id}`, payload).then((r) => r.data),
  remove: (id: number) => api.delete(`/products/${id}`).then((r) => r.data),
};