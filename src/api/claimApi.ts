import { api } from './client';
import type { Claim } from '@/types';
export interface ClaimPayload { policyId: number; claimAmount: number; reason: string; description: string; }
export const claimApi = {
  create: (payload: ClaimPayload) => api.post<Claim>('/claims', payload).then((r) => r.data),
  list: () => api.get<Claim[]>('/claims').then((r) => r.data),
  get: (id: string | number) => api.get<Claim>(`/claims/${id}`).then((r) => r.data),
  adminList: () => api.get<Claim[]>('/admin/claims').then((r) => r.data),
  status: (id: number, status: string, adminRemarks: string) => api.put<Claim>(`/admin/claims/${id}/status`, { status, adminRemarks }).then((r) => r.data),
};