import { Redirect } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { LoadingState } from '@/components/ui-kit';
import type { ReactNode } from 'react';
export function ProtectedRoute({ children }: { children: ReactNode }) { const { session } = useAuth(); if (!session) return <Redirect to="/login" />; return <>{children}</>; }
export function CustomerRoute({ children }: { children: ReactNode }) { const { session } = useAuth(); if (!session) return <Redirect to="/login" />; if (session.role !== 'CUSTOMER') return <Redirect to="/admin/dashboard" />; return <>{children}</>; }
export function AdminRoute({ children }: { children: ReactNode }) { const { session } = useAuth(); if (!session) return <Redirect to="/login" />; if (session.role !== 'ADMIN') return <Redirect to="/customer/dashboard" />; return <>{children}</>; }
export function PageLoading() { return <div className="mx-auto max-w-7xl p-8"><LoadingState /></div>; }