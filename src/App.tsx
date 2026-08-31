import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { ToastProvider } from '@/components/ui-kit';
import { AuthProvider } from '@/context/AuthContext';
import { AdminRoute, CustomerRoute, ProtectedRoute } from '@/routes/guards';
import { HomePage, PlanDetailPage, PlansPage } from '@/pages/public';
import { LoginPage, RegisterPage } from '@/pages/auth';
import { AdminClaims, AdminCustomers, AdminDashboard, AdminPolicies, AdminProducts } from '@/pages/admin';
import { BuyPolicyPage, ClaimDetailPage, ClaimsPage, CustomerDashboard, CustomerPlans, PolicyDetailPage, PoliciesPage, PremiumCalculator, ProfilePage } from '@/pages/customer';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
function Customer({ children }: { children: ReactNode }) { return <CustomerRoute><ProtectedRoute>{children}</ProtectedRoute></CustomerRoute>; }
function Admin({ children }: { children: ReactNode }) { return <AdminRoute><ProtectedRoute>{children}</ProtectedRoute></AdminRoute>; }
function RoutedErrorBoundary({ children }: { children: ReactNode }) { const [location] = useLocation(); return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>; }
function Router() { return <RoutedErrorBoundary><Switch><Route path="/" component={HomePage} /><Route path="/login" component={LoginPage} /><Route path="/register" component={RegisterPage} /><Route path="/plans/:id" component={PlanDetailPage} /><Route path="/plans" component={PlansPage} /><Route path="/customer/dashboard">{() => <Customer><CustomerDashboard /></Customer>}</Route><Route path="/customer/plans">{() => <Customer><CustomerPlans /></Customer>}</Route><Route path="/customer/premium-calculator">{() => <Customer><PremiumCalculator /></Customer>}</Route><Route path="/customer/buy-policy">{() => <Customer><BuyPolicyPage /></Customer>}</Route><Route path="/customer/policies/:id">{() => <Customer><PolicyDetailPage /></Customer>}</Route><Route path="/customer/policies">{() => <Customer><PoliciesPage /></Customer>}</Route><Route path="/customer/claims/:id">{() => <Customer><ClaimDetailPage /></Customer>}</Route><Route path="/customer/claims">{() => <Customer><ClaimsPage /></Customer>}</Route><Route path="/customer/profile">{() => <Customer><ProfilePage /></Customer>}</Route><Route path="/admin/dashboard">{() => <Admin><AdminDashboard /></Admin>}</Route><Route path="/admin/products">{() => <Admin><AdminProducts /></Admin>}</Route><Route path="/admin/customers">{() => <Admin><AdminCustomers /></Admin>}</Route><Route path="/admin/policies">{() => <Admin><AdminPolicies /></Admin>}</Route><Route path="/admin/claims">{() => <Admin><AdminClaims /></Admin>}</Route><Route component={NotFound} /></Switch></RoutedErrorBoundary>; }
function App() { return <QueryClientProvider client={queryClient}><ToastProvider><AuthProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter></AuthProvider></ToastProvider></QueryClientProvider>; }
export default App;