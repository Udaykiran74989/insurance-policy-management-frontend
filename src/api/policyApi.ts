import { api } from './client';
import type { Policy, PremiumResult } from '@/types';
export interface PurchasePayload { productId: number; age: number; coverageAmount: number; duration: number; }
export const policyApi = {
  calculate: (payload: PurchasePayload) => api.post<PremiumResult>('/premium/calculate', payload).then((r) => r.data),
  create: (payload: PurchasePayload) => api.post<Policy>('/policies', payload).then((r) => r.data),
  list: () => api.get<Policy[]>('/policies').then((r) => r.data),
  get: (id: string | number) => api.get<Policy>(`/policies/${id}`).then((r) => r.data),
  cancel: (id: number) => api.put<Policy>(`/policies/${id}/cancel`).then((r) => r.data),
  adminList: () => api.get<Policy[]>('/admin/policies').then((r) => r.data),
  status: (id: number, status: string) => api.put<Policy>(`/admin/policies/${id}/status`, { status }).then((r) => r.data),
};