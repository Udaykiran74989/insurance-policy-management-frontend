export type Role = 'CUSTOMER' | 'ADMIN' | string;
export type ProductType = 'HEALTH' | 'LIFE' | 'VEHICLE' | 'TRAVEL' | string;
export type UserStatus = 'ACTIVE' | 'INACTIVE' | string;
export type PolicyStatus = 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'PENDING' | string;
export type ClaimStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | string;

export interface User { id?: number; name: string; email: string; phone?: string; address?: string; role: Role; status?: UserStatus; }
export interface Product { id: number; productName: string; productType: ProductType; description: string; coverageAmount: number; basePremium: number; status?: string; createdAt?: string; }
export interface Policy { id: number; policyNumber: string; customerId: number; customerName: string; productId: number; productName: string; startDate: string; endDate: string; coverageAmount: number; premiumAmount: number; status: PolicyStatus; }
export interface Claim { id: number; claimNumber: string; policyId: number; policyNumber: string; customerId: number; customerName: string; claimAmount: number; reason: string; description: string; claimDate: string; status: ClaimStatus; adminRemarks?: string; }
export interface Dashboard { totalCustomers: number; totalProducts: number; activePolicies: number; pendingClaims: number; approvedClaims: number; rejectedClaims: number; }
export interface AuthResponse { userId: number; name: string; email: string; role: Role; token: string; }
export interface PremiumResult { basePremium: number; adjustment: number; finalPremium: number; }
export interface ApiError { status?: number; message: string; code?: string; }