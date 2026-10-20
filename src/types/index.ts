export type MembershipTier = "Standard" | "Silver" | "Gold" | "Platinum";

export type MembershipStatus = "Active" | "Inactive" | "Suspended";

export type TransactionType = "credit" | "redemption";

export interface Member {
  id: number;
  memberId: string;
  fullName: string;
  email: string;
  phone?: string | null;
  tier: MembershipTier;
  balance: number;
  status: MembershipStatus;
  joinDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MemberInput {
  memberId: string;
  fullName: string;
  email: string;
  phone?: string | null;
  tier: MembershipTier;
  balance: number;
  status: MembershipStatus;
  joinDate?: string;
}

export interface Transaction {
  id: number;
  transactionId: string;
  memberId: string;
  type: TransactionType;
  amount: number;
  description: string;
  resultingBalance: number;
  createdAt: string;
}

export interface TransactionInput {
  memberId: string;
  type: TransactionType;
  amount: number;
  description: string;
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  totalMiles: number;
  recentTransactionsCount: number;
}

export interface ValidationResult<T = Record<string, string>> {
  isValid: boolean;
  errors: T;
}
