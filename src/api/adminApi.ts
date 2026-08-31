import { api } from './client';
import type { Dashboard, User } from '@/types';
export const adminApi = {
  dashboard: () => api.get<Dashboard>('/admin/dashboard').then((r) => r.data),
  customers: () => api.get<User[]>('/admin/customers').then((r) => r.data),
};