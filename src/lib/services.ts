import {
  Member,
  MemberInput,
  Transaction,
  TransactionInput,
  DashboardStats,
} from "@/types";

/**
 * Escapes and strips dangerous HTML/script tags for safe rendering
 */
export function safeSanitize(input: string): string {
  if (!input) return "";
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export function calculateDashboardStats(
  members: Member[],
  transactions: Transaction[] = []
): DashboardStats {
  const totalMembers = members.length;
  const activeMembers = members.filter((m) => m.status === "Active").length;
  const inactiveMembers = members.filter((m) => m.status !== "Active").length;
  const totalMiles = members.reduce((acc, m) => acc + (Number(m.balance) || 0), 0);
  const recentTransactionsCount = transactions.length;

  return {
    totalMembers,
    activeMembers,
    inactiveMembers,
    totalMiles,
    recentTransactionsCount,
  };
}

export class FrequentFlyerStore {
  private members: Member[] = [];
  private transactions: Transaction[] = [];
  private nextMemberId = 1;
  private nextTxnId = 1;

  constructor(initialMembers: Member[] = [], initialTransactions: Transaction[] = []) {
    this.members = [...initialMembers];
    this.transactions = [...initialTransactions];
    if (this.members.length > 0) {
      this.nextMemberId = Math.max(...this.members.map((m) => m.id)) + 1;
    }
    if (this.transactions.length > 0) {
      this.nextTxnId = Math.max(...this.transactions.map((t) => t.id)) + 1;
    }
  }

  getAllMembers(): Member[] {
    return [...this.members];
  }

  getMemberByMemberId(memberId: string): Member | undefined {
    return this.members.find(
      (m) => m.memberId.toLowerCase() === memberId.toLowerCase()
    );
  }

  addMember(input: MemberInput | Member): Member {
    const trimmedId = input.memberId.trim().toUpperCase();
    const existing = this.getMemberByMemberId(trimmedId);
    if (existing) {
      throw new Error(`Member ID ${trimmedId} already exists`);
    }

    const member: Member = {
      id: "id" in input && typeof input.id === "number" ? input.id : this.nextMemberId++,
      memberId: trimmedId,
      fullName: safeSanitize(input.fullName.trim()),
      email: input.email.trim().toLowerCase(),
      phone: input.phone ? safeSanitize(input.phone.trim()) : null,
      tier: input.tier,
      balance: Math.max(0, Math.floor(Number(input.balance) || 0)),
      status: input.status,
      joinDate: input.joinDate || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.members.push(member);
    return member;
  }

  updateMember(memberId: string, updates: Partial<MemberInput>): Member {
    const index = this.members.findIndex(
      (m) => m.memberId.toLowerCase() === memberId.toLowerCase()
    );
    if (index === -1) {
      throw new Error(`Member with ID ${memberId} not found`);
    }

    const current = this.members[index];
    const updated: Member = {
      ...current,
      fullName:
        updates.fullName !== undefined
          ? safeSanitize(updates.fullName.trim())
          : current.fullName,
      email:
        updates.email !== undefined
          ? updates.email.trim().toLowerCase()
          : current.email,
      phone:
        updates.phone !== undefined
          ? updates.phone ? safeSanitize(updates.phone.trim()) : null
          : current.phone,
      tier: updates.tier || current.tier,
      status: updates.status || current.status,
      balance:
        updates.balance !== undefined
          ? Math.max(0, Math.floor(Number(updates.balance)))
          : current.balance,
      updatedAt: new Date().toISOString(),
    };

    this.members[index] = updated;
    return updated;
  }

  deleteMember(memberId: string): boolean {
    const initialLen = this.members.length;
    this.members = this.members.filter(
      (m) => m.memberId.toLowerCase() !== memberId.toLowerCase()
    );
    return this.members.length < initialLen;
  }

  searchMembers(query: string, tier?: string, status?: string): Member[] {
    const q = query.trim().toLowerCase();
    return this.members.filter((member) => {
      const matchesQuery =
        !q ||
        member.memberId.toLowerCase().includes(q) ||
        member.fullName.toLowerCase().includes(q) ||
        member.email.toLowerCase().includes(q);

      const matchesTier = !tier || tier === "All" || member.tier === tier;
      const matchesStatus = !status || status === "All" || member.status === status;

      return matchesQuery && matchesTier && matchesStatus;
    });
  }

  processTransaction(input: TransactionInput): Transaction {
    const member = this.getMemberByMemberId(input.memberId);
    if (!member) {
      throw new Error(`Member not found: ${input.memberId}`);
    }

    const amount = Math.floor(Number(input.amount));
    if (isNaN(amount) || amount <= 0) {
      throw new Error("Transaction amount must be a positive number");
    }

    let newBalance = member.balance;
    if (input.type === "credit") {
      newBalance += amount;
    } else if (input.type === "redemption") {
      if (member.balance < amount) {
        throw new Error(
          `Insufficient points balance. Member has ${member.balance.toLocaleString()} points, requested ${amount.toLocaleString()}`
        );
      }
      newBalance -= amount;
    } else {
      throw new Error("Invalid transaction type");
    }

    // Atomic update
    member.balance = newBalance;
    member.updatedAt = new Date().toISOString();

    const txn: Transaction = {
      id: this.nextTxnId++,
      transactionId: `TX-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`,
      memberId: member.memberId,
      type: input.type,
      amount,
      description: safeSanitize(input.description || `${input.type === "credit" ? "Points added" : "Points redeemed"}`),
      resultingBalance: newBalance,
      createdAt: new Date().toISOString(),
    };

    this.transactions.push(txn);
    return txn;
  }

  getMemberTransactions(memberId: string): Transaction[] {
    return this.transactions.filter(
      (t) => t.memberId.toLowerCase() === memberId.toLowerCase()
    );
  }

  getAllTransactions(): Transaction[] {
    return [...this.transactions].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  addSeedTransaction(
    memberId: string,
    type: Transaction["type"],
    amount: number,
    description: string,
    resultingBalance: number
  ): void {
    this.transactions.push({
      id: this.nextTxnId++,
      transactionId: `TXN-SEED-${this.nextTxnId.toString().padStart(2, "0")}`,
      memberId,
      type,
      amount,
      description,
      resultingBalance,
      createdAt: new Date().toISOString(),
    });
  }

  reset(): void {
    this.members = [];
    this.transactions = [];
    this.nextMemberId = 1;
    this.nextTxnId = 1;
  }

  loadFromJson(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data && Array.isArray(data.members)) {
        this.members = data.members;
      }
      if (data && Array.isArray(data.transactions)) {
        this.transactions = data.transactions;
      }
      return true;
    } catch {
      // Safe fallback - do not crash
      return false;
    }
  }
}
