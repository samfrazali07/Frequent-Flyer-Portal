import { db } from "@/db";
import { members, transactions, DbMember, DbTransaction } from "@/db/schema";
import { eq, or, ilike, desc, sql } from "drizzle-orm";
import {
  Member,
  MemberInput,
  Transaction,
  TransactionInput,
  DashboardStats,
} from "@/types";
import {
  calculateDashboardStats,
  FrequentFlyerStore,
  safeSanitize,
} from "./services";

const globalForMemoryStore = globalThis as typeof globalThis & {
  __frequentFlyerMemoryStore?: FrequentFlyerStore;
};

let memoryStore =
  globalForMemoryStore.__frequentFlyerMemoryStore ?? new FrequentFlyerStore();

if (process.env.NODE_ENV !== "production") {
  globalForMemoryStore.__frequentFlyerMemoryStore = memoryStore;
}

export function mapDbMemberToModel(row: DbMember): Member {
  return {
    id: row.id,
    memberId: row.memberId,
    fullName: row.fullName,
    email: row.email,
    phone: row.phone,
    tier: row.tier as Member["tier"],
    balance: Number(row.balance),
    status: row.status as Member["status"],
    joinDate: row.joinDate ? row.joinDate.toISOString() : new Date().toISOString(),
    createdAt: row.createdAt ? row.createdAt.toISOString() : undefined,
    updatedAt: row.updatedAt ? row.updatedAt.toISOString() : undefined,
  };
}

export function mapDbTxnToModel(row: DbTransaction): Transaction {
  return {
    id: row.id,
    transactionId: row.transactionId,
    memberId: row.memberId,
    type: row.type as Transaction["type"],
    amount: Number(row.amount),
    description: row.description,
    resultingBalance: Number(row.resultingBalance),
    createdAt: row.createdAt ? row.createdAt.toISOString() : new Date().toISOString(),
  };
}

export async function getMembersFromDb(
  search?: string,
  tier?: string,
  status?: string
): Promise<Member[]> {
  if (!db) {
    return memoryStore.searchMembers(search || "", tier, status);
  }

  const allRows = await db.select().from(members).orderBy(desc(members.createdAt));
  let filtered = allRows.map(mapDbMemberToModel);

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.fullName.toLowerCase().includes(q) ||
        m.memberId.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q)
    );
  }

  if (tier && tier !== "All") {
    filtered = filtered.filter((m) => m.tier === tier);
  }

  if (status && status !== "All") {
    filtered = filtered.filter((m) => m.status === status);
  }

  return filtered;
}

export async function getMemberByMemberIdFromDb(
  memberId: string
): Promise<Member | null> {
  if (!db) {
    return memoryStore.getMemberByMemberId(memberId) || null;
  }

  const rows = await db
    .select()
    .from(members)
    .where(eq(members.memberId, memberId.trim().toUpperCase()))
    .limit(1);

  if (rows.length === 0) return null;
  return mapDbMemberToModel(rows[0]);
}

