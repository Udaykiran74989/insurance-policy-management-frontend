import { api } from './client';
import type { AuthResponse } from '@/types';

export interface RegisterPayload { name: string; email: string; password: string; phone: string; address: string; }
export interface LoginPayload { email: string; password: string; }
export const authApi = {
  register: (payload: RegisterPayload) => api.post<AuthResponse>('/auth/register', payload).then((r) => r.data),
  login: (payload: LoginPayload) => api.post<AuthResponse>('/auth/login', payload).then((r) => r.data),
};