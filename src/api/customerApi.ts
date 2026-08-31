import { api } from './client';
import type { User } from '@/types';
export const customerApi = {
  getProfile: () => api.get<User>('/customers/profile').then((r) => r.data),
  updateProfile: (payload: Pick<User, 'name' | 'phone' | 'address'>) => api.put<User>('/customers/profile', payload).then((r) => r.data),
  changePassword: (payload: { currentPassword: string; newPassword: string }) => api.put('/customers/change-password', payload).then((r) => r.data),
};