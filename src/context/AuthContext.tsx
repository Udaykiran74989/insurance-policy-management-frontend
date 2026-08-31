import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { authApi, type LoginPayload, type RegisterPayload } from '@/api/authApi';
import type { AuthResponse, User } from '@/types';

interface AuthValue { session: AuthResponse | null; user: User | null; loading: boolean; login: (payload: LoginPayload) => Promise<AuthResponse>; register: (payload: RegisterPayload) => Promise<AuthResponse>; logout: () => void; }
const AuthContext = createContext<AuthValue | undefined>(undefined);
const readSession = () => { try { return JSON.parse(localStorage.getItem('securelife_session') || 'null') as AuthResponse | null; } catch { return null; } };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthResponse | null>(readSession);
  const [loading, setLoading] = useState(false);
  const persist = (value: AuthResponse) => { localStorage.setItem('securelife_token', value.token); localStorage.setItem('securelife_session', JSON.stringify(value)); setSession(value); return value; };
  const login = async (payload: LoginPayload) => { setLoading(true); try { return persist(await authApi.login(payload)); } finally { setLoading(false); } };
  const register = async (payload: RegisterPayload) => { setLoading(true); try { return persist(await authApi.register(payload)); } finally { setLoading(false); } };
  const logout = () => { localStorage.removeItem('securelife_token'); localStorage.removeItem('securelife_session'); setSession(null); };
  const value = useMemo(() => ({ session, user: session ? { id: session.userId, name: session.name, email: session.email, role: session.role } : null, loading, login, register, logout }), [session, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error('useAuth must be used inside AuthProvider'); return value; }