export async function createMemberInDb(input: MemberInput): Promise<Member> {
  if (!db) {
    return memoryStore.addMember(input);
  }

  const memberIdUpper = input.memberId.trim().toUpperCase();
  const existing = await getMemberByMemberIdFromDb(memberIdUpper);
  if (existing) {
    throw new Error(`Member ID ${memberIdUpper} already exists`);
  }

  const [created] = await db
    .insert(members)
    .values({
      memberId: memberIdUpper,
      fullName: safeSanitize(input.fullName.trim()),
      email: input.email.trim().toLowerCase(),
      phone: input.phone ? safeSanitize(input.phone.trim()) : null,
      tier: input.tier,
      balance: Math.max(0, Math.floor(Number(input.balance) || 0)),
      status: input.status,
      joinDate: input.joinDate ? new Date(input.joinDate) : new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return mapDbMemberToModel(created);
}

export async function updateMemberInDb(
  memberId: string,
  updates: Partial<MemberInput>
): Promise<Member> {
  if (!db) {
    return memoryStore.updateMember(memberId, updates);
  }

  const existing = await getMemberByMemberIdFromDb(memberId);
  if (!existing) {
    throw new Error(`Member ${memberId} not found`);
  }

  const updateValues: Record<string, unknown> = {
    updatedAt: new Date(),
  };

  if (updates.fullName !== undefined) {
    updateValues.fullName = safeSanitize(updates.fullName.trim());
  }
  if (updates.email !== undefined) {
    updateValues.email = updates.email.trim().toLowerCase();
  }
  if (updates.phone !== undefined) {
    updateValues.phone = updates.phone ? safeSanitize(updates.phone.trim()) : null;
  }
  if (updates.tier !== undefined) {
    updateValues.tier = updates.tier;
  }
  if (updates.status !== undefined) {
    updateValues.status = updates.status;
  }
  if (updates.balance !== undefined) {
    updateValues.balance = Math.max(0, Math.floor(Number(updates.balance)));
  }

  const [updated] = await db
    .update(members)
    .set(updateValues)
    .where(eq(members.memberId, memberId.toUpperCase()))
    .returning();

  return mapDbMemberToModel(updated);
}

export async function deleteMemberFromDb(memberId: string): Promise<boolean> {
  if (!db) {
    return memoryStore.deleteMember(memberId);
  }

  const result = await db
    .delete(members)
    .where(eq(members.memberId, memberId.toUpperCase()))
    .returning({ id: members.id });

  return result.length > 0;
}

export async function recordTransactionInDb(
  input: TransactionInput
): Promise<{ transaction: Transaction; updatedMember: Member }> {
  if (!db) {
    const transaction = memoryStore.processTransaction(input);
    const updatedMember = memoryStore.getMemberByMemberId(input.memberId);
    if (!updatedMember) {
      throw new Error(`Member ${input.memberId} not found`);
    }
    return { transaction, updatedMember };
  }

  const member = await getMemberByMemberIdFromDb(input.memberId);
  if (!member) {
    throw new Error(`Member ${input.memberId} not found`);
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

  // Execute database transaction
  const [createdTxn] = await db
    .insert(transactions)
    .values({
      transactionId: `TXN-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`,
      memberId: member.memberId,
      type: input.type,
      amount,
      description: safeSanitize(
        input.description ||
          (input.type === "credit" ? "Flight Miles Credit" : "Reward Redemption")
      ),
      resultingBalance: newBalance,
      createdAt: new Date(),
    })
    .returning();

  const [updatedMemberRow] = await db
    .update(members)
    .set({
      balance: newBalance,
      updatedAt: new Date(),
    })
    .where(eq(members.memberId, member.memberId))
    .returning();

  return {
    transaction: mapDbTxnToModel(createdTxn),
    updatedMember: mapDbMemberToModel(updatedMemberRow),
  };
}

export async function getTransactionsForMemberFromDb(
  memberId: string
): Promise<Transaction[]> {
  if (!db) {
    return memoryStore.getMemberTransactions(memberId);
  }

  const rows = await db
    .select()
    .from(transactions)
    .where(eq(transactions.memberId, memberId.toUpperCase()))
    .orderBy(desc(transactions.createdAt));

  return rows.map(mapDbTxnToModel);
}

export async function getAllTransactionsFromDb(
  limitCount = 25
): Promise<Transaction[]> {
  if (!db) {
    return memoryStore.getAllTransactions().slice(0, limitCount);
  }

  const rows = await db
    .select()
    .from(transactions)
    .orderBy(desc(transactions.createdAt))
    .limit(limitCount);

  return rows.map(mapDbTxnToModel);
}

export async function getDashboardStatsFromDb(): Promise<DashboardStats> {
  if (!db) {
    return calculateDashboardStats(
      memoryStore.getAllMembers(),
      memoryStore.getAllTransactions()
    );
  }

  const allMembers = await db.select().from(members);
  const totalTxns = await db
    .select({ count: sql<number>`count(*)` })
    .from(transactions);

  const totalMembers = allMembers.length;
  const activeMembers = allMembers.filter((m) => m.status === "Active").length;
  const inactiveMembers = allMembers.filter((m) => m.status !== "Active").length;
  const totalMiles = allMembers.reduce((acc, m) => acc + (Number(m.balance) || 0), 0);
  const recentTransactionsCount = Number(totalTxns[0]?.count ?? 0);

  return {
    totalMembers,
    activeMembers,
    inactiveMembers,
    totalMiles,
    recentTransactionsCount,
  };
}

export async function seedDemoDataIfEmpty(): Promise<boolean> {
  if (!db) {
    if (memoryStore.getAllMembers().length > 0) {
      return false;
    }

    const sampleMembersList: MemberInput[] = [
      ["FF-10021", "Sample Passenger: Alexander Wright", "alexander.wright@sample-air.internal", "+1 (555) 012-4411", "Platinum", 142500, "Active", "2021-03-12"],
      ["FF-10022", "Sample Passenger: Beatrice Morales", "beatrice.morales@sample-air.internal", "+1 (555) 014-9922", "Gold", 68200, "Active", "2022-06-18"],
      ["FF-10023", "Sample Passenger: Chen Wei", "chen.wei@sample-air.internal", "+1 (555) 017-3388", "Silver", 24500, "Active", "2023-01-20"],
      ["FF-10024", "Sample Passenger: Danielle Dupont", "danielle.dupont@sample-air.internal", "+1 (555) 018-7711", "Standard", 5200, "Active", "2023-09-05"],
      ["FF-10025", "Sample Passenger: Ethan O'Connor", "ethan.oconnor@sample-air.internal", "+1 (555) 019-2244", "Gold", 89000, "Active", "2022-11-14"],
      ["FF-10026", "Sample Passenger: Fatima Al-Mansoor", "fatima.almansoor@sample-air.internal", "+1 (555) 013-5599", "Platinum", 215400, "Active", "2020-08-01"],
      ["FF-10027", "Sample Passenger: George Kowalski", "george.kowalski@sample-air.internal", "+1 (555) 015-8833", "Standard", 1200, "Inactive", "2024-02-10"],
      ["FF-10028", "Sample Passenger: Hannah Lindqvist", "hannah.lindqvist@sample-air.internal", "+1 (555) 016-4477", "Silver", 16800, "Suspended", "2023-05-19"],
    ].map(([memberId, fullName, email, phone, tier, balance, status, joinDate]) => ({
      memberId,
      fullName,
      email,
      phone,
      tier,
      balance,
      status,
      joinDate: new Date(joinDate).toISOString(),
    })) as MemberInput[];

    sampleMembersList.forEach((member) => memoryStore.addMember(member));
    [
      ["FF-10021", "credit", 12500, "Flight Bonus: JFK to LHR First Class", 142500],
      ["FF-10022", "credit", 4500, "Floor Desk Staff Adjustment: Promotional Miles", 68200],
      ["FF-10026", "redemption", 25000, "Star Alliance Lounge Access Package", 215400],
      ["FF-10023", "credit", 2000, "Partner Hotel Stay Credit", 24500],
    ].forEach(([memberId, type, amount, description, resultingBalance]) => {
      memoryStore.addSeedTransaction(
        memberId as string,
        type as TransactionInput["type"],
        amount as number,
        description as string,
        resultingBalance as number
      );
    });
    return true;
  }

  const countRes = await db
    .select({ count: sql<number>`count(*)` })
    .from(members);
  const memberCount = Number(countRes[0]?.count ?? 0);

  if (memberCount > 0) {
    return false; // Already populated
  }

  const sampleMembersList: MemberInput[] = [
    {
      memberId: "FF-10021",
      fullName: "Sample Passenger: Alexander Wright",
      email: "alexander.wright@sample-air.internal",
      phone: "+1 (555) 012-4411",
      tier: "Platinum",
      balance: 142500,
      status: "Active",
      joinDate: new Date("2021-03-12").toISOString(),
    },
    {
      memberId: "FF-10022",
      fullName: "Sample Passenger: Beatrice Morales",
      email: "beatrice.morales@sample-air.internal",
      phone: "+1 (555) 014-9922",
      tier: "Gold",
      balance: 68200,
      status: "Active",
      joinDate: new Date("2022-06-18").toISOString(),
    },
    {
      memberId: "FF-10023",
      fullName: "Sample Passenger: Chen Wei",
      email: "chen.wei@sample-air.internal",
      phone: "+1 (555) 017-3388",
      tier: "Silver",
      balance: 24500,
      status: "Active",
      joinDate: new Date("2023-01-20").toISOString(),
    },
    {
      memberId: "FF-10024",
      fullName: "Sample Passenger: Danielle Dupont",
      email: "danielle.dupont@sample-air.internal",
      phone: "+1 (555) 018-7711",
      tier: "Standard",
      balance: 5200,
      status: "Active",
      joinDate: new Date("2023-09-05").toISOString(),
    },
    {
      memberId: "FF-10025",
      fullName: "Sample Passenger: Ethan O'Connor",
      email: "ethan.oconnor@sample-air.internal",
      phone: "+1 (555) 019-2244",
      tier: "Gold",
      balance: 89000,
      status: "Active",
      joinDate: new Date("2022-11-14").toISOString(),
    },
    {
      memberId: "FF-10026",
      fullName: "Sample Passenger: Fatima Al-Mansoor",
      email: "fatima.almansoor@sample-air.internal",
      phone: "+1 (555) 013-5599",
      tier: "Platinum",
      balance: 215400,
      status: "Active",
      joinDate: new Date("2020-08-01").toISOString(),
    },
    {
      memberId: "FF-10027",
      fullName: "Sample Passenger: George Kowalski",
      email: "george.kowalski@sample-air.internal",
      phone: "+1 (555) 015-8833",
      tier: "Standard",
      balance: 1200,
      status: "Inactive",
      joinDate: new Date("2024-02-10").toISOString(),
    },
    {
      memberId: "FF-10028",
      fullName: "Sample Passenger: Hannah Lindqvist",
      email: "hannah.lindqvist@sample-air.internal",
      phone: "+1 (555) 016-4477",
      tier: "Silver",
      balance: 16800,
      status: "Suspended",
      joinDate: new Date("2023-05-19").toISOString(),
    },
  ];

  for (const item of sampleMembersList) {
    await db.insert(members).values({
      memberId: item.memberId,
      fullName: item.fullName,
      email: item.email,
      phone: item.phone,
      tier: item.tier,
      balance: item.balance,
      status: item.status,
      joinDate: new Date(item.joinDate || Date.now()),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // Seed sample transactions
  const sampleTransactions = [
    {
      transactionId: "TXN-9021-01",
      memberId: "FF-10021",
      type: "credit",
      amount: 12500,
      description: "Flight Bonus: JFK to LHR First Class",
      resultingBalance: 142500,
    },
    {
      transactionId: "TXN-9021-02",
      memberId: "FF-10022",
      type: "credit",
      amount: 4500,
      description: "Floor Desk Staff Adjustment: Promotional Miles",
      resultingBalance: 68200,
    },
    {
      transactionId: "TXN-9021-03",
      memberId: "FF-10026",
      type: "redemption",
      amount: 25000,
      description: "Star Alliance Lounge Access Package",
      resultingBalance: 215400,
    },
    {
      transactionId: "TXN-9021-04",
      memberId: "FF-10023",
      type: "credit",
      amount: 2000,
      description: "Partner Hotel Stay Credit",
      resultingBalance: 24500,
    },
  ];

  for (const txn of sampleTransactions) {
    await db.insert(transactions).values({
      transactionId: txn.transactionId,
      memberId: txn.memberId,
      type: txn.type,
      amount: txn.amount,
      description: txn.description,
      resultingBalance: txn.resultingBalance,
      createdAt: new Date(),
    });
  }

  return true;
}

export function resetMemoryStore(): void {
  memoryStore = new FrequentFlyerStore();
  globalForMemoryStore.__frequentFlyerMemoryStore = memoryStore;
}
